CREATE OR ALTER PROCEDURE addAnswer
    @answerId VARCHAR(255),
    @userId VARCHAR(255),
    @questionId VARCHAR(255),
    @body VARCHAR(255),
    @createdAt DATETIME
AS
BEGIN
    INSERT INTO Answers (answerId, userId, questionId, body, createdAt)
    VALUES (@answerId, @userId, @questionId, @body, @createdAt);
END


DROP PROCEDURE addAnswer;

SELECT * FROM Answers