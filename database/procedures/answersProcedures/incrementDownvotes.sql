CREATE PROCEDURE incrementDownvotes
  @answerId VARCHAR(255)
AS
BEGIN
  UPDATE Answers
  SET downvotes = downvotes + 1
  WHERE answerId = @answerId;
END;