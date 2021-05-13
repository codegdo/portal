create or replace function sec.sec_fn_login_user(p_username varchar)
  returns TABLE (
    email varchar,
    username varchar,
    password varchar,
    salt varchar,
    roletype roletype_enum,
    "orgId" int,
    policy text,
    "isOwner" boolean,
    "isActive" boolean
  )
  language plpgsql
as 
$$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        "user".email,
        "user".username,
        "user".password,
        "user".salt,
        "roletype".name,
        "user".org_id,
        "policy".data,
        "role".is_owner,
        "user".is_active
      FROM sec.user "user"
      LEFT JOIN sec.role "role" ON "role".id = "user".role_id
      LEFT JOIN sec.role_policy "role_policy" ON "role_policy".role_id = "role".id
      LEFT JOIN sec.policy "policy" ON "role_policy".policy_id = "policy".id
      LEFT JOIN dbo.roletype "roletype" ON "roletype".id = "role".roletype_id
      WHERE "user".username =  p_username;
  END;
$$;