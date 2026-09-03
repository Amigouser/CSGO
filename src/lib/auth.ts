import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: "steam",
      name: "Steam",
      type: "oidc",
      issuer: "https://steamcommunity.com/openid",
      clientId: "https://steamcommunity.com/openid",
      clientSecret: "",
      authorization: { params: { scope: "openid" } },
      profile(profile: Record<string, string>) {
        const steamId = profile.sub?.split("/").pop() || "";
        return {
          id: steamId,
          steamId,
          nickname: profile.nickname || `Player_${steamId.slice(-6)}`,
          avatar: null,
          profileUrl: `https://steamcommunity.com/profiles/${steamId}`,
        };
      },
    },
  ],
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
  pages: {
    signIn: "/login",
  },
  session: { strategy: "database" },
});
