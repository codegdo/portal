CREATE TABLE IF NOT EXISTS dbo.emailtype (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  --
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS org.email (
  id SERIAL NOT NULL,

  name VARCHAR(45) NOT NULL,
  format VARCHAR(45) CHECK(format in ('html', 'text')),
  subject VARCHAR(255) NOT NULL,
  body TEXT,

  emailtype_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(emailtype_id) REFERENCES dbo.emailtype(id) ON DELETE CASCADE
);