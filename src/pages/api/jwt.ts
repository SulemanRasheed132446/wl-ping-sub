// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signToken } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;
  return res.status(200).send({
    token: signToken(body.payload),
  });
}
