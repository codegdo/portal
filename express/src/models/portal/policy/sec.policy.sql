CREATE TABLE IF NOT EXISTS sec.policy (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  json TEXT,

  org_id INT,
  roletype_id INT,

  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(roletype_id) REFERENCES dbo.roletype(id) ON DELETE SET NULL
);