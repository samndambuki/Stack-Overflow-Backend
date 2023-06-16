CREATE OR ALTER PROCEDURE addUser
(
    @userId VARCHAR(255),
    @userName VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @createdAt DATETIME,
    @updatedAt DATETIME
)
AS
BEGIN
    INSERT INTO Users
    (
        userId,
        userName,
        email,
        password,
        createdAt,
        updatedAt
    )
    VALUES
    (
        @userId,
        @userName,
        @email,
        @password,
        @createdAt,
        @updatedAt
    )
END
