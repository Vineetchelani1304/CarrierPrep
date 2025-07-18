"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverLetterSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CoverLetterSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
