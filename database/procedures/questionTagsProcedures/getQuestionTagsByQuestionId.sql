CREATE OR ALTER PROCEDURE getQuestionTagsByQuestionId
    @questionId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM QuestionTags
    WHERE questionId = @questionId
      AND isDeleted = 0;
END
