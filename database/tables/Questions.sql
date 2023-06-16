CREATE TABLE Questions (
  questionId VARCHAR(255) PRIMARY KEY,
  userId VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  details VARCHAR(255) NOT NULL,
  tried VARCHAR(255) NOT NULL,
  tags VARCHAR(255) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (userId) REFERENCES Users(userId)
);
