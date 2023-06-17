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
node_cron_1.default.schedule('*/2 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, welcomeEmail_1.sendWelcomeEmail)(); ///check if there is a new user and send a welcome email
}));
// // Schedule the task to run every hour
// cron.schedule('0 * * * *', async () => {
//   // Logic to retrieve the users whose answers were marked as preferred
//   const users = getUsersWithPreferredAnswers();
//   // Loop through the users and send the preferred answer email
//   for (const user of users) {
//     await sendPreferredAnswerEmail(user);
//   }
// });
