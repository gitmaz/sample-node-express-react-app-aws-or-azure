DECLARE @PageSize INT = /* your desired page size */;

DECLARE @TotalRecords INT;

-- Your complex query with multiple joins
WITH OriginalResultSet AS (
    SELECT column1, column2, ...
    FROM table1
    JOIN table2 ON table1.column = table2.column
    JOIN table3 ON table2.column = table3.column
    -- Add other joins, conditions, and ordering as needed
)
SELECT @TotalRecords = COUNT(*) FROM OriginalResultSet;

DECLARE @MaxPageCount INT = CEILING(CONVERT(FLOAT, @TotalRecords) / @PageSize);

SELECT @MaxPageCount AS MaxPages;






--method two: return the pagination max pages on the same sql.


DECLARE @PageSize INT = /* your desired page size */;
DECLARE @PageNumber INT = /* specify the page number you want to retrieve */;

WITH OriginalResultSet AS (
    SELECT column1, column2, ...
    FROM table1
    JOIN table2 ON table1.column = table2.column
    JOIN table3 ON table2.column = table3.column
    -- Add other joins, conditions, and ordering as needed
)
SELECT 
    column1, column2, ...,
    COUNT(*) OVER () AS TotalRecords
FROM OriginalResultSet
ORDER BY some_column
OFFSET (@PageSize * (@PageNumber - 1)) ROWS
FETCH NEXT @PageSize ROWS ONLY;


--third solution
DECLARE @PageSize INT = /* your desired page size */;
DECLARE @PageNumber INT = /* specify the page number you want to retrieve */;

WITH OriginalResultSet AS (
    SELECT column1, column2, ...
    FROM table1
    JOIN table2 ON table1.column = table2.column
    JOIN table3 ON table2.column = table3.column
    -- Add other joins, conditions, and ordering as needed
),
PagedResultSet AS (
    SELECT 
        column1, column2, ...,
        ROW_NUMBER() OVER (ORDER BY some_column) AS RowNum,
        COUNT(*) OVER () AS TotalRecords
    FROM OriginalResultSet
)
SELECT 
    column1, column2, ...,
    TotalRecords
FROM PagedResultSet
WHERE RowNum BETWEEN (@PageSize * (@PageNumber - 1) + 1) AND (@PageSize * @PageNumber);

-- usages in cf


<cfquery name="myQuery" datasource="yourDataSource">
   DECLARE @PageSize INT = /* your desired page size */;
   DECLARE @TotalRecords INT;

   -- Your complex query with multiple joins
   WITH OriginalResultSet AS (
       SELECT column1, column2, ...
       FROM table1
       JOIN table2 ON table1.column = table2.column
       JOIN table3 ON table2.column = table3.column
       -- Add other joins, conditions, and ordering as needed
   )
   SELECT @TotalRecords = COUNT(*) FROM OriginalResultSet;

   DECLARE @MaxPageCount INT = CEILING(CONVERT(FLOAT, @TotalRecords) / @PageSize);

   SELECT @TotalRecords AS TotalRecords, @MaxPageCount AS MaxPageCount;
</cfquery>

<!-- Access the result sets -->
<cfset totalRecords = myQuery.TotalRecords>
<cfset maxPageCount = myQuery.MaxPageCount>

--example how to show on html table
<cfquery name="myQuery" datasource="yourDataSource">
   -- Your complex query with multiple joins
   WITH OriginalResultSet AS (
       SELECT column1, column2, ...
       FROM table1
       JOIN table2 ON table1.column = table2.column
       JOIN table3 ON table2.column = table3.column
       -- Add other joins, conditions, and ordering as needed
   )
   SELECT * FROM OriginalResultSet;
</cfquery>

<!-- Display the records in an HTML table -->
<table border="1">
    <thead>
        <tr>
            <th>Column1</th>
            <th>Column2</th>
            <!-- Add other column headers as needed -->
        </tr>
    </thead>
    <tbody>
        <cfoutput query="myQuery">
            <tr>
                <td>#myQuery.column1#</td>
                <td>#myQuery.column2#</td>
                <!-- Add other columns as needed -->
            </tr>
        </cfoutput>
    </tbody>
</table>

