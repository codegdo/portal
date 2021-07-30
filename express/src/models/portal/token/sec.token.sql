CREATE TABLE IF NOT EXISTS sec.token (
    id TEXT NOT NULL,
    json TEXT,
    expired_at BIGINT,
    --
    PRIMARY KEY(id)
);