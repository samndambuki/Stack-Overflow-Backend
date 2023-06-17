CREATE OR ALTER PROCEDURE getAnswerById
    @answerId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Answers
    WHERE answerId = @answerId AND isDeleted = 0;
END
