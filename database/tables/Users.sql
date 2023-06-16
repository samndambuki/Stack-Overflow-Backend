CREATE TABLE Users (
  userId VARCHAR(255) PRIMARY KEY,
  userName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME
);


ALTER TABLE Users
ADD isDeleted INT DEFAULT 0,
    isAdmin INT DEFAULT 0,
    emailsReceived INT DEFAULT 0;
