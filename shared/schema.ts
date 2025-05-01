import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const studyMaterials = pgTable("study_materials", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // document, video, quiz, etc.
  lastAccessed: text("last_accessed"),
});

export const studyGoals = pgTable("study_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  text: text("text").notNull(),
  dueDate: text("due_date"),
  completed: boolean("completed").default(false),
});

export const studySessions = pgTable("study_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subject: text("subject").notNull(),
  topic: text("topic"),
  scheduledTime: text("scheduled_time").notNull(),
  duration: text("duration"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertStudyMaterialSchema = createInsertSchema(studyMaterials).omit({
  id: true,
});

export const insertStudyGoalSchema = createInsertSchema(studyGoals).omit({
  id: true,
});

export const insertStudySessionSchema = createInsertSchema(studySessions).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStudyMaterial = z.infer<typeof insertStudyMaterialSchema>;
export type StudyMaterial = typeof studyMaterials.$inferSelect;

export type InsertStudyGoal = z.infer<typeof insertStudyGoalSchema>;
export type StudyGoal = typeof studyGoals.$inferSelect;

export type InsertStudySession = z.infer<typeof insertStudySessionSchema>;
export type StudySession = typeof studySessions.$inferSelect;
