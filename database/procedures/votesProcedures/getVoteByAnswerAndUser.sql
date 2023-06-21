CREATE OR ALTER PROCEDURE getVoteByAnswerAndUser
    @answerId VARCHAR(255),
    @userId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Votes
    WHERE answerId = @answerId AND userId = @userId;
END


