CREATE OR ALTER PROCEDURE getAllComments
AS
BEGIN
    SELECT C.*, U.username, U.email
    FROM Comments C
    INNER JOIN Users U ON C.userId = U.userId
    WHERE C.isDeleted = 0
END
