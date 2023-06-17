CREATE OR ALTER PROCEDURE deleteQuestionTag
    @questionId VARCHAR(255),
    @tagId VARCHAR(255)
AS
BEGIN
    DELETE FROM QuestionTags
    WHERE questionId = @questionId
    AND tagId = @tagId;
END
