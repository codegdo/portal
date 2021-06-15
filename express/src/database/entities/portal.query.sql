SELECT role.name, role.roletype_id, p.data FROM sec.role
JOIN role_policy rp ON role.id = rp.role_id
JOIN policy p ON rp.policy_id = p.id;

SELECT * FROM sec.user u
LEFT JOIN sec.role r ON r.id = u.role_id
LEFT JOIN dbo.roletype rt ON rt.id = r.roletype_id
WHERE u.username = 'gdo';

SELECT m.id, m.name, SUM(price) FROM dbo.module m
LEFT JOIN feature_module fm on m.id = fm.module_id
LEFT JOIN feature f on fm.feature_id = f.id
WHERE price NOTNULL
GROUP BY m.id, m.name, price ;

WITH subq AS(
  SELECT m.id, m.name, price FROM dbo.module m
  LEFT JOIN feature_module fm on m.id = fm.module_id
  LEFT JOIN feature f on fm.feature_id = f.id
  WHERE price NOTNULL
)
SELECT id, name, SUM(price) FROM subq
GROUP BY id, name, price;

-- Get Modules with Subscription
SELECT * FROM dbo.module m
LEFT JOIN subscription s on m.id = s.module_id
WHERE s.org_id = 31 AND CURRENT_TIMESTAMP < s.end_date
OR m.is_subscription = false AND m.is_external = true
ORDER BY m.sort_order ASC;
-- Get Modules with Page
SELECT m.id, m.name, p.name, org_id FROM dbo.module m
LEFT JOIN module_page mp on m.id = mp.module_id
LEFT JOIN page p on mp.page_id = p.id
WHERE org_id IS NULL;
-- Get Modules with Subscription and Page
SELECT m.id, m.name AS module, p.name AS page, p.parent_id, mp.org_id, p.sort_order FROM dbo.module m
LEFT JOIN module_page mp on m.id = mp.module_id
LEFT JOIN page p on mp.page_id = p.id
LEFT JOIN subscription s on m.id = s.module_id
WHERE s.org_id = 32 AND CURRENT_TIMESTAMP < s.end_date
OR m.is_subscription = false AND m.is_internal = true
ORDER BY m.sort_order ASC;