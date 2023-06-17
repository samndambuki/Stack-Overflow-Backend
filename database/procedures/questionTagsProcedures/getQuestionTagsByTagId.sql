CREATE OR ALTER PROCEDURE getQuestionTagsByTagId
    @tagId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM QuestionTags
    WHERE tagId = @tagId
      AND isDeleted = 0;
END
