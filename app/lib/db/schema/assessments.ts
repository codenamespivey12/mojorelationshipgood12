import { pgTable, uuid, jsonb, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import type { QuestionResponse } from '~/types/assessment';
import type { AnalysisReport } from '~/types/analysis';

export const assessments = pgTable('assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  responses: jsonb('responses').$type<QuestionResponse[]>().notNull(),
  analysisResult: jsonb('analysis_result').$type<AnalysisReport>(),
  status: text('status').$type<'in_progress' | 'completed' | 'failed'>().default('in_progress'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Assessment = typeof assessments.$inferSelect;
export type NewAssessment = typeof assessments.$inferInsert;