import { Schema } from 'mongoose';

export const PromptSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  template: { type: String, required: true },
});