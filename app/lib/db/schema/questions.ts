import { pgTable, serial, integer, text, jsonb, boolean } from 'drizzle-orm/pg-core';

export type QuestionType = 'multiple_choice' | 'free_text' | 'yes_no_comment' | 'multiple_choice_plus_text';

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  sectionId: integer('section_id').notNull(),
  sectionTitle: text('section_title').notNull(),
  questionText: text('question_text').notNull(),
  questionType: text('question_type').$type<QuestionType>().notNull(),
  options: jsonb('options').$type<string[]>(),
  orderIndex: integer('order_index').notNull(),
  isRequired: boolean('is_required').default(true),
});

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;