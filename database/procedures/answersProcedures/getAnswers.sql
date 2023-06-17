CREATE OR ALTER PROCEDURE getAnswers
AS
BEGIN
    SELECT *
    FROM Answers
    WHERE isDeleted = 0
END
