CREATE OR ALTER PROCEDURE getCommentsByQuestionId
    @questionId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Comments
    WHERE questionId = @questionId
        AND isDeleted = 0;
END
