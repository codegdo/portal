-- dbo
CREATE TABLE IF NOT EXISTS dbo.feature (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  price NUMERIC(8,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS dbo.feature_module (
  feature_id INT NOT NULL,
  module_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(feature_id, module_id),
  FOREIGN KEY(feature_id) REFERENCES dbo.feature(id) ON DELETE CASCADE,
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dbo.module (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  sort_group INTEGER DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS dbo.module_page (
    module_id INT NOT NULL,
    page_id INT NOT NULL,
    org_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --
    PRIMARY KEY(module_id, page_id),
    FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE CASCADE,
    FOREIGN KEY(page_id) REFERENCES dbo.page(id) ON DELETE CASCADE
);
CREATE INDEX idx_module_page ON dbo.module_page(module_id, page_id);

CREATE TABLE IF NOT EXISTS dbo.plan (
    id SERIAL NOT NULL,
    name VARCHAR(45),
    duration INT,
    --
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS dbo.emailtype (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  --
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS dbo.roletype (
  id SERIAL NOT NULL,
  name roletype_enum NOT NULL,
  --
  PRIMARY KEY(id)
);

CREATE TYPE dbo.roletype_enum AS ENUM ('system', 'internal', 'external');
CREATE TYPE org.templatetype_enum AS ENUM('internal', 'external', 'general');

-- org
CREATE TABLE IF NOT EXISTS org.email (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  format VARCHAR(45) CHECK(format in ('html', 'text')),
  subject VARCHAR(255) NOT NULL,
  body TEXT,
  json TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  emailtype_id INT,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(emailtype_id) REFERENCES dbo.emailtype(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS org.template (
  id SERIAL NOT NULL,
  name VARCHAR(45),
  type templatetype_enum,
  json TEXT,
  html TEXT,
  style TEXT,
  is_active BOOLEAN,
  org_id INT,
  --
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS org.subscription (
  module_id INT NOT NULL,
  org_id INT NOT NULL,
  plan_id INT,
  is_renewed BOOLEAN,
  is_trial BOOLEAN,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(module_id, org_id),
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE CASCADE,
  FOREIGN KEY(org_id) REFERENCES sec.organization(id) ON DELETE CASCADE,
  FOREIGN KEY(plan_id) REFERENCES dbo.plan(id)
);

-- sec
CREATE TABLE IF NOT EXISTS sec.session (
    id TEXT NOT NULL,
    json TEXT,
    expired_at BIGINT,
    --
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS sec.token (
    id TEXT NOT NULL,
    json TEXT,
    expired_at BIGINT,
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
  FOREIGN KEY(roletype_id) REFERENCES dbo.roletype(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS sec.policy (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  json TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  org_id INT,
  roletype_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(roletype_id) REFERENCES dbo.roletype(id) ON DELETE SET NULL
);

CREATE INDEX idx_role_policy ON sec.role_policy(role_id, policy_id);

CREATE TABLE IF NOT EXISTS sec.role_policy (
  role_id INT NOT NULL,
  policy_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(role_id, policy_id),
  FOREIGN KEY(role_id) REFERENCES sec.role(id) ON DELETE CASCADE,
  FOREIGN KEY(policy_id) REFERENCES sec.policy(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS sec.user (
  id SERIAL NOT NULL,
  email VARCHAR(45),
  username VARCHAR(45),
  password VARCHAR(75),
  salt VARCHAR(75),
  json TEXT,
  is_active BOOLEAN DEFAULT FALSE,
  role_id INT,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
  subdomain VARCHAR(45) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  territory_id INT,
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


-- DROP
DROP TABLE IF EXISTS
dbo.module,
dbo.page,
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

DROP TYPE IF EXISTS
dbo.roletype_enum,
org.templatetype_enum;

