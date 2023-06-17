CREATE OR ALTER PROCEDURE deleteQuestion
    @questionId VARCHAR(255)
AS
BEGIN
    UPDATE Questions
    SET isDeleted = 1
    WHERE questionId = @questionId;
END
