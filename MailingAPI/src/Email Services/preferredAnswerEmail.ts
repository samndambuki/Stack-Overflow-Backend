import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
import { sendMail } from '../Helpers/sendMail';
import { User } from '../interfaces/userInterface';
import { DatabaseHelper } from '../databaseHelper';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


export const sendPreferredAnswerEmail = async (user: User) => {
  try {
  
    // Render the email template using EJS
    const emailTemplate = await ejs.renderFile(
      'templates/preferredAnswer.ejs',
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
    await DatabaseHelper.exec('updatePreferredAnswerEmailSent');
  } catch (error) {
    console.error(error);
  }
};
