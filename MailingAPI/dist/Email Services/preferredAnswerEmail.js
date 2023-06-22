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
exports.sendPreferredAnswerEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = require("../Helpers/sendMail");
const databaseHelper_1 = require("../databaseHelper");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const sendPreferredAnswerEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Render the email template using EJS
        const emailTemplate = yield ejs_1.default.renderFile('templates/preferredAnswer.ejs', { name: user.userName });
        // Define the email message options
        const messageOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Preferred Answer Email',
            html: emailTemplate,
        };
        // Send the email
        yield (0, sendMail_1.sendMail)(messageOptions);
        // Update the database to mark the email as sent
        yield databaseHelper_1.DatabaseHelper.exec('updatePreferredAnswerEmailSent');
    }
    catch (error) {
        console.error(error);
    }
});
exports.sendPreferredAnswerEmail = sendPreferredAnswerEmail;
