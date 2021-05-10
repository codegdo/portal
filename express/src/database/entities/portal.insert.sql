-- dbo
INSERT INTO
  dbo.module(
    id,
    name,
    sort_order,
    is_external,
    is_internal,
    is_subscription,
    is_active
  )
VALUES
  ('0', 'System', '0', '0', '0', '0', '1'),
  ('1', 'Home', '0', '1', '1', '0', '1'),
  ('2', 'Sales', '1', '1', '1', '1', '1'),
  ('3', 'Marketing', '2', '1', '1', '1', '1'),
  ('4', 'Rewards', '3', '1', '1', '1', '1'),
  ('5', 'Account', '4', '1', '1', '0', '1'),
  ('6', 'Admin', '5', '0', '1', '0', '1');

INSERT INTO
  dbo.roletype(id, name)
VALUES
  ('0', 'system'),
  ('1', 'internal'),
  ('2', 'external');

-- org
INSERT INTO
  org.template(
    id,
    name,
    type,
    html,
    style,
    data,
    org_id,
    is_active
  )
VALUES
  (
    '1',
    'main',
    'internal',
    '<div>Internal {{content}}</div>',
    null,
    null,
    null,
    '1'
  ),
  (
    '2',
    'main',
    'external',
    '<div>External {{content}}</div>',
    null,
    null,
    null,
    '1'
  ),
  (
    '3',
    'main',
    'general',
    '<div>General {{content}}</div>',
    null,
    null,
    null,
    '1'
  );

-- sec
INSERT INTO
  sec.role(
    id,
    name,
    description,
    is_owner,
    org_id,
    roletype_id
  )
VALUES
  ('0', 'System User', null, '0', null, '0'),
  ('1', 'Owner User', null, '1', null, '1');

INSERT INTO
  sec.policy(id, name, description, data, is_active, org_id)
VALUES
  ('0', 'System', null, '', '1', null),
  ('1', 'Owner', null, '', '1', null),
  ('2', 'Admin', null, '', '1', null),
  ('3', 'User', null, '', '1', null);

INSERT INTO
  sec.role_policy(role_id, policy_id)
VALUES
  ('0', '0'),
  ('1', '1');