-- MODULE
CREATE TABLE IF NOT EXISTS dbo.module (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_external BOOLEAN DEFAULT FALSE,
  is_internal BOOLEAN DEFAULT FALSE,
  is_subscription BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  --
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS dbo.page (
  id SERIAL,
  name TEXT,
  type TEXT CHECK(type in ('view', 'form')),
  is_active BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  --
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS sec.session (
  id TEXT NOT NULL,
  data TEXT,
  expires_at INT,
  --
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS sec.token (
  id TEXT NOT NULL,
  data TEXT,
  expires_at INT,
  --
  PRIMARY KEY(id)
);

-- ROLE
CREATE TYPE dbo.roletype_enum AS ENUM ('system', 'internal', 'external');

CREATE TABLE IF NOT EXISTS dbo.roletype (
  id SERIAL NOT NULL,
  name roletype_enum NOT NULL,
  --
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS sec.role (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  is_owner BOOLEAN DEFAULT FALSE,
  org_id INT,
  roletype_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(roletype_id) REFERENCES dbo.roletype(id) ON DELETE
  SET
    NULL
);

CREATE TABLE IF NOT EXISTS sec.policy (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  data TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  org_id INT,
  roletype_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(roletype_id) REFERENCES dbo.roletype(id) ON DELETE
  SET
    NULL
);

CREATE TABLE IF NOT EXISTS sec.role_policy (
  role_id INT NOT NULL,
  policy_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  --
  PRIMARY KEY(role_id, policy_id),
  FOREIGN KEY(role_id) REFERENCES sec.role(id) ON DELETE CASCADE,
  FOREIGN KEY(policy_id) REFERENCES sec.policy(id) ON DELETE CASCADE
);

CREATE INDEX idx_role_policy ON sec.role_policy(role_id, policy_id);

-- USER
CREATE TABLE IF NOT EXISTS sec.user (
  id SERIAL NOT NULL,
  email VARCHAR(45),
  username VARCHAR(45),
  password VARCHAR(75),
  salt VARCHAR(75),
  data TEXT,
  is_active BOOLEAN DEFAULT FALSE,
  role_id INT,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  UNIQUE(username),
  FOREIGN KEY(role_id) REFERENCES sec.role(id)
);

CREATE TABLE IF NOT EXISTS sec.organization (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  street_address VARCHAR(45),
  city VARCHAR(45),
  postal_code VARCHAR(15),
  phone VARCHAR(15),
  fax VARCHAR(15),
  website VARCHAR(45),
  hostname VARCHAR(45) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  territory_id INT,
  owner_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  UNIQUE(hostname, owner_id),
  FOREIGN KEY(owner_id) REFERENCES sec.user(id)
);

-- TEMPLATE
CREATE TYPE org.templatetype_enum AS ENUM('internal', 'external', 'general');

CREATE TABLE IF NOT EXISTS org.template (
  id SERIAL NOT NULL,
  name VARCHAR(45),
  type templatetype_enum,
  data TEXT,
  html TEXT,
  style TEXT,
  is_active BOOLEAN,
  org_id INT,
  --
  PRIMARY KEY(id)
);

-- DROP
DROP TABLE IF EXISTS dbo.module,
dbo.roletype,
org.company,
org.contact,
org.subscription,
org.template,
sec.organization,
sec.policy,
sec.role,
sec.role_policy,
sec.session,
sec.token,
sec.user CASCADE;

DROP TYPE IF EXISTS dbo.roletype_enum,
org.templatetype_enum;