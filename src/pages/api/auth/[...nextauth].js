import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
const scopes = ["identify", "guilds", "guilds.members.read"].join(" ");
export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: "IVb0F9Luh_mym91U2s-GThrCgekQeovx",
      clientSecret: "1076136316279980082",
      authorization: { params: { scope: scopes } },
    }),
  ],
  secret:"asteria",
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
