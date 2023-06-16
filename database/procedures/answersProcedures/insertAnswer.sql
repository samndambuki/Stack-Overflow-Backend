CREATE OR ALTER PROCEDURE insertAnswer
(
    @answerId VARCHAR(255),
    @userId VARCHAR(255),
    @questionId VARCHAR(255),
    @body VARCHAR(255),
    @createdAt DATETIME,
    @updatedAt DATETIME,
    @upVote VARCHAR(255) = 0,
    @downVote VARCHAR(255) = 0
)
AS
BEGIN
    INSERT INTO Answers (answerId, userId, questionId, body, createdAt, updatedAt, upVote, downVote)
    VALUES (@answerId, @userId, @questionId, @body, @createdAt, @updatedAt, @upVote, @downVote)
END
