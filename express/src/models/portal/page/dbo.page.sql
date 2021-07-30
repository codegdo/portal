CREATE TABLE IF NOT EXISTS dbo.page (
    id SERIAL,
    name TEXT,
    type VARCHAR(45) CHECK(type in ('view', 'form')),
    parent_id INT,
    sort_order INTEGER DEFAULT 0,
    is_external BOOLEAN DEFAULT TRUE,
    is_internal BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --
    PRIMARY KEY(id)
);