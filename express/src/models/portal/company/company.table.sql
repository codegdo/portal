CREATE TABLE IF NOT EXISTS org.contact (
  id SERIAL NOT NULL,

  name VARCHAR(95),

  phone VARCHAR(20),
  fax VARCHAR(20),

  billing_street_address VARCHAR(95),
  billing_city VARCHAR(95),
  billing_postal_code VARCHAR(18),
  billing_state VARCHAR(18),
  billing_country VARCHAR(18),
  billing_territory_id INT,

  json TEXT,

  form_id INT,
  owner_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(territory_id) REFERENCES dbo.territory(id),
  FOREIGN KEY(owner_id) REFERENCES org.user(id)
);