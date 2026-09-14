import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        if (dbUser) {
          const u = session.user as unknown as Record<string, unknown>;
          u.steamId = dbUser.steamId;
          u.mmr = dbUser.mmr;
          u.rank = dbUser.rank;
        }
      }
      return session;
    },
  },
  session: { strategy: "database" },
});
