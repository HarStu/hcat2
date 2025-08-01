import { betterAuth } from "better-auth";
import { db } from '@/db/drizzle'
import { schema } from '@/db/schema'
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
  plugins: [nextCookies()]
})