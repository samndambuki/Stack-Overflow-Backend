CREATE TABLE QuestionTags (
  questionId VARCHAR(255),
  tagId VARCHAR(255),
  FOREIGN KEY (questionId) REFERENCES Questions(questionId),
  FOREIGN KEY (tagId) REFERENCES Tags(tagId)
);


ALTER TABLE QuestionTags
ADD isDeleted INT DEFAULT 0;

