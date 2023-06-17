import mssql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
import ejs from 'ejs';
import { sqlConfig } from "../config";
import { sendMail } from "../Helpers/sendMail";
import { User } from '../interfaces/userInterface';

 

// export module sendWelcomeEmail
export const sendWelcomeEmail = async () => {
    // establish a connection with the database
    const pool = await mssql.connect(sqlConfig);
    const users: User[] = (await (await pool.request()).execute('getUsersWithEmailNotSent')).recordset
    console.log(users);
    //loop through and send an email
    for (let user of users) {
        //send an email
        //create a message option
        ejs.renderFile('Templates/welcome.ejs', { name: user.userName }, async (err, html) => {
            //send email
            try {

                let messageOptions = {
                    from: process.env.EMAIL,
                    to: user.email, //list of receivers
                    subject: "Welcome Email",
                    html
                }
                // Send Mail
                await sendMail(messageOptions);
                const request = new mssql.Request();
                //update the database that the email was sent
                await pool.request()
                request.input('userId', mssql.VarChar(255), user.userId) // add the @userId parameter
                await request.execute('updateUserEmailSent')
            } catch (error) {
                console.error(error);
            }
        })
    }
}

