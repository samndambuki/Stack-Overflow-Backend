CREATE OR ALTER PROCEDURE GetMostPreferredAnswerUser
AS
BEGIN
  -- Perform the logic to determine the user with the most preferred answer
  SELECT TOP 1 U.*
  FROM Users U
  WHERE U.userId IN (
    SELECT A.userId
    FROM Answers A
    WHERE A.isPreferred = 1
    GROUP BY A.userId
    HAVING COUNT(*) = (
      SELECT MAX(answerCount)
      FROM (
        SELECT userId, COUNT(*) AS answerCount
        FROM Answers
        WHERE isPreferred = 1
        GROUP BY userId
      ) AS subquery
    )
  )
  ORDER BY U.userId;
END
