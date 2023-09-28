import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
const prisma = new PrismaClient();
const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentails",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "sanketpatil@ternaengg.ac.in",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "my very secret password",
        },
      },
      async authorize(credentials, req) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!dbUser) {
          throw new Error("Invalid Credentails");
        }
        if (
          await compare(String(credentials?.password), String(dbUser?.password))
        ) {
          throw new Error("Invalid Credentails");
        }
        return {
          id: dbUser.id,
          name: dbUser.firstName + " " + dbUser.lastName,
          email: dbUser.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "sign-up",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
