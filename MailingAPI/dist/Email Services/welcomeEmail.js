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
exports.sendWelcomeEmail = void 0;
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const ejs_1 = __importDefault(require("ejs"));
const config_1 = require("../config");
const sendMail_1 = require("../Helpers/sendMail");
// export module sendWelcomeEmail
const sendWelcomeEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    // establish a connection with the database
    const pool = yield mssql_1.default.connect(config_1.sqlConfig);
    const users = (yield (yield pool.request()).execute('getUsersWithEmailNotSent')).recordset;
    // console.log(users);
    //loop through and send an email
    for (let user of users) {
        //send an email
        //create a message option
        ejs_1.default.renderFile('templates/welcome.ejs', { name: user.userName }, (err, html) => __awaiter(void 0, void 0, void 0, function* () {
            //send email
            try {
                let messageOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: "Welcome Email",
                    html
                };
                // console.log(html);
                // console.log(err);
                // Send Mail
                yield (0, sendMail_1.sendMail)(messageOptions);
                const request = new mssql_1.default.Request(pool);
                request.input('userId', mssql_1.default.VarChar(255), user.userId);
                //update the database that the email was sent
                yield request.execute('updateUserEmailSent');
            }
            catch (error) {
                console.error(error);
            }
        }));
    }
});
exports.sendWelcomeEmail = sendWelcomeEmail;
