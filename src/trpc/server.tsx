import 'server-only'

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { cache } from 'react'
import { createTRPCContext } from '@/trpc/init'
import { makeQueryClient } from '@/trpc/query-client'
import { appRouter } from '@/trpc/routers/_app'

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request
export const getQueryClient = cache(makeQueryClient)

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient
})
