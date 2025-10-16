-- describe_tables.sql
-- Outputs the schema of all tables in the current database

-- Optional: output to a file instead of stdout
-- \o table_descriptions.txt

-- Describe each table
\d+ users
\d+ portfolio
\d+ artist_requests
\d+ request_responses

-- Reset output back to stdout if you used \o
-- \o

-- End of file
