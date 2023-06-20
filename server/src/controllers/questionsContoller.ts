import { Request, Response } from 'express';
import { v4 as v4questionId } from 'uuid';
import { DatabaseHelper } from '../databaseHelper';
import moment from 'moment';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';

// GET all Questions
export const getQuestions = async (req: ExtendedRequest, res: Response) => {
  try {


    const role = req.info?.isAdmin as boolean
    
    if (!role) {
      return res.status(401).json({
        message: "Only admins can get all questions",
      });
    }

    const questions = (await DatabaseHelper.exec('getQuestions')).recordset;

    if (!questions) {
      return res.status(404).json({
        message: 'No questions found!',
      });
    }

    return res.status(200).json(questions);
  } catch (error: any) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// GET Question by ID
export const getQuestionById = async (req: Request<{ questionId: string }>, res: Response) => {
  try {
    const { questionId } = req.params;
    const question = (await DatabaseHelper.exec('getQuestionById', { questionId })).recordset[0];

    if (!question) {
      return res.status(404).json({
        message: 'Question not found!',
      });
    }

    return res.status(200).json(question);
  } catch (error: any) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// ADD Question
export const addQuestion = async (req: ExtendedRequest, res: Response) => {
  try {
    const questionId = v4questionId();
    const { userId, title, details, tried, tags } = req.body;

    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    
    await DatabaseHelper.exec('addQuestion', {
      questionId,
      userId,
      title,
      details,
      tried,
      tags,
      createdAt:currentDateTime,
    });

    return res.status(201).json({
      message: 'Question added successfully!',
    });
  } catch (error: any) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// UPDATE Question
export const updateQuestion = async (req: Request<{ questionId: string }>, res: Response) => {
  try {
    const { questionId } = req.params;
    const {title, details, tried, tags } = req.body;

    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    const question = (await DatabaseHelper.exec('getQuestionById', { questionId })).recordset[0];

    if (!question) {
      return res.status(404).json({
        message: 'Question not found!',
      });
    }

    await DatabaseHelper.exec('updateQuestion', {
      questionId,
      title,
      details,
      tried,
      tags,
      updatedAt:currentDateTime,
    });

    return res.status(200).json({
      message: 'Question updated successfully!',
    });
  } catch (error: any) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// DELETE Question
export const deleteQuestion = async (req: ExtendedRequest, res: Response) => {
  try {

    const role = req.info?.isAdmin as boolean
    
    if (!role) {
      return res.status(401).json({
        message: "Only admins delete a question.",
      });
    }
     
    const { questionId } = req.params;

    const question = (await DatabaseHelper.exec('getQuestionById', { questionId })).recordset[0];

    if (!question) {
      return res.status(404).json({
        message: 'Question not found!',
      });
    }

    await DatabaseHelper.exec('deleteQuestion', { questionId });

    return res.status(200).json({
      message: 'Question deleted successfully!',
    });
  } catch (error: any) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
};

//deletes all questions
// DELETE All Questions
export const deleteAllQuestions = async (req: ExtendedRequest, res: Response) => {
  try {

    const role = req.info?.isAdmin as boolean
    
    if (!role) {
      return res.status(401).json({
        message: "Only admins can delete all questions",
      });
    }

    // Execute the stored procedure to delete all questions
    await DatabaseHelper.exec('deleteAllQuestions');

    return res.status(200).json({
      message: 'All questions deleted successfully!',
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Error: ${error.message}`,
    });
  }
};
