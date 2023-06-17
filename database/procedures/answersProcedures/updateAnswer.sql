CREATE OR ALTER PROCEDURE updateAnswer
    @answerId VARCHAR(255),
    @userId VARCHAR(255),
    @questionId VARCHAR(255),
    @body VARCHAR(255),
    @updatedAt DATETIME,
    @upVote VARCHAR(255) = 0,
    @downVote VARCHAR(255) = 0
AS
BEGIN
    UPDATE Answers
    SET userId = @userId,
        questionId = @questionId,
        body = @body,
        updatedAt = @updatedAt,
        upVote = @upVote,
        downVote = @downVote
    WHERE answerId = @answerId AND isDeleted = 0;
END
