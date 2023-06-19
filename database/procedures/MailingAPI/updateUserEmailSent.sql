CREATE OR ALTER PROCEDURE updateUserEmailSent
    @userId VARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET emailSent = 1
    WHERE userId = @userId;
END


DROP PROCEDURE updateUserEmailSent;
