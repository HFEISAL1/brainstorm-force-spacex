-- Run this script to
--    1. Create the DB
--    2. Create a role/user with password
--    3. Grant the user privileged access to the db
--    4. Close connection
--
-- To execute, enter the mysql console by running
-- ```
--     # with dbConnection
--     $ mysql -uroot -p
--     mysql> \. /<path>/<to>/initdb.sql
-- ```
-- OR
-- ```
--     # without dbConnection
--     $ mysql -uroot -p < /<path>/<to>/initdb.sql
-- ```
\! echo "Dropping database '<db_name>'...";
DROP DATABASE IF EXISTS <db_name>;
\! echo "Re-creating database '<db_name>'...";
CREATE DATABASE <db_name> CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
\! echo "Creating user '<db_user>'...";
CREATE USER IF NOT EXISTS '<db_user>' identified by '<db_password>';
\! echo "Granting ALL permissions on '<db_name>' to '<db_user>'...";
GRANT ALL on <db_name>.* to '<db_user>';
\! echo "Success! Bye!";
quit
