
CREATE DATABASE crm_db_ag;

CREATE TABLE leads(
    lead_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    status VARCHAR(50) DEFAULT 'New'
);

CREATE TABLE deals(
    deal_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    amount DECIMAL(10, 2),
    stage VARCHAR(50) DEFAULT 'Proposal',
    contact_id VARCHAR(255),
    lead_id VARCHAR(255)
);
