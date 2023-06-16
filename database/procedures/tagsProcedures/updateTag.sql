CREATE OR ALTER PROCEDURE updateTag
(
    @tagId VARCHAR(255),
    @newTagName VARCHAR(255)
)
AS
BEGIN
    UPDATE Tags
    SET tagName = @newTagName
    WHERE tagId = @tagId
END
