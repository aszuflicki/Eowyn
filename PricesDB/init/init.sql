CREATE DATABASE prices;
CREATE USER pricessService WITH ENCRYPTED PASSWORD 'pricessService';
GRANT ALL PRIVILEGES ON DATABASE prices TO pricessService;

CREATE TABLE btc(
  _time TIMESTAMP NOT NULL,
  price DOUBLE PRECISION
);

SELECT create_hypertable('btc', '_time', if_not_exists => TRUE);