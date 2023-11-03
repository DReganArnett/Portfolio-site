-- from terminal run: 
-- psql < portfolio.sql

DROP DATABASE portfolio;
CREATE DATABASE portfolio;

\connect portfolio

\i portfolio-schema.sql
\i portfolio-seed.sql

\echo 'Delete and recreate portoflio_test db?'
\prompt 'Return for yest, or control-C to cancel >'

DROP DATABASE portfolio_test;
CREATE DATABASE portfolio_test;
\connect portfolio_test;

\i portfolio-schema.sql;