create table IF NOT EXISTS products (
    id  integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    name varchar(50) NOT NULL,
    description text NOT NULL,
    stock integer NOT NULL,
    price decimal NOT NULL
);

create table IF NOT EXISTS users (
    email varchar(100) PRIMARY KEY NOT NULL check (email ~ '\A\S+@\S+\.\S+\Z'),
    password text,
    first_name varchar(50),
    last_name varchar(50),
    street_address varchar(150),
    city varchar(40),
    region varchar(40),
    postal_code integer,
    country varchar(40)
);

create table IF NOT EXISTS carts (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    users_email varchar(100) REFERENCES users(email) UNIQUE,
    modified date not null,
    created date not null,
    total decimal
);

create table if not exists carts_items (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    carts_id integer REFERENCES carts(id) NOT NULL,
    products_id integer REFERENCES products(id) NOT NULL,
    qty integer NOT NULL
);

create table IF NOT EXISTS orders (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    ordered date not null,
    shipped date,
    status varchar(50) not null,
    users_email varchar(100) REFERENCES users(email)
);

create table if not exists orders_items (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    created date NOT NULL,
    orders_id integer REFERENCES orders(id),
    products_id integer REFERENCES products(id),
    qty integer,
    price decimal
);