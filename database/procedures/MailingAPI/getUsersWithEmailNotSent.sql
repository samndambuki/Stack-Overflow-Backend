CREATE OR ALTER PROCEDURE getUsersWithEmailNotSent
AS
BEGIN
    SELECT *
    FROM Users
    WHERE emailsReceived = 0;
END


DROP PROCEDURE getUsersWithEmailNotSent;
