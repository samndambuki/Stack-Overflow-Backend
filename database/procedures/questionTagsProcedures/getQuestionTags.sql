CREATE OR ALTER PROCEDURE getQuestionTags
AS
BEGIN
    SELECT qt.*,
           q.title,
           t.tagName
    FROM QuestionTags qt
    JOIN Questions q ON qt.questionId = q.questionId
    JOIN Tags t ON qt.tagId = t.tagId
    WHERE qt.isDeleted = 0;
END
