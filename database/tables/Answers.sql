CREATE TABLE Answers (
  answerId VARCHAR(255) PRIMARY KEY,
  userId VARCHAR(255) NOT NULL,
  questionId VARCHAR(255) NOT NULL,
  body VARCHAR(255) NOT NULL,
  isDeleted INT DEFAULT 0,
  isPreferred INT DEFAULT 0, 
  FOREIGN KEY (userId) REFERENCES Users(userId),
  FOREIGN KEY (questionId) REFERENCES Questions(questionId)
);


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
    tab.name = 'Answers';


-- CHECK OTHER TABLES REFERENCING ANSWERS TABLE WITH FOREIGN KEY CONSTRAINTS
-- IDENTIFIES TABES THAT REFERENCE ANSWERS TABLE
SELECT
    obj.name AS ConstraintName,
    sch.name AS SchemaName,
    tab.name AS TableName
FROM
    sys.foreign_keys fk
    INNER JOIN sys.objects obj ON obj.object_id = fk.object_id
    INNER JOIN sys.tables tab ON tab.object_id = fk.referenced_object_id
    INNER JOIN sys.schemas sch ON sch.schema_id = tab.schema_id
WHERE
    fk.parent_object_id = OBJECT_ID('Answers');

-- identify other foreign key constraints
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
    fk.referenced_object_id = OBJECT_ID('Answers');




-- Remove the foreign key constraint on userId
ALTER TABLE Answers
DROP CONSTRAINT FK__Answers__userId__787EE5A0;

-- Remove the foreign key constraint on questionId
ALTER TABLE Answers
DROP CONSTRAINT FK__Answers__questio__797309D9;


-- foreign key from votes table
ALTER TABLE Votes
DROP CONSTRAINT FK__Votes__answerId__03F0984C;



-- query to check for trigggers
SELECT name
FROM sys.triggers
WHERE parent_id = OBJECT_ID('Answers');


-- query to find dependent objects
SELECT referencing_schema_name, referencing_entity_name, referencing_id
FROM sys.dm_sql_referencing_entities('dbo.Answers', 'OBJECT');


DROP PROCEDURE insertAnswer;
DROP PROCEDURE updatePreferredAnswerEmailSent;


DROP TABLE Answers;


-- ALTER TABLE Answers
-- ADD upVote VARCHAR(255) DEFAULT 0,
--     downVote VARCHAR(255) DEFAULT 0;

ALTER TABLE Answers
ADD isDeleted INT DEFAULT 0;

ALTER TABLE Answers 
ADD isPreferredEmailSent INT DEFAULT 0;



ALTER TABLE Answers
ADD  createdAt DATETIME;


ALTER TABLE Answers
ADD  updatedAt DATETIME;

UPDATE answers
SET ispreferredEmailSent = 0;

ALTER TABLE Answers
ADD upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0;

ALTER TABLE Answers
DROP COLUMN upvotes;

ALTER TABLE Answers
DROP COLUMN downvotes;

EXEC sp_depends 'Answers.upvotes';

SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Answers' AND COLUMN_NAME = 'upvotes';

ALTER TABLE Answers
DROP CONSTRAINT DF__Answers__upvotes__5E8A0973;




ALTER TABLE Answers
ADD upvotes  INT DEFAULT 0,
    downvotes INT DEFAULT 0


ALTER TABLE Answers
ADD CONSTRAINT FK_Answers_Votes
FOREIGN KEY (voteId)
REFERENCES Votes(voteId);



SELECT * FROM Answers;
