CREATE OR ALTER PROCEDURE getCommentById
    @commentId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Comments
    WHERE commentId = @commentId
        AND isDeleted = 0;
END
