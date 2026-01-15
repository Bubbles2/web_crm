
CREATE DATABASE crm_db_ag;

CREATE TABLE leads(
    lead_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'New'
);
