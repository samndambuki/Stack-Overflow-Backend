CREATE OR ALTER PROCEDURE deleteAnswer
(
    @answerId VARCHAR(255)
)
AS
BEGIN
    DELETE FROM Answers
    WHERE answerId = @answerId
END
