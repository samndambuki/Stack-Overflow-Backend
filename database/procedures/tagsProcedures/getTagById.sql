CREATE OR ALTER PROCEDURE getTagById
    @tagId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Tags
    WHERE tagId = @tagId AND isDeleted = 0;
END
