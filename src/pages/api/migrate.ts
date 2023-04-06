// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { useState } from "react";
import { getServerSession } from "next-auth";
import { ethers } from "ethers";
import { CONFIG, ETHEREUM_URL, NETWORK } from "../../../config";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/utils";
import { JwtPayload } from "jsonwebtoken";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      try {
        const { token } = body;
        const data: JwtPayload = verifyToken(token) as JwtPayload;
        const { session, wallet } = data;
        if (!session || !session.user || !session.accessToken || !token) {
          return res.status(400).send({
            message: "Invalid access token or wallet Address",
          });
        }
        const user = await getDiscordUserInfo(session.accessToken);
        const provider = new ethers.providers.JsonRpcProvider(
          ETHEREUM_URL,
          NETWORK
        );
        const contract = new ethers.Contract(
          CONFIG.contractAddress,
          CONFIG.contractABI,
          provider
        );

       
        const {
          created,
          expires,
          started,
          value,
        } = await contract.subscriptions(wallet);
  
        if (expires * 1000 < Date.now()) {
          return res.status(400).send({
            message: "Your subscription for v1 is already expired",
          });
        }
        const alreadyFound = await prisma.subscription.findFirst({
          where: {
            walletAddress: wallet,
            OR: {
              discordId: user.id,
            },
          },
        });
        if (alreadyFound) {
          throw new Error("Already presenet");
        }
        const subscription = await prisma.subscription.create({
          data: {
            discordId: user.id,
            walletAddress: wallet,
            username: `${user.username}#${user.discriminator}`,
            timeStamp: "" + expires,
          },
        });
        const assignRole = await fetch(process.env.LLAMASTORE_ENDPOINT!, {
          method: "POST",
          body: JSON.stringify({
            discordID: user.id,
            guildID: process.env.GUILD_ID!,
            roleID: process.env.ROLE_ID!,
            duration: Math.round((expires * 1000 - Date.now()) / 1000),
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "api-key": process.env.API_KEY!,
          },
        });
        if (assignRole.ok) {
          return res.status(200).send({
            message: "Your subscription has been added to v1",
            subscription: subscription,
          });
        } else {
          return res.status(200).send({
            message: "Your subscription was not added to v2",
            subscription: {
              discordID: user.id,
              guildID: process.env.GUILD_ID!,
              roleID: process.env.ROLE_ID!,
              duration: Math.round((expires * 1000 - Date.now()) / 1000),
            },
          });
        }
      } catch (err) {
        return res.status(400).send({
          message: "Your discord or wallet had already been registered",
        });
      }
    default:
      return;
  }
}

async function getDiscordUserInfo(accessToken: string) {
  const userInfo = await fetch(`https://discord.com/api/users/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const user = await userInfo.json();
  return user;
}
