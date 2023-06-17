import cron from 'node-cron'
import { sendWelcomeEmail } from './Email Services/welcomeEmail';
import { sendPreferredAnswerEmail } from './Email Services/preferredAnswerEmail';


cron.schedule('*/2 * * * * *', async () => {
    await sendWelcomeEmail() ///check if there is a new user and send a welcome email
  });


// // Schedule the task to run every hour
// cron.schedule('0 * * * *', async () => {
//   // Logic to retrieve the users whose answers were marked as preferred
//   const users = getUsersWithPreferredAnswers();

//   // Loop through the users and send the preferred answer email
//   for (const user of users) {
//     await sendPreferredAnswerEmail(user);
//   }
// });