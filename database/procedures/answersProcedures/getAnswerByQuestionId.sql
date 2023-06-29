-- CREATE OR ALTER PROCEDURE getAnswersByQuestionId
--     @questionId VARCHAR(255)
-- AS
-- BEGIN
--     SELECT A.*, U.userName
--     FROM Answers A
--     INNER JOIN Users U ON A.userId = U.userId
--     WHERE A.questionId = @questionId AND A.isDeleted = 0;
-- END

CREATE OR ALTER PROCEDURE getAnswersByQuestionId
    @questionId VARCHAR(255)
AS
BEGIN
    -- Check if the question ID exists
    IF NOT EXISTS (SELECT 1 FROM Questions WHERE questionId = @questionId)
    BEGIN
        RAISERROR('Question not found!', 16, 1);
        RETURN;
    END

    -- Retrieve answers for the specified question ID
    SELECT A.*, U.userName
    FROM Answers A
    INNER JOIN Users U ON A.userId = U.userId
    WHERE A.questionId = @questionId AND A.isDeleted = 0;
END




SELECT * FROM Answers 
WHERE questionId='4e69f2ec-290a-4a49-8a45-2c0c7cdbe69e'
;



DROP PROCEDURE getAnswersByQuestionId;