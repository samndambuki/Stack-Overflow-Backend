CREATE OR ALTER PROCEDURE insertTag
(
    @tagId VARCHAR(255),
    @tagName VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Tags (tagId, tagName)
    VALUES (@tagId, @tagName)
END
