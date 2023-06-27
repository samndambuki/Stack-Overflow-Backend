CREATE PROCEDURE incrementUpvotes
  @answerId VARCHAR(255)
AS
BEGIN
  UPDATE Answers
  SET upvotes = upvotes + 1
  WHERE answerId = @answerId;
END;