CREATE OR ALTER PROCEDURE getCommentById
    @commentId VARCHAR(255)
AS
BEGIN
    SELECT C.*, U.userName, Q.title AS questionTitle, A.body AS answerBody
    FROM Comments C
    LEFT JOIN Users U ON C.userId = U.userId
    LEFT JOIN Questions Q ON C.questionId = Q.questionId
    LEFT JOIN Answers A ON C.answerId = A.answerId
    WHERE C.commentId = @commentId
        AND C.isDeleted = 0;
END
