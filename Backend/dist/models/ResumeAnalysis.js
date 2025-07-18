"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeAnalysisSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ResumeAnalysisSchema = new mongoose_1.Schema({
    summary: { type: String, required: true },
    insights: [{ type: String }],
    timestamp: { type: Date, default: Date.now },
});
