CREATE OR ALTER PROCEDURE addQuestion
    @questionId VARCHAR(255),
    @userId VARCHAR(255),
    @title VARCHAR(255),
    @details VARCHAR(255),
    @tried VARCHAR(255),
    @tags VARCHAR(255),
    @tagId VARCHAR(255),
    @createdAt DATETIME
AS
BEGIN
    INSERT INTO Questions (questionId, userId, title, details, tried, tags,tag_id,createdAt)
    VALUES (@questionId, @userId, @title, @details, @tried,@tags,@tagId,@createdAt);
END
