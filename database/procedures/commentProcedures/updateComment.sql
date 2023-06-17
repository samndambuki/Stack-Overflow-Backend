CREATE OR ALTER PROCEDURE updateComment
    @commentId VARCHAR(255),
    @userId VARCHAR(255),
    @questionId VARCHAR(255),
    @answerId VARCHAR(255),
    @body VARCHAR(255),
    @updatedAt DATETIME
AS
BEGIN
    UPDATE Comments
    SET userId = @userId,
        questionId = @questionId,
        answerId = @answerId,
        body = @body,
        updatedAt = @updatedAt
    WHERE commentId = @commentId
        AND isDeleted = 0;
END
