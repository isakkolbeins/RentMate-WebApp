-- Create the rentapp_database database
CREATE DATABASE rentapp_database;

-- Connect to the rentapp_database database
\c rentapp_database;

-- Create the tenants table
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    profile_photo_path VARCHAR(255), 
    location VARCHAR(100) NOT NULL,
    min_price NUMERIC NOT NULL,
    max_price NUMERIC NOT NULL,
    availability_from DATE NOT NULL,
    availability_till DATE NOT NULL
);

-- Create the landlords table
CREATE TABLE landlords (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    property_description VARCHAR(100) NOT NULL,
    property_location VARCHAR(100) NOT NULL,
    rent_amount NUMERIC NOT NULL,
    availability_from DATE NOT NULL,
    availability_till DATE NOT NULL,
    accommodation_photos_path VARCHAR(255)[] 
);

