CREATE OR ALTER PROCEDURE getComments
AS
BEGIN
    SELECT C.*, U.userName, Q.title
    FROM Comments C
    LEFT JOIN Users U ON C.userId = U.userId
    LEFT JOIN Questions Q ON C.questionId = Q.questionId
    WHERE C.isDeleted = 0;
END
