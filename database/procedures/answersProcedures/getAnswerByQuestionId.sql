CREATE OR ALTER PROCEDURE getAnswersByQuestionId
    @questionId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Answers
    WHERE questionId = @questionId AND isDeleted = 0;
END
