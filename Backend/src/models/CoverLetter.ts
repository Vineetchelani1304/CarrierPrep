import { Schema } from 'mongoose';

export interface ICoverLetter {
  content: string;
  jobTitle: string;
  company: string;
  timestamp?: Date;
}

export const CoverLetterSchema = new Schema<ICoverLetter>({
  content: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
