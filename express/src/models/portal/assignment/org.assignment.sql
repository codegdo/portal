CREATE TABLE IF NOT EXISTS org.assignment (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,

  owner_id INT NOT NULL,
  org_id INT NOT NULL,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
);

CREATE TYPE org.assignmentcompanytype_enum AS ENUM ('region', 'country', 'state', 'company');

CREATE TABLE IF NOT EXISTS org.assignment_company (
  id SERIAL NOT NULL,
  
  assignment_type assignmentcompanytype_enum NOT NULL DEFAULT 'company',
  company_id INT NOT NULL,

  assignment_id INT NOT NULL,
  owner_id INT NOT NULL,
  org_id INT NOT NULL,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(company_id) REFERENCES org.company(id),
  FOREIGN KEY(assignment_id) REFERENCES org.assignment(id) ON DELETE CASCADE
);

CREATE TYPE org.assignmentusertype_enum AS ENUM ('group', 'role', 'user');

CREATE TABLE IF NOT EXISTS org.assignment_user (
  id SERIAL NOT NULL,
  
  assignment_type assignmentusertype_enum NOT NULL DEFAULT 'user',
  user_id INT NOT NULL,

  assignment_id INT NOT NULL,
  owner_id INT NOT NULL,
  org_id INT NOT NULL,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES sec.user(id),
  FOREIGN KEY(assignment_id) REFERENCES org.assignment(id) ON DELETE CASCADE
);



