CREATE OR ALTER PROCEDURE GetUserByEmail
    @email VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE email = @email;
END


EXEC GetUserByEmail @email="samuelndambuki401@gmail.com"