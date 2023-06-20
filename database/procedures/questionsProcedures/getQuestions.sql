CREATE OR ALTER PROCEDURE getQuestions
AS
BEGIN
    SELECT q.*,
           u.userName
    FROM Questions q
    JOIN Users u ON q.userId = u.userId
    WHERE q.isDeleted = 0;
END
