CREATE OR ALTER PROCEDURE getAnswersByQuestionId
    @questionId VARCHAR(255)
AS
BEGIN
    SELECT A.*, U.userName
    FROM Answers A
    INNER JOIN Users U ON A.userId = U.userId
    WHERE A.questionId = @questionId AND A.isDeleted = 0;
END



DROP PROCEDURE getAnswersByQuestionId;