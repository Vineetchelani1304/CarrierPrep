"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadmapSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RoadmapSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    steps: [{ type: String }],
    timestamp: { type: Date, default: Date.now },
});
