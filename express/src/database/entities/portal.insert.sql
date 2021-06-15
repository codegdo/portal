-- dbo
INSERT
INTO dbo.feature (id, name, price)
VALUES
('1', 'Analytics', '100'),
('2', 'Automated Calculation', '100'),
('3', 'Audit Trail', '100'),
('4', 'Approval Hierarchy', '100'),
('5', 'Customize Programs', '100'),
('6', 'Customize Forms', '100'),
('7', 'Customize Reports', '100'),
('8', 'Customize Rules', '100'),
('9', 'Notifications', '100'),
('10', 'Integration', '100');

INSERT
INTO dbo.feature_module(feature_id, module_id, org_id)
VALUES
('1', '4', null),
('2', '4', null),
('3', '4', null),
('4', '4', null),
('5', '4', null),
('6', '4', null),
('7', '4', null),
('8', '4', null),
('9', '4', null),
('10', '4', null),
('1', '5', null),
('2', '5', null),
('3', '5', null),
('4', '5', null),
('5', '5', null),
('6', '5', null),
('7', '5', null),
('8', '5', null),
('9', '5', null),
('10', '5', null),
('2', '6', null),
('5', '6', null),
('6', '6', null),
('7', '6', null),
('8', '6', null),
('9', '6', null),
('10', '6', null);

INSERT
INTO dbo.module(id, name, sort_order, sort_group, is_external, is_internal, is_subscription, is_active)
VALUES
('0', 'System', '0', '0', '0', '0', '0', '1'),
('1', 'Admin', '6', '0', '0', '1', '0', '1'),
('2', 'Home', '0', '0', '1', '1', '0', '1'),
('3', 'Account', '4', '0', '1', '1', '0', '1'),
('4', 'Help', '5', '0', '1', '1', '0', '1'),
('5', 'Sales', '1', '0', '1', '1', '1', '1'),
('6', 'Marketing', '2', '0', '1', '1', '1', '1'),
('7', 'Rewards', '3', '0', '1', '1', '1', '1');

INSERT
INTO dbo.page(id, name, type, parent_id, sort_order, is_external, is_internal, is_active)
VALUES
--Home
('20', 'Dashboard', 'view', null, '0', '1', '1', '1'),
--Account
('30', 'Profile', 'form', null, '0', '1', '1', '1'),
('31', 'Subscription', 'form', null, '1', '1', '1', '1'),
--Help
('40', 'Supports', 'view', null, '0', '1', '1', '1'),
('41', 'Guides', 'view', null, '1', '1', '1', '1'),
--Sales
('50', 'Summary', 'view', null, '0', '1', '1', '1'),
('52', 'Deals', 'view', null, '1', '1', '1', '1'),
--Marketing
('60', 'Summary', 'view', null, '0', '1', '1', '1'),
('61', 'Requests', 'view', null, '1', '1', '1', '1'),
('62', 'Claims', 'view', null, '2', '1', '1', '1'),
('63', 'Accruals', 'view', null, '3', '1', '1', '1'),
('64', 'Reports', 'view', null, '4', '1', '1', '1'),
--Rewards
('70', 'Summary', 'view', null, '0', '1', '1', '1'),
('71', 'Claims', 'view', null, '1', '1', '1', '1'),
--Admin
('100', 'Users', 'view', null, '0', '1', '1', '1'),
('101', 'Internals', 'view', '12', '1', '1', '1', '1'),
('102', 'Externals', 'view', '12', '2', '1', '1', '1'),
('103', 'Roles', 'view', null, '3', '1', '1', '1'),
('104', 'Groups', 'view', null, '4', '1', '1', '1'),
('105', 'Languages', 'view', null, '5', '1', '1', '1'),
('106', 'Companies', 'view', null, '6', '1', '1', '1'),
('107', 'Contacts', 'view', null, '7', '1', '1', '1'),
('108', 'Products', 'view', null, '8', '1', '1', '1'),
('109', 'Prices', 'view', null, '9', '1', '1', '1'),
('110', 'Forms', 'view', null, '10', '1', '1', '1'),
('111', 'Templates', 'view', null, '11', '1', '1', '1'),
('112', 'Programs', 'view', null, '12', '1', '1', '1'),
('113', 'Sales', 'view', '24', '13', '1', '1', '1'),
('114', 'Marketing', 'view', '24', '14', '1', '1', '1'),
('115', 'Rewards', 'view', '24', '15', '1', '1', '1');

INSERT
INTO dbo.roletype(name)
VALUES
('system'),
('internal'),
('external');

INSERT
INTO dbo.emailtype(id, name, module_id)
VALUES
('1', 'User Signup', '0'),
('2', 'Partner Register', '0');

INSERT
INTO dbo.roletype(id, name)
VALUES
('1', 'system'),
('2', 'internal'),
('3', 'external');

INSERT
INTO dbo.plan(id, name, duration)
VALUES
('1', 'annual', '360'),
('2', 'trial', '30');

-- org
INSERT
INTO org.email(name)
VALUES ('verify');

INSERT
INTO org.template(name, type, html, style, json, org_id, is_active)
VALUES
('main', 'internal', '<div>Internal {{content}}</div>', null, null, null, '1'),
('main', 'external', '<div>External {{content}}</div>', null, null, null, '1'),
('main', 'general', '<div class="general"> <aside class="general-aside"> <div class="container"> <header> PartnerPortal <h1>An Interactive Channel Platform</h1> </header> <main></main> </div> </aside> <main class="general-main"> <div class="container"> <Content {...props}/> <div class="terms hidden"><small>Creating an account means you’re okay with our <a href="#">Terms</a>.</small></div> </div> </main> </div>', null, null, null, '1');

INSERT
INTO org.subscription(name, description, json, is_active, org_id, roletype_id)
VALUES
('System', null, null, '1', null, '1'),
('Owner', null, null, '1', null, '2');

-- sec
INSERT
INTO sec.role(name, description, is_owner, org_id, roletype_id)
VALUES
('System User', null, '0', null, '1'),
('Owner User', null, '1', null, '2');

INSERT
INTO sec.policy(name, description, json, is_active, org_id, roletype_id)
VALUES
('System', null, null, '1', null, '1'),
('Owner', null, null, '1', null, '2');

INSERT
INTO sec.role_policy(role_id, policy_id)
VALUES
('1', '1'),
('2', '2');
