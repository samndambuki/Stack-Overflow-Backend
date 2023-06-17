CREATE TABLE Comments (
  commentId VARCHAR(255) PRIMARY KEY,
  userId VARCHAR(255),
  questionId VARCHAR(255),
  answerId VARCHAR(255),
  body VARCHAR(255),
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (userId) REFERENCES Users(userId),
  FOREIGN KEY (questionId) REFERENCES Questions(questionId),
  FOREIGN KEY (answerId) REFERENCES Answers(answerId)
);


ALTER TABLE Comments
ADD isDeleted INT DEFAULT 0;
