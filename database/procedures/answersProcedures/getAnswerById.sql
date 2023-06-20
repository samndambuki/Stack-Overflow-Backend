CREATE OR ALTER PROCEDURE getAnswerById
    @answerId VARCHAR(255)
AS
BEGIN
    SELECT A.*, U.userName
    FROM Answers A
    INNER JOIN Users U ON A.userId = U.userId
    WHERE A.answerId = @answerId AND A.isDeleted = 0;
END


DROP PROCEDURE getAnswerById;