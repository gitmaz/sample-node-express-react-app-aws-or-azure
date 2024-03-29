use Illuminate\Support\Facades\DB;

// Assuming you have $referencingTables from the previous code snippet
$xId = 123; // replace with your actual ID value

// Collect IDs from referencing tables where foreign key refers to $xId
$referencingIds = [];

foreach ($referencingTables as $referencingTable) {
    $tableName = $referencingTable->table_name;

    // Assuming your foreign key column name is 'x', replace it if needed
    $foreignKeyColumn = 'x';

    // Query to get IDs where foreign key refers to $xId
    $ids = DB::table($tableName)
        ->where($foreignKeyColumn, $xId)
        ->pluck('id'); // assuming 'id' is the primary key column, replace if needed

    // Append the IDs to the result array
    $referencingIds[$tableName] = $ids;
}

// Output or use $referencingIds as needed
print_r($referencingIds);

//php artisan make:command RelationResolverCommand


<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class RelationResolverCommand extends Command
{
    protected $signature = 'relation:resolve {table}';
    protected $description = 'Resolve related tables for a given table';

    public function handle()
    {
        $tableName = $this->argument('table');
        
        $relationResolver = new RelationResolver();
        $relatedTables = $relationResolver->getRelatedTables($tableName);

        $this->info("Related tables for {$tableName}:");
        foreach ($relatedTables as $relatedTable) {
            $this->line($relatedTable);
        }
    }
}

class RelationResolver
{
    public function getRelatedTables($tableName)
    {
        $relatedTables = [];

        $foreignKeys = Schema::getConnection()->getDoctrineSchemaManager()->listTableForeignKeys($tableName);

        foreach ($foreignKeys as $foreignKey) {
            $referencedTable = $foreignKey->getForeignTableName();
            $referencedColumn = $foreignKey->getForeignColumns()[0];

            $referencingTables = DB::table('information_schema.key_column_usage')
                ->select('table_name')
                ->where('referenced_table_name', $tableName)
                ->where('referenced_column_name', $referencedColumn)
                ->get();

            foreach ($referencingTables as $referencingTable) {
                $relatedTables[] = $referencingTable->table_name;
            }
        }

        return $relatedTables;
    }
}


//php artisan relation:resolve YourTableName


// now generate insert statement given an id of the record, on origin and all
 // related tables.

class RecordInserter
{
    public function generateInsertStatement($tableName, $recordId)
    {
        // Assuming 'id' is the primary key column, replace if needed
        $columns = DB::getSchemaBuilder()->getColumnListing($tableName);
        $record = DB::table($tableName)->where('id', $recordId)->first();

        if (!$record) {
            return null; // Record not found
        }

        $insertStatement = "INSERT INTO {$tableName} (";

        foreach ($columns as $column) {
            $insertStatement .= "{$column}, ";
        }

        $insertStatement = rtrim($insertStatement, ', ') . ') VALUES (';

        foreach ($columns as $column) {
            $insertStatement .= "'{$record->$column}', ";
        }

        $insertStatement = rtrim($insertStatement, ', ') . ");\n";

        return $insertStatement;
    }
}

class RelationResolverCommand extends Command
{
    // ...

    public function handle()
    {
        $tableName = $this->argument('table');
        $recordId = $this->ask("Enter the ID of the record for table {$tableName}:");

        $recordInserter = new RecordInserter();
        $insertStatements = $recordInserter->generateInsertStatements($tableName, $recordId);

        if (!$insertStatements) {
            $this->error("Record with ID {$recordId} not found in table {$tableName}.");
            return;
        }

        $this->info("Insert statements for table {$tableName} and related tables:");

        // Save insert statements to a file
        $filename = 'insert.sql';
        file_put_contents($filename, $insertStatements);

        foreach ($insertStatements as $insertStatement) {
            $this->line($insertStatement);
        }

        $this->info("Insert statements saved to {$filename}.");
    }
}


class RelationResolver
{
    // ...

    public function generateInsertStatements($tableName, $recordId)
    {
        $insertStatements = [];

        $relatedTables = $this->getRelatedTables($tableName);

        foreach ($relatedTables as $relatedTable) {
            $recordInserter = new RecordInserter();
            $insertStatement = $recordInserter->generateInsertStatement($relatedTable, $recordId);

            if ($insertStatement) {
                $insertStatements[] = $insertStatement;
            }
        }

        return $insertStatements;
    }
}
