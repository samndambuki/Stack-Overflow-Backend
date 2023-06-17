import { Request, Response } from 'express';
import { v4 as v4answerId } from 'uuid';
import { DatabaseHelper } from '../databaseHelper';
import moment from 'moment';


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
        
        return res.status(200).json(answer);
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};

// GET Answers by Question ID
export const getAnswersByQuestionId = async (req: Request<{ questionId: string }>, res: Response) => {
    try {
        const { questionId } = req.params;
        const answers = (await DatabaseHelper.exec('getAnswersByQuestionId', { questionId })).recordset;
        
        return res.status(200).json(answers);
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};

// ADD Answer
export const addAnswer = async (req: Request, res: Response) => {
    try {
        const answerId = v4answerId();
        const { userId, questionId, body, upVote, downVote } = req.body;

        const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

        
        await DatabaseHelper.exec('addAnswer', {
            answerId,
            userId,
            questionId,
            body,
            createdAt:currentDateTime,
            upVote,
            downVote,
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
        const { userId, questionId, body, upVote, downVote } = req.body;

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
            upVote,
            downVote,
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
