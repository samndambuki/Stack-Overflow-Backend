CREATE OR ALTER PROCEDURE insertQuestion
(
    @questionId VARCHAR(255),
    @userId VARCHAR(255),
    @title VARCHAR(255),
    @details VARCHAR(255),
    @tried VARCHAR(255),
    @tags VARCHAR(255),
    @createdAt DATETIME,
    @updatedAt DATETIME
)
AS
BEGIN
    INSERT INTO Questions (questionId, userId, title, details, tried, tags, createdAt, updatedAt)
    VALUES (@questionId, @userId, @title, @details, @tried, @tags, @createdAt, @updatedAt)
END
