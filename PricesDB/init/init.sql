CREATE DATABASE prices;
CREATE USER priceservice WITH ENCRYPTED PASSWORD 'priceservice123';
GRANT ALL PRIVILEGES ON DATABASE prices TO priceservice;


\connect prices;

CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

CREATE TABLE IF NOT EXISTS "btcs" (
  _time TIMESTAMP WITH TIME ZONE NOT NULL, 
  price DOUBLE PRECISION,
  PRIMARY KEY (_time)
  );

GRANT ALL PRIVILEGES ON TABLE btcs TO priceservice;

SELECT create_hypertable('"btcs"', '_time');

insert into btcs (_time, price) values ('2018-11-18 12:35:06', 12);

-- select * from btc;


