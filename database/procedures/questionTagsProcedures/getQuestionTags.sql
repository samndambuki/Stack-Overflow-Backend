CREATE OR ALTER PROCEDURE getQuestionTags
AS
BEGIN
    SELECT *
    FROM QuestionTags
    WHERE isDeleted = 0;
END
