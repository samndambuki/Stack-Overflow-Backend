CREATE OR ALTER PROCEDURE updateQuestion
    @questionId VARCHAR(255),
    @title VARCHAR(255),
    @details VARCHAR(255),
    @tried VARCHAR(255),
    @tags VARCHAR(255),
    @updatedAt DATETIME
AS
BEGIN
    UPDATE Questions
    SET title = @title, details = @details, tried = @tried, tags = @tags, updatedAt = @updatedAt
    WHERE questionId = @questionId
        AND isDeleted = 0;
END
