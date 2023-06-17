CREATE OR ALTER PROCEDURE addComment
    @commentId VARCHAR(255),
    @userId VARCHAR(255),
    @questionId VARCHAR(255),
    @answerId VARCHAR(255),
    @body VARCHAR(255),
    @createdAt DATETIME
AS
BEGIN
    INSERT INTO Comments (commentId, userId, questionId, answerId, body, createdAt)
    VALUES (@commentId, @userId, @questionId, @answerId, @body, @createdAt);
END
