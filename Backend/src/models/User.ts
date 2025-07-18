import mongoose, { Schema, Document } from 'mongoose';
import { ChatMessageSchema, IChatMessage } from './ChatMessages';
import { ResumeAnalysisSchema, IResumeAnalysis } from './ResumeAnalysis';
import { CoverLetterSchema, ICoverLetter } from './CoverLetter';
import { RoadmapSchema, IRoadmap } from './Roadmap';

export interface IUser extends Document {
  email: string;
  password: string;
  chatHistory: IChatMessage[];
  resumeHistory: IResumeAnalysis[];
  coverLetters: ICoverLetter[];
  roadmaps: IRoadmap[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  chatHistory: [ChatMessageSchema],
  resumeHistory: [ResumeAnalysisSchema],
  coverLetters: [CoverLetterSchema],
  roadmaps: [RoadmapSchema],
});

export default mongoose.model<IUser>('User', UserSchema);
