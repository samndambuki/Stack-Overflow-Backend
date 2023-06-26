CREATE TABLE Questions (
  questionId VARCHAR(255) PRIMARY KEY,
  userId VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  details VARCHAR(255) NOT NULL,
  tried VARCHAR(255) NOT NULL,
  tags VARCHAR(255) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  isDeleted INT DEFAULT 0,
  FOREIGN KEY (userId) REFERENCES Users(userId)
);


ALTER TABLE Questions
ADD COLUMN tag_id VARCHAR(255);


ALTER TABLE Questions
ADD tag_id VARCHAR(255) NULL REFERENCES Tags(tagId) ON DELETE CASCADE;

DROP CONSTRAINT FK__Questions__tag_i__51300E55




ALTER TABLE Questions
ADD isDeleted INT DEFAULT 0;


SELECT * FROM Questions;


-- retrieves foreign key statements associated with answers table
SELECT
    obj.name AS ConstraintName,
    sch.name AS SchemaName,
    tab.name AS TableName
FROM
    sys.foreign_keys fk
    INNER JOIN sys.objects obj ON obj.object_id = fk.object_id
    INNER JOIN sys.tables tab ON tab.object_id = fk.parent_object_id
    INNER JOIN sys.schemas sch ON sch.schema_id = tab.schema_id
WHERE
    tab.name = 'Questions';