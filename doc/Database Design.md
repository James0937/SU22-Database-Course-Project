# Database Design

## Connection:
On GCC:

![image](https://user-images.githubusercontent.com/73111353/178641741-354dad77-f9c1-4329-b5b5-592478090a06.png)

On MySQL Workbench:

![image](https://user-images.githubusercontent.com/73111353/178641334-f82b763b-dade-4f29-a6ca-7e88e0ef1b86.png)


## Tables:
```
CREATE TABLE Home
(
    home_id INT,
    host_id INT,
    neighborhood VARCHAR(255),
    type_id INT,
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
### Home:
```
CREATE TABLE Home
(
    home_id INT,
    host_id INT,
    neighborhood VARCHAR(255),
    type_id INT,
    name VARCHAR(255),
    latitude REAL,
    longtitude REAL,
    price REAL,
    minimum_nights INT,
    availability_365 INT
);
```
![image](https://user-images.githubusercontent.com/73111353/178646394-905f0b7b-bba1-4814-98be-101bcf776712.png)
![image](https://user-images.githubusercontent.com/73111353/178646444-4d32a78e-0802-4dea-9c8b-9a28f657bc4b.png)



### Host
```
CREATE TABLE Host
(
    host_id INT,
    host_name VARCHAR(50)
);
```
![image](https://user-images.githubusercontent.com/73111353/178641524-85668384-18c9-402c-929d-6d12d19983b1.png)
![image](https://user-images.githubusercontent.com/73111353/178641285-6f7f61aa-fd9f-45d8-8782-5a7b42d40ad3.png)

### Tenant
```
CREATE TABLE Tenant (
    user_id INT,
    user_name VARCHAR(50)
);
```
![image](https://user-images.githubusercontent.com/73111353/178647668-d9355d9d-a23c-447b-9bf9-4c583dd7ecc8.png)
![image](https://user-images.githubusercontent.com/73111353/178647736-68fed5cf-64b4-464a-acd8-289ea7e6377e.png)

### Neighborhood
```
CREATE TABLE Neighborhood (
    neighborhood VARCHAR(255),
    safety_score INT
);
```
![image](https://user-images.githubusercontent.com/107632673/178653567-81804f3e-1f3b-4f38-b4a0-041d516a5d71.png)
![image](https://user-images.githubusercontent.com/107632673/178653837-c98a1b6a-d268-4e7d-a387-f870f1766cb0.png)

## Advanced Querries

### 1. Price Range Distribution In Neighborhoods
```
USE Airbnb;
SELECT neighborhood, range_name as price_range, COUNT(home_id) as total_homes
FROM Home NATURAL JOIN Host NATURAL JOIN RoomType JOIN PriceRange pr ON (price >= pr.lower_bound AND price < pr.upper_bound)
GROUP BY neighborhood, price_range
ORDER BY neighborhood;
```
![image](https://user-images.githubusercontent.com/73111353/178781526-a621a218-b312-46ea-9952-d73664da9112.png)

### 2. Total Homes In Neighborhoods With Low Price Per Night
```
USE Airbnb;
SELECT neighborhood, safety_score, COUNT(home_id) as total_low_price_homes
FROM (SELECT * FROM Home WHERE Price < 225) as LowPriceHomes NATURAL JOIN Host NATURAL JOIN RoomType NATURAL JOIN Neighborhood
GROUP BY neighborhood, safety_score 
ORDER BY safety_score DESC, total_low_price_homes DESC;
```
![image](https://user-images.githubusercontent.com/73111353/178783151-0eb38a30-dbe2-47f3-b46c-662708aed175.png)



