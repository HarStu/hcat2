An AI chat app built w/ Better Auth, Drizzle ORM, ShadCN, and Next.js App Router

Known issues:
- adding 'use server' directive to /src/utils/auth.ts causes an error related to exports -- but this should really be server-only to mitigate risk of leaking secrets