CREATE TABLE QuestionTags (
  questionId VARCHAR(255),
  tagId VARCHAR(255),
  FOREIGN KEY (questionId) REFERENCES Questions(questionId),
  FOREIGN KEY (tagId) REFERENCES Tags(tagId),
  isDeleted INT DEFAULT 0
);


ALTER TABLE QuestionTags
ADD isDeleted INT DEFAULT 0;


SELECT * FROM QuestionTags;

DROP TABLE QuestionTags;