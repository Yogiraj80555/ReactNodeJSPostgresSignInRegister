CREATE DATABASE jwttoken;

-- Creating user
CREATE USER 'admin' WITH ENCRYPTED PASSWORD '123';

-- Granting permission to user
GRANT ALL PRIVILEGES ON DATABASE 'jwttoken' TO 'admin'

-- Enabling the uuis extension
CREATE extension if not exists"uuid-ossp";

--creating a table
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL
); 

-- inserting an user
-- keep this an single quatation always
INSERT INTO users (user_name, user_email, user_password) VALUES ('admin', 'admin@admin.com', '@dmin')