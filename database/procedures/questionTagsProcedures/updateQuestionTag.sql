CREATE OR ALTER PROCEDURE updateQuestionTag
    @questionId VARCHAR(255),
    @tagId VARCHAR(255),
    @newTagId VARCHAR(255),
    @isDeleted INT
AS
BEGIN
    UPDATE QuestionTags
    SET tagId = @newTagId
    WHERE questionId = @questionId
        AND tagId = @tagId
        AND isDeleted = 0;
END
