import { pgTable, uuid, text, jsonb, timestamp } from 'drizzle-orm/pg-core';
import type { UserDemographics } from '~/types/assessment';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').unique().notNull(),
  email: text('email').notNull(),
  demographics: jsonb('demographics').$type<UserDemographics>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;