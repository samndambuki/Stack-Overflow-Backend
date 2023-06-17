CREATE OR ALTER PROCEDURE addQuestionTag
    @questionId VARCHAR(255),
    @tagId VARCHAR(255),
    @isDeleted INT
AS
BEGIN
    INSERT INTO QuestionTags (questionId, tagId, isDeleted)
    VALUES (@questionId, @tagId, @isDeleted);
END
