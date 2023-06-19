CREATE OR ALTER PROCEDURE getUsersWithEmailNotSent
AS
BEGIN
    SELECT *
    FROM Users
    WHERE emailSent = 0;
END


DROP PROCEDURE getUsersWithEmailNotSent;
