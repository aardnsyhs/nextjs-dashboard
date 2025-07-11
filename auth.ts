import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
    return user.rows[0];
  } catch (err) {
    console.error("Failed to fetch user: ", err);
    throw new Error("Failed to fetch user");
  }
}

export const authOptions = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],
};

export const { auth, signIn, signOut } = NextAuth(authOptions);
