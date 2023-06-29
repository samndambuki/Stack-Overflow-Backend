import { Request, Response } from 'express';
import { v4 as v4answerId } from 'uuid';
import { DatabaseHelper } from '../databaseHelper';
import moment from 'moment';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';


//GET all Answers
export const getAnswers = async (req: Request, res: Response) => {
    try {
      // Execute the stored procedure to get all answers
      const answers = (await DatabaseHelper.exec('getAnswers')).recordset;
  
      // Check if any answers were found
    if (!answers) {
        return res.status(404).json({
          message: "No answers found!",
        });
      }
  
      // Return the answers
      return res.status(200).json(answers);
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error.message}` });
    }
  }

// GET Answer by ID
export const getAnswerById = async (req: Request<{ answerId: string }>, res: Response) => {
    try {
        const { answerId } = req.params;
        const answer = (await DatabaseHelper.exec('getAnswerById', { answerId })).recordset[0];
        
        if (!answer) {
            return res.status(404).json({
                message: 'Answer not found!',
            });
        }

        // Get the total upvotes and downvotes for the answer from the Votes table
    const voteCounts = (await DatabaseHelper.exec('getVoteCountsByAnswerId', { answerId })).recordset[0];
    const upvotes = voteCounts ? voteCounts.upvotes : 0;
    const downvotes = voteCounts ? voteCounts.downvotes : 0;

    // Add the upvote and downvote counts to the answer object
    const answerWithVoteCounts = { ...answer, upvotes, downvotes };
        
        return res.status(200).json( answerWithVoteCounts);
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};

// GET Answers by Question ID
export const getAnswersByQuestionId = async (req: Request<{ questionId: string }>, res: Response) => {
    try {
        const { questionId } = req.params;

        console.log('QuestionId',questionId);
        
        
        const answers = (await DatabaseHelper.exec('getAnswersByQuestionId', { questionId })).recordset;

        console.log('answers',answers);
        
          
        if (answers.length === 0) {
            return res.status(404).json({
                message: 'No answers found for the specified question ID.',
            });
        }
        
        return res.status(200).json(answers);
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};

// ADD Answer
export const addAnswer = async (req: ExtendedRequest, res: Response) => {
    try {
        const answerId = v4answerId();
        const {body,isPreferred } = req.body;
        const questionId = req.params.questionId;

        const userId  = req.info?.userId as string;

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

        
        await DatabaseHelper.exec('addAnswer', {
            answerId,
            userId,
            questionId,
            body,
            isPreferred,
            createdAt:currentDateTime,
        });
        
        return res.status(201).json({
            message: 'Answer added successfully!',
        });
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};



// UPDATE Answer
export const updateAnswer = async (req: Request<{ answerId: string }>, res: Response) => {
    try {
        const { answerId } = req.params;
        const { userId, questionId, body} = req.body;

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        
        const answer = (await DatabaseHelper.exec('getAnswerById', { answerId })).recordset[0];
        
        if (!answer) {
            return res.status(404).json({
                message: 'Answer not found!',
            });
        }
        
        await DatabaseHelper.exec('updateAnswer', {
            answerId,
            userId,
            questionId,
            body,
            updatedAt:currentDateTime,
        });
        
        return res.status(200).json({
            message: 'Answer updated successfully!',
        });
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};

// DELETE Answer
export const deleteAnswer = async (req: Request<{ answerId: string }>, res: Response) => {
    try {
        const { answerId } = req.params;
        
        const answer = (await DatabaseHelper.exec('getAnswerById', { answerId })).recordset[0];

        
        if (!answer) {
            return res.status(404).json({
                message: 'Answer not found!',
            });
        }
        
        await DatabaseHelper.exec('deleteAnswer', { answerId });
        
        return res.status(200).json({
            message: 'Answer deleted successfully!',
        });
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};
