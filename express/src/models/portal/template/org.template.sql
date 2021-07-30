CREATE TYPE org.templatetype_enum AS ENUM('internal', 'external', 'general');

CREATE TABLE IF NOT EXISTS org.template (
  id SERIAL NOT NULL,
  name VARCHAR(45),
  type templatetype_enum,
  json TEXT,
  html TEXT,
  style TEXT,
  org_id INT,

  is_active BOOLEAN,
  --
  PRIMARY KEY(id)
);