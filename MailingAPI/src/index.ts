import cron from 'node-cron'
import { sendWelcomeEmail } from './Email Services/welcomeEmail';
import { sendPreferredAnswerEmail } from './Email Services/preferredAnswerEmail';
import { DatabaseHelper } from './databaseHelper';


cron.schedule('*/2 * * * * *', async () => {
    await sendWelcomeEmail() ///check if there is a new user and send a welcome email
  });

  cron.schedule('*/2 * * * * *', async () => {
    try {
      // Determine the user who provided the most preferred answer
      const user = await determineMostPreferredAnswerUser();
  
      if (user) {
        await sendPreferredAnswerEmail(user); // Send the email to the user
      }
    } catch (error) {
      console.error('Error occurred while sending preferred answer email:', error);
    }
  });

  async function determineMostPreferredAnswerUser() {
    // Execute the stored procedure to determine the user with the most preferred answer
    const result = await DatabaseHelper.exec('GetMostPreferredAnswerUser');
    const user = result.recordset[0];
  
    return user;
  }
  

