import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { dbRouter } from '@/trpc/routers/db'

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string()
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`
      }
    }),
  db: dbRouter
})

export type AppRouter = typeof appRouter