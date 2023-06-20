CREATE TABLE Users (
  userId VARCHAR(255) PRIMARY KEY,
  userName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  emailSent INT DEFAULT 0,
  isDeleted INT DEFAULT 0,
  isAdmin INT DEFAULT 0
);


ALTER TABLE Users
ADD UNIQUE (email)


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
    tab.name = 'Users';


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
    fk.parent_object_id = OBJECT_ID('Users');


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
    fk.referenced_object_id = OBJECT_ID('Users');



-- query to check for trigggers
SELECT name
FROM sys.triggers
WHERE parent_id = OBJECT_ID('Users');


-- query to find dependent objects
SELECT referencing_schema_name, referencing_entity_name, referencing_id
FROM sys.dm_sql_referencing_entities('dbo.Users', 'OBJECT');


-- Remove the foreign key constraints
ALTER TABLE Votes
DROP CONSTRAINT FK__Votes__userId__02FC7413

ALTER TABLE Questions
DROP CONSTRAINT FK__Questions__userI__29572725

ALTER TABLE Comments
DROP CONSTRAINT  FK__Comments__userId__34C8D9D1






SELECT * FROM Users;

DELETE FROM Users
WHERE email = 'samuelndambuki401@gmail.com';




DROP TABLE Users;



UPDATE  Users set emailSent=0;