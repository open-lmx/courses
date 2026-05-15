import type { NextAuthOptions } from 'next-auth';
import { SurrealDBAdapter } from '@auth/surrealdb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import OAuthProvider from 'next-auth/providers.Generic_OAuth2';
import Surreal from 'surrealdb';

export const authOptions: NextAuthOptions = {
  adapter: SurrealDBAdapter({
    url: process.env.SURREAL_URL || 'https://demo.surrealdb.com',
    namespace: process.env.SURREAL_NS || 'test',
    database: process.env.SURREAL_DB || 'test',
    username: process.env.SURREAL_USER || 'root',
    password: process.env.SURREAL_PASS || 'root',
  }),
  providers: [
    // Credentials provider (email/password)
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = new Surreal();
        const url = process.env.SURREAL_URL || 'https://demo.surrealdb.com';
        const user = process.env.SURREAL_USER || 'root';
        const pass = process.env.SURREAL_PASS || 'root';
        const ns = process.env.SURREAL_NS || 'test';
        const dbName = process.env.SURREAL_DB || 'test';

        await db.connect(url, { namespace: ns, database: dbName });
        await db.signin({ username: user, password: pass });

        const users = await db.query<any[]>(
          'SELECT * FROM user WHERE email = $email LIMIT 1',
          { email: credentials.email }
        );

        if (!users[0]?.length) {
          await db.close();
          return null;
        }

        const userData = users[0][0];
        const hash = btoa(credentials.password + userData.salt);
        
        if (hash !== userData.password) {
          await db.close();
          return null;
        }

        await db.close();
        return {
          id: userData.id,
          email: userData.email,
          name: userData.name,
        };
      },
    }),
    // Generic OIDC/OAuth2 SSO provider
    OAuthProvider({
      name: process.env.OIDC_PROVIDER_NAME || 'SSO',
      clientId: process.env.OIDC_CLIENT_ID || '',
      clientSecret: process.env.OIDC_CLIENT_SECRET || '',
      issuer: process.env.OIDC_ISSUER || '',
      idToken: true,
      wellKnown: process.env.OIDC_WELL_KNOWN,
      authorization: { params: { scope: 'openid profile email' } },
      token: process.env.OIDC_TOKEN_URL,
      userinfo: process.env.OIDC_USERINFO_URL,
      profile(profile) {
        return {
          id: profile.sub || profile.id,
          name: profile.name || profile.preferred_username,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) token.id = user.id;
      if (profile) token.profile = profile;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
  pages: { signIn: '/login' },
};
