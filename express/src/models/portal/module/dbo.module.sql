CREATE TABLE IF NOT EXISTS dbo.module (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  sort_group INTEGER DEFAULT 0,
  is_external BOOLEAN DEFAULT FALSE,
  is_internal BOOLEAN DEFAULT FALSE,
  is_subscription BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(6),
  --
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS dbo.module_page (
    module_id INT NOT NULL,
    page_id INT NOT NULL,
    org_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --
    PRIMARY KEY(module_id, page_id),
    FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE CASCADE,
    FOREIGN KEY(page_id) REFERENCES dbo.page(id) ON DELETE CASCADE
);

CREATE INDEX idx_module_page ON dbo.module_page(module_id, page_id);