CREATE OR ALTER PROCEDURE addQuestionTag
    @questionId VARCHAR(255),
    @tagId VARCHAR(255)
AS
BEGIN
    INSERT INTO QuestionTags (questionId, tagId)
    VALUES (@questionId, @tagId);
END
