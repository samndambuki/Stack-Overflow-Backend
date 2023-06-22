CREATE OR ALTER PROCEDURE updatePreferredAnswerEmailSent
AS
BEGIN
    DECLARE @preferredAnswerId VARCHAR(255);

    -- Get the answer ID of the most preferred answer (based on answerId)
    SELECT TOP 1 @preferredAnswerId = answerId
    FROM Answers
    WHERE isPreferred = 1
    ORDER BY answerId DESC;

    -- Update the isPreferredEmailSent column for the most preferred answer
    UPDATE Answers
    SET isPreferredEmailSent = 1
    WHERE answerId = @preferredAnswerId;
END;



DROP PROCEDURE updatePreferredAnswerEmailSent;