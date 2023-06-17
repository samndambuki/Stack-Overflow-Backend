CREATE OR ALTER PROCEDURE addAnswer
    @answerId VARCHAR(255),
    @userId VARCHAR(255),
    @questionId VARCHAR(255),
    @body VARCHAR(255),
    @createdAt DATETIME,
    @upVote VARCHAR(255) = 0,
    @downVote VARCHAR(255) = 0
AS
BEGIN
    INSERT INTO Answers (answerId, userId, questionId, body, createdAt,upVote, downVote)
    VALUES (@answerId, @userId, @questionId, @body, @createdAt, @upVote, @downVote);
END


SELECT * FROM Answers