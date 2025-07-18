import { Schema } from 'mongoose';

export interface IRoadmap {
  title: string;
  steps: string[];
  timestamp?: Date;
}

export const RoadmapSchema = new Schema<IRoadmap>({
  title: { type: String, required: true },
  steps: [{ type: String }],
  timestamp: { type: Date, default: Date.now },
});
