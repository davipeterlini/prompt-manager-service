import { Document } from 'mongoose';

export interface Prompt extends Document {
  readonly name: string;
  readonly description: string;
  readonly template: string;
}