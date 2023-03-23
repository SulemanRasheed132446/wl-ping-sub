import { ethers } from "ethers";
import { PRIVATE_KEY } from "../../config";
import jwt from "jsonwebtoken";
export function signToken(
  payload: any,
  options = {}
) {
  const token = jwt.sign(
    payload,
    process.env.NEXT_PUBLIC_PRIVATE_KEY!,
    options
  );
 return token;
}

// Function to verify a JWT token
export function verifyToken(token: string, options = {}) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_PRIVATE_KEY!,
      options
    );
    return decoded;
  } catch (err) {
    console.error("Error verifying token:", err);
    return null;
  }
}
