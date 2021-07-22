CREATE TABLE IF NOT EXISTS org.program (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(225),
  reg_prefix VARCHAR(4) DEFAULT 'REG',

  form_id INT,
  owner_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS org.registration (
  id SERIAL NOT NULL,
  reg_number VARCHAR(45) NOT NULL,
  json TEXT,

  program_id INT NOT NULL,
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
  FOREIGN KEY(program_id) REFERENCES org.program(id) ON DELETE CASCADE
);
