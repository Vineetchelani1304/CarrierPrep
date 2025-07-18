import { Schema } from 'mongoose';

export interface IResumeAnalysis {
  summary: string;
  insights: string[];
  timestamp?: Date;
}

export const ResumeAnalysisSchema = new Schema<IResumeAnalysis>({
  summary: { type: String, required: true },
  insights: [{ type: String }],
  timestamp: { type: Date, default: Date.now },
});
