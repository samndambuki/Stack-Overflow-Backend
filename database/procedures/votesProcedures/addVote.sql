CREATE PROCEDURE addVote
    @voteId VARCHAR(255),
    @userId VARCHAR(255),
    @answerId VARCHAR(255),
    @upVote INT,
    @downVote INT
AS
BEGIN
    INSERT INTO Votes (voteId, userId, answerId, upVote, downVote)
    VALUES (@voteId, @userId, @answerId, @upVote, @downVote);
END
