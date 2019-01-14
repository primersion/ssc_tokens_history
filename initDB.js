require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDB() {
  const query = `
  -- Table: transactions

  CREATE TABLE IF NOT EXISTS transactions
  (
      txid text COLLATE pg_catalog."default" NOT NULL,
      "timestamp" timestamp without time zone NOT NULL,
      symbol text COLLATE pg_catalog."default" NOT NULL,
      "from" text COLLATE pg_catalog."default" NOT NULL,
      "from_type" text COLLATE pg_catalog."default" NOT NULL,
      "to" text COLLATE pg_catalog."default" NOT NULL,
      "to_type" text COLLATE pg_catalog."default" NOT NULL,
      quantity numeric,
      CONSTRAINT transactions_pkey PRIMARY KEY (txid)
  )
  WITH (
      OIDS = FALSE
  );

  -- Index: idx_transactions_timestamp

  CREATE INDEX IF NOT EXISTS idx_transactions_timestamp
      ON transactions USING btree
      ("timestamp");`;

  await pool.query(query);

  pool.end();
}

initDB();
