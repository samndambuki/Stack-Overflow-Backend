CREATE OR ALTER PROCEDURE getQuestionById
    @questionId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Questions
    WHERE questionId = @questionId
        AND isDeleted = 0;
END
