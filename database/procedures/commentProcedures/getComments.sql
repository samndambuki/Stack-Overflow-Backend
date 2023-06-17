CREATE OR ALTER PROCEDURE getComments
AS
BEGIN
    SELECT *
    FROM Comments
    WHERE isDeleted = 0;
END
