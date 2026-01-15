
-- Run this in your database tool (pgAdmin, DBeaver, etc.)

-- 1. Create a new user for the CRM app
CREATE USER crm_user WITH PASSWORD 'secure_password_123';

-- 2. Grant permission to the database
GRANT ALL PRIVILEGES ON DATABASE crm_db_ag TO crm_user;

-- 3. (After running those, connect to crm_db_ag and run this if needed for table access)
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO crm_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO crm_user;
GRANT CREATE ON SCHEMA public TO crm_user;
