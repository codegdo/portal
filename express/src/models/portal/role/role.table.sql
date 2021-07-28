CREATE TABLE IF NOT EXISTS dbo.roletype (
  id SERIAL NOT NULL,
  name roletype_enum NOT NULL,
  --
  PRIMARY KEY(id)
);

CREATE TYPE dbo.roletype_enum AS ENUM ('system', 'internal', 'external');

CREATE TABLE IF NOT EXISTS sec.role (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  
  org_id INT,
  roletype_id INT,

  is_owner BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(roletype_id) REFERENCES dbo.roletype(id) ON DELETE SET NULL
);
