CREATE PROCEDURE getVoteCountsByAnswerId
  @answerId VARCHAR(255)
AS
BEGIN
  SELECT
    SUM(upVote) AS upvotes,
    SUM(downVote) AS downvotes
  FROM
    Votes
  WHERE
    answerId = @answerId;
END;
