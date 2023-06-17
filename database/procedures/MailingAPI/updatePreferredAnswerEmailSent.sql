CREATE OR ALTER PROCEDURE updatePreferredAnswerEmailSent
    @answerId VARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET emailsReceived = 1
    WHERE userId IN (
        SELECT userId
        FROM Answers
        WHERE answerId = @answerId
    );
END
