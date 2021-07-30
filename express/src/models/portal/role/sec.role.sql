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

-- INSERT
INSERT
INTO dbo.roletype(id, name)
VALUES
('1', 'system'),
('2', 'internal'),
('3', 'external');

INSERT
INTO sec.role(name, description, is_owner, org_id, roletype_id)
VALUES
('System User', null, '0', null, '1'),
('Owner User', null, '1', null, '2'),
('Admin User', null, '0', null, '2'),
('Partner User', null, '0', null, '3');

INSERT
INTO sec.role_policy(role_id, policy_id)
VALUES
('1', '1'),
('2', '2'),
('3', '3'),
('4', '4');
