CREATE OR ALTER PROCEDURE deleteAnswer
    @answerId VARCHAR(255)
AS
BEGIN
    UPDATE Answers
    SET isDeleted = 1
    WHERE answerId = @answerId;
END
