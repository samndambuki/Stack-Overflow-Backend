CREATE OR ALTER PROCEDURE getUsers
AS
BEGIN
    SELECT *
    FROM Users
    WHERE isDeleted = 0;
END;
