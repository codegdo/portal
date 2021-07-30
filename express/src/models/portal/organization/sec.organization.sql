CREATE TABLE IF NOT EXISTS sec.organization (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,

  street_address VARCHAR(45),
  city VARCHAR(45),
  postal_code VARCHAR(15),
  territory_id INT,

  phone VARCHAR(15),
  fax VARCHAR(15),
  website VARCHAR(45),
  subdomain VARCHAR(45) NOT NULL,

  is_active BOOLEAN DEFAULT TRUE,

  owner_id INT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  UNIQUE(subdomain, owner_id),
  FOREIGN KEY(owner_id) REFERENCES sec.user(id)
);