CREATE OR ALTER PROCEDURE getCommentsByQuestionId
    @questionId VARCHAR(255)
AS
BEGIN
    SELECT C.*, U.userName
    FROM Comments C
    LEFT JOIN Users U ON C.userId = U.userId
    WHERE C.questionId = @questionId
        AND C.isDeleted = 0;
END


