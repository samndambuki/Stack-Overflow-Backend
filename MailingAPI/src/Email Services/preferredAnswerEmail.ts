import mssql from 'mssql';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
import { sqlConfig } from '../config';
import { sendMail } from '../Helpers/sendMail';
import { User } from '../interfaces/userInterface';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const sendPreferredAnswerEmail = async (user: User) => {
  try {
    // Establish a connection with the database
    const pool = await mssql.connect(sqlConfig);

    // Render the email template using EJS
    const emailTemplate = await ejs.renderFile(
      'Templates/preferredAnswer.ejs',
      { name: user.userName }
    );

    // Define the email message options
    const messageOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Preferred Answer Email',
      html: emailTemplate,
    };

    // Send the email
    await sendMail(messageOptions);

    // Update the database to mark the email as sent
    await pool.request().execute('updatePreferredAnswerEmailSent');
  } catch (error) {
    console.error(error);
  }
};
