CREATE TABLE IF NOT EXISTS org.contact (
  id SERIAL NOT NULL,

  first_name VARCHAR(45),
  last_name VARCHAR(45),
  title VARCHAR(95),

  email_address VARCHAR(45),
  phone VARCHAR(20),
  mobile_phone VARCHAR(20),
  other_phone VARCHAR(20),
  fax VARCHAR(20),

  street_address VARCHAR(95),
  city VARCHAR(95),
  postal_code VARCHAR(18),
  territory_id INT,

  json TEXT,

  company_id INT,
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