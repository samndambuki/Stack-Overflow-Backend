CREATE OR ALTER PROCEDURE deleteQuestion
(
    @questionId VARCHAR(255)
)
AS
BEGIN
    DELETE FROM Questions
    WHERE questionId = @questionId
END
