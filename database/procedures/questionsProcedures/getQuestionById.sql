CREATE OR ALTER PROCEDURE getQuestionById
    @questionId VARCHAR(255)
AS
BEGIN
    SELECT q.*,
           u.userName
    FROM Questions q
    JOIN Users u ON q.userId = u.userId
    WHERE q.questionId = @questionId
        AND q.isDeleted = 0;
END
