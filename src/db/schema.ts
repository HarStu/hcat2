import { pgTable, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = pgTable("session", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const chats = pgTable('chats', {
  id: text('id').primaryKey(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  systemPrompt: text('systemPrompt'),
  gameName: text('gameName').references(() => games.name),
  requiredTools: jsonb(),
  userName: text('userName'),
  aiName: text('aiName'),
  owner: text('owner').references(() => user.id)
});

export const messages = pgTable('messages', {
  id: text('id').primaryKey(),
  createdAt: timestamp('createdAt').defaultNow(),
  content: text('content').notNull(),
  reasoning: text('reasoning'),
  experimental_attachments: jsonb(),
  role: text('role').notNull(),
  data: jsonb(),
  annotations: jsonb(),
  toolInvocations: jsonb(),
  parts: jsonb(),
  chatId: text('chatId').notNull().references(() => chats.id)
})

export const games = pgTable('games', {
  name: text('name').primaryKey().notNull(),
  description: text('description').notNull(),
  systemPrompt: text('systemPrompt').notNull(),
  aiName: text('aiName').notNull(),
  requiredTools: jsonb().notNull(),
  score: integer().default(0)
})


export const schema = { user, session, account, verification, chats, messages }