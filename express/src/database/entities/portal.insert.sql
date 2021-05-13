-- dbo
INSERT
INTO dbo.module(name, sort_order, is_external, is_internal, is_subscription, is_active)
VALUES
('System', '0', '0', '0', '0', '1'),
('Home', '0', '1', '1', '0', '1'),
('Sales', '1', '1', '1', '1', '1'),
('Marketing', '2', '1', '1', '1', '1'),
('Rewards', '3', '1', '1', '1', '1'),
('Account', '4', '1', '1', '0', '1'),
('Admin', '5', '0', '1', '0', '1');

INSERT
INTO dbo.roletype(name)
VALUES
('system'),
('internal'),
('external');

-- org
INSERT
INTO org.template(name, type, html, style, data, org_id, is_active)
VALUES
('main', 'internal', '<div>Internal {{content}}</div>', null, null, null, '1'),
('main', 'external', '<div>External {{content}}</div>', null, null, null, '1'),
('main', 'general', '<div>General {{content}}</div>', null, null, null, '1');

-- ROLE
INSERT
INTO dbo.roletype(name)
VALUES
('system'),
('internal'),
('external');

INSERT
INTO sec.role(name, description, is_owner, org_id, roletype_id)
VALUES
('System User', null, '0', null, '1'),
('Owner User', null, '1', null, '2');

INSERT
INTO sec.policy(name, description, data, is_active, org_id, roletype_id)
VALUES
('System', null, '', '1', null, '1'),
('Owner', null, '', '1', null, '2');

INSERT
INTO sec.role_policy(role_id, policy_id)
VALUES
('1', '1'),
('2', '2');
