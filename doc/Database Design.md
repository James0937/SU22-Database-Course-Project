# Database Design

## Tables:
```
CREATE TABLE Homes
(
    home_id INT,
    host_id INT,
    neighborhood VARCHAR(255),
    room_type INT,
    name VARCHAR(255),
    latitude REAL,
    longtitude REAL,
    price REAL,
    minimum_nights INT,
    availability_365 INT
);

CREATE TABLE Host
(
    host_id INT,
    host_name VARCHAR(50)
);

CREATE TABLE Rent
(
    home_id INT,
    user_id INT,
    date DATE
);

CREATE TABLE Neighborhood (
    neighborhood VARCHAR(255),
    safety_score INT
);

CREATE TABLE RoomType (
    type_id INT,
    type_name VARCHAR(255)
);

CREATE TABLE Tenant (
    user_id INT,
    user_name VARCHAR(50)
);

CREATE TABLE PriceRange
(
    range_name VARCHAR(20),
    upper_bound INT,
    lower_bound INT
);

CREATE TABLE SurroundingInformation
(
    neighborhood VARCHAR(255),
    restaurant VARCHAR(255),
    entertainment VARCHAR(255),
    others VARCHAR(255)
);
```
![2cf483fce0229cedf96e92b8ad44faf](https://user-images.githubusercontent.com/73111353/178375546-8b519b5e-86df-4937-9064-a1a5b731fab4.png)
