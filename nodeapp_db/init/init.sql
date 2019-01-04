CREATE DATABASE nodeapp;
CREATE USER nodeapp WITH ENCRYPTED PASSWORD 'nodeapp123';
GRANT ALL PRIVILEGES ON DATABASE nodeapp TO nodeapp;


-- \connect nodeapp;

-- CREATE TABLE IF NOT EXISTS "users" (
--   id SERIAL PRIMARY KEY,
--   email VARCHAR(32),
--   pass VARCHAR(32),
--   createdAt TIMESTAMP,
--   updatedAt TIMESTAMP
-- );

-- GRANT ALL PRIVILEGES ON TABLE users TO nodeapp;




