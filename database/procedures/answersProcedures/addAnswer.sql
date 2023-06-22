CREATE OR ALTER PROCEDURE AddAnswer
    @answerId VARCHAR(255),
    @userId VARCHAR(255),
    @questionId VARCHAR(255),
    @body VARCHAR(255),
    @isPreferred INT,
    @createdAt DATETIME
AS
BEGIN
    INSERT INTO Answers (answerId, userId, questionId, body, isPreferred, createdAt)
    VALUES (@answerId, @userId, @questionId, @body, @isPreferred, @createdAt);
END



DROP PROCEDURE addAnswer;

SELECT * FROM Answers