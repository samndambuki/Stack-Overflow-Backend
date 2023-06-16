CREATE OR ALTER PROCEDURE updateUser
(
    @userId VARCHAR(255),
    @userName VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @updatedAt DATETIME
)
AS
BEGIN
    UPDATE Users
    SET
        userName = @userName,
        email = @email,
        password = @password,
        updatedAt = @updatedAt
    WHERE
        userId = @userId
END
