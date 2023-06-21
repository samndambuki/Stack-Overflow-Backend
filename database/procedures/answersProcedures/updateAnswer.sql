CREATE OR ALTER PROCEDURE updateAnswer
    @answerId VARCHAR(255),
    @userId VARCHAR(255),
    @questionId VARCHAR(255),
    @body VARCHAR(255),
    @updatedAt DATETIME
AS
BEGIN
    UPDATE Answers
    SET userId = @userId,
        questionId = @questionId,
        body = @body,
        updatedAt = @updatedAt
    WHERE answerId = @answerId AND isDeleted = 0;
END


DROP PROCEDURE updateAnswer;