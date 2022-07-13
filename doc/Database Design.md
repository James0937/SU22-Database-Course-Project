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
    home_id INT PRIMARY KEY,
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
    host_id INT PRIMARY KEY,
    host_name VARCHAR(50)
);

CREATE TABLE Rent
(
    home_id INT PRIMARY KEY,
    user_id INT,
    date DATE
);

CREATE TABLE Neighborhood (
    neighborhood VARCHAR(255) PRIMARY KEY,
    safety_score INT
);

CREATE TABLE RoomType (
    type_id INT PRIMARY KEY,
    type_name VARCHAR(255)
);

CREATE TABLE Tenant (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(50)
);

CREATE TABLE PriceRange
(
    range_name VARCHAR(20) PRIMARY KEY,
    upper_bound INT,
    lower_bound INT
);

CREATE TABLE SurroundingInformation
(
    neighborhood VARCHAR(255) PRIMARY KEY,
    restaurant VARCHAR(255),
    entertainment VARCHAR(255),
    others VARCHAR(255)
);
```
### Home:
```
CREATE TABLE Home
(
    home_id INT PRIMARY KEY,
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
    host_id INT PRIMARY KEY,
    host_name VARCHAR(50)
);
```
![image](https://user-images.githubusercontent.com/73111353/178641524-85668384-18c9-402c-929d-6d12d19983b1.png)
![image](https://user-images.githubusercontent.com/73111353/178641285-6f7f61aa-fd9f-45d8-8782-5a7b42d40ad3.png)

### Tenant
```
CREATE TABLE Tenant (
    user_id INT PRIMARY KEY,
    user_name VARCHAR(50)
);
```
![image](https://user-images.githubusercontent.com/73111353/178647668-d9355d9d-a23c-447b-9bf9-4c583dd7ecc8.png)
![image](https://user-images.githubusercontent.com/73111353/178647736-68fed5cf-64b4-464a-acd8-289ea7e6377e.png)

### Neighborhood
```
CREATE TABLE Neighborhood (
    neighborhood VARCHAR(255) PRIMARY KEY,
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

### 2. Low Price Homes Ranked By Safety Score And Price
```
USE Airbnb;
SELECT home_id, price, neighborhood, safety_score
FROM (SELECT * FROM Home WHERE Price < 225) as LowPriceHomes NATURAL JOIN Neighborhood
ORDER BY safety_score DESC, price;
```
![image](https://user-images.githubusercontent.com/73111353/178784667-0eb78521-5f19-4bc6-b446-860547ec86cd.png)

## Indexing Analysis

### 1. Performance Before Indexing

Default Index:
![image](https://user-images.githubusercontent.com/73111353/178797645-41f940e5-a9fa-4c18-b25a-f27b411f47f3.png)

Advanced Querry 1:
![image](https://user-images.githubusercontent.com/73111353/178798834-22a0c18e-6686-4a29-9dd3-107d3160c581.png)
![image](https://user-images.githubusercontent.com/73111353/178798812-c4dc1409-827d-472e-bff1-af386674a846.png)
![image](https://user-images.githubusercontent.com/73111353/178802889-2276ebd3-5440-4ff6-b8f0-406902e3c65e.png)

Advanced Querry 2:
![image](https://user-images.githubusercontent.com/73111353/178798685-a0d1508a-cfe9-4051-ac1c-fb1f7798cd6c.png)
![image](https://user-images.githubusercontent.com/73111353/178802926-17b49b6b-b518-4df3-b5cf-36eb8834e688.png)


### 2. Performance After Indexing

#### 2.1 neighborhood
Index:
![image](https://user-images.githubusercontent.com/73111353/178799426-9053c6fd-07ba-4de0-a268-4c5ec9b62616.png)

Advanced Querry 1:
![image](https://user-images.githubusercontent.com/73111353/178799366-18d31aba-b2c5-440e-9395-1b8bb2ffd441.png)

Advanced Querry 2:
![image](https://user-images.githubusercontent.com/73111353/178799519-a83c11e8-d676-4a3c-93e5-fd62b010b81c.png)

Report:

#### 2.2 host_name

Index:
![image](https://user-images.githubusercontent.com/73111353/178803151-dcd44ae6-95fa-438c-8bd8-1283a0983d9b.png)

Advanced Querry 1:







