import NextAuth from 'next-auth';
import FusionAuthProvider from 'next-auth/providers/fusionauth';
import GoogleAuthProvider from 'next-auth/providers/google';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next/types';

export const authOptions = {
  providers: [
    FusionAuthProvider({
      issuer: process.env.FUSIONAUTH_ISSUER,
      clientId: _.get(process.env, 'FUSIONAUTH_CLIENT_ID', ''),
      clientSecret: _.get(process.env, 'FUSIONAUTH_CLIENT_SECRET', ''),
      wellKnown: `${process.env.FUSIONAUTH_URL}/.well-known/openid-configuration/${process.env.FUSIONAUTH_TENANT_ID}`,
      tenantId: process.env.FUSIONAUTH_TENANT_ID, // Only required if you're using multi-tenancy
    }),
  ],
  debug: true,
};
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return NextAuth(req, res, authOptions);
}
