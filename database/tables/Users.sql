CREATE TABLE Users (
  userId VARCHAR(255) PRIMARY KEY,
  userName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME
);


SELECT * FROM Users;

ALTER TABLE Users
ADD isDeleted INT DEFAULT 0,
    isAdmin INT DEFAULT 0,
    emailsReceived INT DEFAULT 0;

ALTER TABLE Users
ADD emailSent BIT DEFAULT 0;


UPDATE Users
SET emailSent = CASE WHEN emailsReceived > 0 THEN 1 ELSE 0 END;

ALTER TABLE Users
DROP COLUMN emailSent;