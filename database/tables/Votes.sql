CREATE TABLE Votes (
  voteId VARCHAR(255) PRIMARY KEY,
  userId VARCHAR(255) NOT NULL,
  answerId VARCHAR(255) NOT NULL,
  upVote INT DEFAULT 0,
  downVote INT DEFAULT 0,
  FOREIGN KEY (userId) REFERENCES Users(userId),
  FOREIGN KEY (answerId) REFERENCES Answers(answerId)
);


SELECT * FROM Votes

INSERT INTO Votes (voteId, userId, answerId, upVote, downVote)
VALUES ('1', '3d4f228f-68b8-4a02-8331-8c42b0c93285', '9ec4f077-e521-498a-8954-d6cbcef84230', 1, 0);


DROP TABLE Votes;