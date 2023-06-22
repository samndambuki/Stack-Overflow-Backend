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
const node_cron_1 = __importDefault(require("node-cron"));
const welcomeEmail_1 = require("./Email Services/welcomeEmail");
const preferredAnswerEmail_1 = require("./Email Services/preferredAnswerEmail");
const databaseHelper_1 = require("./databaseHelper");
node_cron_1.default.schedule('*/2 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, welcomeEmail_1.sendWelcomeEmail)(); ///check if there is a new user and send a welcome email
}));
node_cron_1.default.schedule('*/2 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Determine the user who provided the most preferred answer
        const user = yield determineMostPreferredAnswerUser();
        if (user) {
            yield (0, preferredAnswerEmail_1.sendPreferredAnswerEmail)(user); // Send the email to the user
        }
    }
    catch (error) {
        console.error('Error occurred while sending preferred answer email:', error);
    }
}));
function determineMostPreferredAnswerUser() {
    return __awaiter(this, void 0, void 0, function* () {
        // Execute the stored procedure to determine the user with the most preferred answer
        const result = yield databaseHelper_1.DatabaseHelper.exec('GetMostPreferredAnswerUser');
        const user = result.recordset[0];
        return user;
    });
}
