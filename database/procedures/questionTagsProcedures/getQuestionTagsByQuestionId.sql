CREATE OR ALTER PROCEDURE getQuestionTagsByQuestionId
    @questionId VARCHAR(255)
AS
BEGIN
    SELECT qt.*,
           t.tagName
    FROM QuestionTags qt
    JOIN Tags t ON qt.tagId = t.tagId
    WHERE qt.questionId = @questionId
      AND qt.isDeleted = 0;
END
