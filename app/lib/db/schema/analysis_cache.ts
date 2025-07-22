import { pgTable, uuid, text, jsonb, timestamp } from 'drizzle-orm/pg-core';
import type { AnalysisReport } from '~/types/analysis';

export const analysisCache = pgTable('analysis_cache', {
  id: uuid('id').primaryKey().defaultRandom(),
  responseHash: text('response_hash').unique().notNull(),
  analysisResult: jsonb('analysis_result').$type<AnalysisReport>().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
});

export type AnalysisCache = typeof analysisCache.$inferSelect;
export type NewAnalysisCache = typeof analysisCache.$inferInsert;