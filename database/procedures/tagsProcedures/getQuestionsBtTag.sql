CREATE OR ALTER PROCEDURE getQuestionsByTag
  @tagId NVARCHAR(50)
AS
BEGIN
  SELECT q.questionId, q.title, q.details, q.tried, u.userName, q.tags
  FROM Questions q
  INNER JOIN Tags t ON q.tag_id = t.tagId
  INNER JOIN Users u ON q.userId = u.userId
  WHERE t.tagId = @tagId;
END



SELECT * FROM Questions;