CREATE OR ALTER PROCEDURE addUser (
  @userId VARCHAR(255),
  @userName VARCHAR(255),
  @email VARCHAR(255),
  @password VARCHAR(255),
  @createdAt DATETIME,
  @isAdmin BIT
) AS
BEGIN
  INSERT INTO users (userId, userName, email, password, createdAt, isAdmin)
  VALUES (@userId, @userName, @email, @password, @createdAt, @isAdmin)
END


SELECT * FROM Users

DELETE FROM Users;
