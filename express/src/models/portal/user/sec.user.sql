-- TABLE
CREATE TABLE IF NOT EXISTS sec.user (
  id SERIAL NOT NULL,
  username VARCHAR(45),
  password VARCHAR(75),
  email_address VARCHAR(45),

  salt VARCHAR(75),
  json TEXT,
  
  company_id INT,
  contact_id INT,
  role_id INT,
  org_id INT,

  is_new_password BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  UNIQUE(username),
  FOREIGN KEY(role_id) REFERENCES sec.role(id)
);

-- INSERTS

-- FUNCTIONS
CREATE OR REPLACE FUNCTION sec.sec_fn_loginuser(_username varchar)
RETURNS TABLE (
  email_address varchar,
  username varchar,
  password varchar,
  salt varchar,
  "orgId" int,
  "isActive" boolean,
  "isOwner" boolean,
  policy text,
  roletype roletype_enum
)
LANGUAGE plpgsql
AS
$$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        u.email_address,
        u.username,
        u.password,
        u.salt,
        u.org_id,
        u.is_active,
        r.is_owner,
        p.data,
        rt.name
      FROM sec.user u
      LEFT JOIN sec.role r ON r.id = u.role_id
      LEFT JOIN sec.role_policy rp ON rp.role_id = r.id
      LEFT JOIN sec.policy p ON rp.policy_id = p.id
      LEFT JOIN dbo.roletype rt ON rt.id = r.roletype_id
      WHERE u.username = _username;
  END;
$$;


CREATE OR REPLACE FUNCTION sec.sec_fn_signupuser(_emailaddress varchar, _username varchar, _password varchar, _salt varchar, _roleid int)
RETURNS TABLE(user_id int)
LANGUAGE plpgsql
AS
$$
  DECLARE
    _lastid int;
  BEGIN
    RETURN QUERY
    WITH u AS (
      INSERT INTO sec.user(email_address, username, password, salt, data, is_active, org_id, created_at, updated_at, role_id)
      VALUES(_emailaddress, _username, _password, _salt, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, _roleid)
      RETURNING id
    )
    TABLE u;
  END;
$$;


CREATE OR REPLACE FUNCTION sec.sec_fn_signupuser(_emailaddress varchar, _username varchar, _password varchar, _salt varchar, _roleid int)
RETURNS int
LANGUAGE plpgsql
AS
$$
  DECLARE
    _lastid int;
  BEGIN
    INSERT INTO sec.user(email_address, username, password, salt, data, is_active, org_id, created_at, updated_at, role_id)
    VALUES(_emailaddress, _username, _password, _salt, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, _roleid)
    RETURNING id INTO _lastid;

    INSERT INTO sec.organization(name, hostname, owner_id)
    VALUES('hello', 'hostname', _lastid);

    RETURN _lastid;
  END;
$$;


