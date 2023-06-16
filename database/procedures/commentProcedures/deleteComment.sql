CREATE OR ALTER PROCEDURE deleteComment
(
    @commentId VARCHAR(255)
)
AS
BEGIN
    DELETE FROM Comments
    WHERE commentId = @commentId
END
