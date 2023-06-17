CREATE OR ALTER PROCEDURE deleteComment
    @commentId VARCHAR(255)
AS
BEGIN
    UPDATE Comments
    SET isDeleted = 1
    WHERE commentId = @commentId;
END
