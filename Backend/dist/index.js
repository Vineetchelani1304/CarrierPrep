"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const User_1 = __importDefault(require("./models/User"));
const db_1 = require("./db/db");
const auth_1 = require("./middleware/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
(0, db_1.connectDB)();
// Signup Route
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({ email, password: hashedPassword, name });
        yield newUser.save();
        res.status(201).json({ message: 'User registered', user_id: newUser._id });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error occurred while signing up' });
    }
}));
// Login Route
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid password' });
        const token = jsonwebtoken_1.default.sign({ user_id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user_id: user._id });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in' });
    }
}));
// Resume Analyzer (Protected)
app.post('/resume-analyzer', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
        const { resumeText } = req.body;
        const { data } = yield axios_1.default.post('http://localhost:5000/api/resume-analyzer', {
            user_id,
            resumeText,
        });
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error occurred while analyzing resume' });
    }
}));
// Chatbot (Protected)
app.post('/chatbot', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
        const { message } = req.body;
        const { data } = yield axios_1.default.post('http://localhost:5000/api/chat', {
            user_id,
            message,
        });
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error communicating with chatbot' });
    }
}));
// Cover Letter Generator (Protected)
app.post('/cover-letter', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
        const { jobDescription, candidateInfo } = req.body;
        if (!jobDescription || !candidateInfo) {
            return res.status(400).json({ message: 'Missing jobDescription or candidateInfo' });
        }
        const { data } = yield axios_1.default.post('http://localhost:5000/api/cover-letter', {
            user_id,
            job_description: jobDescription,
            candidate_info: candidateInfo,
        });
        res.json(data);
    }
    catch (err) {
        console.error('Cover Letter API error:', err);
        res.status(500).json({ message: 'Error generating cover letter' });
    }
}));
// Roadmap Generator (Protected)
app.post('/roadmap', auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
        const { career_goal } = req.body;
        const { data } = yield axios_1.default.post('http://localhost:5000/api/roadmap', {
            user_id,
            career_goal,
        });
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error generating roadmap' });
    }
}));
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
