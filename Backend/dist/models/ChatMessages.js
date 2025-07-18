"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ChatMessageSchema = new mongoose_1.Schema({
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
