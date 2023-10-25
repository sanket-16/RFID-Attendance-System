import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
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
        role: {
          label: "Role",
          type: "select",
          placeholder: "Student",
        },
      },
      async authorize(credentials, req) {
        const dbUser =
          credentials?.role === "Teacher"
            ? await prisma.teacher.findUnique({
                where: {
                  email: credentials?.email,
                },
              })
            : await prisma.student.findUnique({
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
          role: credentials?.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/sign-up",
    error: "/auth/sign-in",
  },
  callbacks: {
    session: ({ session, token }) => {
      console.log(token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: session.user.role,
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
  cookies: {},
};

export default NextAuth(authOptions);
