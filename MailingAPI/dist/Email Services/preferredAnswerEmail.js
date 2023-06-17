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
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const config_1 = require("../config");
const sendMail_1 = require("../Helpers/sendMail");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const sendPreferredAnswerEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Establish a connection with the database
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        // Render the email template using EJS
        const emailTemplate = yield ejs_1.default.renderFile('Templates/preferredAnswer.ejs', { name: user.userName });
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
        yield pool.request().execute('updatePreferredAnswerEmailSent');
    }
    catch (error) {
        console.error(error);
    }
});
exports.sendPreferredAnswerEmail = sendPreferredAnswerEmail;
