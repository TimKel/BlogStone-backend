\echo 'Delete and recreate blogstone db?'
\prompt 'Return for yes of control-C to cancel > ' foo 

DROP DATABASE blogstone;
CREATE DATABASE blogstone;
\connect blogstone 

\i blogstone-schema.sql
-- \i blogstone-seed.sql 

\echo 'Delete and recreate blogstone_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo 

DROP DATABASE blogstone_test;
CREATE DATABASE blogstone_test;
\connect blogstone_test

\i blogstone-schema.sql 