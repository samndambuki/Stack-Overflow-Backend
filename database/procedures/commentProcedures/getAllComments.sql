CREATE OR ALTER PROCEDURE getAllComments
AS
BEGIN
    SELECT *
    FROM Comments
    WHERE isDeleted = 0
END
