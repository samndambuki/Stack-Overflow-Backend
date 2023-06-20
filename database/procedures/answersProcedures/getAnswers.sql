CREATE OR ALTER PROCEDURE getAnswers
AS
BEGIN
    SELECT A.*, U.userName
    FROM Answers A
    INNER JOIN Users U ON A.userId = U.userId
    WHERE A.isDeleted = 0
END



DROP PROCEDURE getAnswers;