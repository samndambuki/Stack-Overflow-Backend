CREATE OR ALTER PROCEDURE getUserById
  @userId VARCHAR(255)
AS
BEGIN
  SELECT * FROM Users WHERE userId = @userId AND isDeleted=0;
END;


