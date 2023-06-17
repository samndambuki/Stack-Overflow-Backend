CREATE OR ALTER PROCEDURE getQuestions
AS
BEGIN
    SELECT *
    FROM Questions
    WHERE isDeleted = 0;
END
