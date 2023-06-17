CREATE OR ALTER PROCEDURE deleteQuestionTag
    @questionId VARCHAR(255),
    @tagId VARCHAR(255)
AS
BEGIN
    UPDATE QuestionTags
    SET isDeleted = 1
    WHERE questionId = @questionId
    AND tagId = @tagId;
END
