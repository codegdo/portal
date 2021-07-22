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
('1', '11', null),
('2', '11', null),
('3', '11', null),
('4', '11', null),
('5', '11', null),
('6', '11', null),
('7', '11', null),
('8', '11', null),
('9', '11', null),
('10', '11', null),
('1', '12', null),
('2', '12', null),
('3', '12', null),
('4', '12', null),
('5', '12', null),
('6', '12', null),
('7', '12', null),
('8', '12', null),
('9', '12', null),
('10', '12', null),
('2', '13', null),
('5', '13', null),
('6', '13', null),
('7', '13', null),
('8', '13', null),
('9', '13', null),
('10', '13', null);

INSERT
INTO dbo.module(id, name, sort_order, sort_group, is_external, is_internal, is_subscription, is_active)
VALUES
('1', 'System', '0', '0', '0', '0', '0', '1'),
('2', 'Admin', '1', '1', '0', '1', '0', '1'),
('3', 'Account', '2', '2', '1', '1', '0', '1'),
('4', 'Help', '3', '3', '1', '1', '0', '1'),
('5', 'Resources', '4', '4', '1', '1', '0', '1'),
('11', 'Sales', '11', '11', '1', '1', '1', '1'),
('12', 'Marketing', '12', '11', '1', '1', '1', '1'),
('13', 'Rewards', '13', '11', '1', '1', '1', '1');

INSERT
INTO dbo.module_page(module_id, page_id, org_id)
VALUES
--Admin
('2', '200', null),
('2', '201', null),
('2', '202', null),
('2', '203', null),
('2', '204', null),
('2', '205', null),
('2', '206', null),
('2', '207', null),
('2', '208', null),
('2', '209', null),
('2', '210', null),
('2', '211', null),
('2', '212', null),
('2', '213', null),
('2', '214', null),
('2', '215', null),
--Account
('3', '300', null),
('3', '301', null),
--Help
('4', '400', null),
('4', '401', null),
--Sales
('11', '1100', null),
('11', '1101', null),
--Marketing
('12', '1200', null),
('12', '1201', null),
('12', '1202', null),
('12', '1203', null),
('12', '1204', null),
--Rewards
('13', '1300', null),
('13', '1301', null);

INSERT
INTO dbo.page(id, name, type, parent_id, sort_order, is_external, is_internal, is_active)
VALUES
--Admin
('200', 'Users', 'view', null, '0', '1', '1', '1'),
('201', 'Internals', 'view', '200', '1', '1', '1', '1'),
('202', 'Externals', 'view', '200', '2', '1', '1', '1'),
('203', 'Roles', 'view', null, '3', '1', '1', '1'),
('204', 'Groups', 'view', null, '4', '1', '1', '1'),
('205', 'Languages', 'view', null, '5', '1', '1', '1'),
('206', 'Companies', 'view', null, '6', '1', '1', '1'),
('207', 'Contacts', 'view', null, '7', '1', '1', '1'),
('208', 'Products', 'view', null, '8', '1', '1', '1'),
('209', 'Prices', 'view', null, '9', '1', '1', '1'),
('210', 'Forms', 'view', null, '10', '1', '1', '1'),
('211', 'Templates', 'view', null, '11', '1', '1', '1'),
('212', 'Programs', 'view', null, '12', '1', '1', '1'),
('213', 'Sales', 'view', '212', '13', '1', '1', '1'),
('214', 'Marketing', 'view', '212', '14', '1', '1', '1'),
('215', 'Rewards', 'view', '212', '15', '1', '1', '1'),
--Account
('300', 'Profile', 'form', null, '0', '1', '1', '1'),
('301', 'Subscription', 'form', null, '1', '1', '1', '1'),
--Help
('400', 'Supports', 'view', null, '0', '1', '1', '1'),
('401', 'Guides', 'view', null, '1', '1', '1', '1'),
--Sales
('1100', 'Dashboard', 'view', null, '0', '1', '1', '1'),
('1101', 'Registrations', 'view', null, '1', '1', '1', '1'),
--Marketing
('1200', 'Dashboard', 'view', null, '0', '1', '1', '1'),
('1201', 'Requests', 'view', null, '1', '1', '1', '1'),
('1202', 'Claims', 'view', null, '2', '1', '1', '1'),
('1203', 'Accruals', 'view', null, '3', '1', '1', '1'),
('1204', 'Reports', 'view', null, '4', '1', '1', '1'),
--Rewards
('1300', 'Dashboard', 'view', null, '0', '1', '1', '1'),
('1301', 'Claims', 'view', null, '1', '1', '1', '1');

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
