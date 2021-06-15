CREATE OR REPLACE FUNCTION sec.fn_signupuser(_email varchar, _username varchar, _password varchar, _salt varchar, _roleid int)
RETURNS TABLE(user_id int)
LANGUAGE plpgsql
AS
$$
  DECLARE
    _lastid int;
  BEGIN
    RETURN QUERY
    WITH u AS (
      INSERT INTO sec.user(email, username, password, salt, json, is_active, org_id, created_at, updated_at, role_id)
      VALUES(_email, _username, _password, _salt, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, _roleid)
      RETURNING id
    )
    TABLE u;
  END;
$$;

CREATE OR REPLACE FUNCTION sec.fn_loginuser(_username varchar)
RETURNS TABLE (
  email varchar,
  username varchar,
  password varchar,
  salt varchar,
  orgId int,
  isActive boolean,
  isOwner boolean,
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
        u.email,
        u.username,
        u.password,
        u.salt,
        u.org_id,
        u.is_active,
        r.is_owner,
        p.json,
        rt.name
      FROM sec.user u
      LEFT JOIN sec.role r ON r.id = u.role_id
      LEFT JOIN sec.role_policy rp ON rp.role_id = r.id
      LEFT JOIN sec.policy p ON rp.policy_id = p.id
      LEFT JOIN dbo.roletype rt ON rt.id = r.roletype_id
      WHERE u.username = _username;
  END;
$$;

CREATE OR REPLACE PROCEDURE sec.my_procedure(value VARCHAR)
LANGUAGE plpgsql
AS
$$
DECLARE

BEGIN
    --
    UPDATE sec."user"
    SET email = value
    WHERE id = '11';

    COMMIT;
END;
$$


CALL sec.my_procedure('gdo');
SELECT * FROM sec.fn_loginuser('gdo');
SELECT sec.fn_signupuser('giangd@gmail.com', 'gdo111', 'asdf', 'asdf', '2');