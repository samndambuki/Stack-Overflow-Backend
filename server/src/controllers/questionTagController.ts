import { Request, Response } from 'express';
import { DatabaseHelper } from '../databaseHelper';
import { ExtendedRequest } from '../interfaces/ExtendedRequest';

// Add Question Tag
export const addQuestionTag = async (req: ExtendedRequest, res: Response) => {
    try {
        const { questionId, tagId } = req.body;


    const role = req.info?.isAdmin as boolean
    
    if (!role) {
      return res.status(401).json({
        message: "Only admins can get all users.",
      });
    }


        // Execute the stored procedure to add the question tag
        await DatabaseHelper.exec('addQuestionTag', { questionId, tagId });

        return res.status(201).json({
            message: 'Question tag added successfully!',
        });
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};

// Update a question tag
export const updateQuestionTag = async (req: Request, res: Response) => {
    try {
      const { questionId, tagId } = req.params;
      const { newTagId } = req.body;
  
      // Execute the stored procedure to update the question tag
      await DatabaseHelper.exec('updateQuestionTag', {
        questionId,
        tagId,
        newTagId,
      });
  
      return res.status(200).json({
        message: 'Question tag updated successfully!',
      });
    } catch (error: any) {
      return res.status(500).json({
        message: `Error: ${error.message}`,
      });
    }
  };
  

// Delete Question Tag
export const deleteQuestionTag = async (req: Request<{ questionId: string, tagId: string }>, res: Response) => {
    try {
        const { questionId, tagId } = req.params;

        // Execute the stored procedure to delete the question tag
        await DatabaseHelper.exec('deleteQuestionTag', { questionId, tagId });

        return res.status(200).json({
            message: 'Question tag deleted successfully!',
        });
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};

// Get Question Tags by Question ID
export const getQuestionTagsByQuestionId = async (req: Request<{ questionId: string }>, res: Response) => {
    try {
        const { questionId } = req.params;

        // Execute the stored procedure to get question tags by question ID
        const questionTags = (await DatabaseHelper.exec('getQuestionTagsByQuestionId', { questionId })).recordset;

        return res.status(200).json(questionTags);
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};

// Get Question Tags by Tag ID
export const getQuestionTagsByTagId = async (req: Request<{ tagId: string }>, res: Response) => {
    try {
        const { tagId } = req.params;

        // Execute the stored procedure to get question tags by tag ID
        const questionTags = (await DatabaseHelper.exec('getQuestionTagsByTagId', { tagId })).recordset;

        return res.status(200).json(questionTags);
    } catch (error: any) {
        return res.status(500).json(`ERROR: ${error.message}`);
    }
};
