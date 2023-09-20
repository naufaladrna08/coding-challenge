-- Using: PostgreSQL

-- Create cars table
create table public.cars (
  car_id     serial           not null constraint cars_pk primary key, -- auto increment
  car_name   varchar(50)      not null,
  day_rate   double precision not null,
  month_rate double precision not null,
  image      varchar(255)
);

-- Create orders table
create table public.orders (
  order_id         serial not null constraint orders_pk primary key, -- auto increment
  car_id           integer not null,
  order_date       date,
  pickup_date      date,
  dropoff_date     date,
  pickup_location  varchar(255),
  dropoff_location varchar(255)
);

