CREATE OR ALTER PROCEDURE getCommentsByAnswerId
    @answerId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Comments
    WHERE answerId = @answerId
        AND isDeleted = 0;
END
