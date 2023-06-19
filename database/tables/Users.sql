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
DROP COLUMN emailSent;


UPDATE  Users set emailSent=0;