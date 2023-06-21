CREATE OR ALTER PROCEDURE getQuestionTagsByTagId
    @tagId VARCHAR(255)
AS
BEGIN
    SELECT qt.*,
           q.title,
           q.details,
           q.tried,
           q.createdAt,
           q.updatedAt,
           q.userId
    FROM QuestionTags qt
    JOIN Questions q ON qt.questionId = q.questionId
    WHERE qt.tagId = @tagId
      AND qt.isDeleted = 0;
END




