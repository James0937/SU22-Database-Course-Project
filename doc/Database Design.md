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

## Advanced Queries

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

Advanced Query 1:
![image](https://user-images.githubusercontent.com/73111353/178798834-22a0c18e-6686-4a29-9dd3-107d3160c581.png)
![image](https://user-images.githubusercontent.com/73111353/178798812-c4dc1409-827d-472e-bff1-af386674a846.png)

Advanced Query 2:
![image](https://user-images.githubusercontent.com/73111353/178798685-a0d1508a-cfe9-4051-ac1c-fb1f7798cd6c.png)

### 2. Performance After Indexing

#### 2.1 Neighborhood
Index:

![image](https://user-images.githubusercontent.com/73111353/178799426-9053c6fd-07ba-4de0-a268-4c5ec9b62616.png)

Advanced Query 1:

![image](https://user-images.githubusercontent.com/73111353/178799366-18d31aba-b2c5-440e-9395-1b8bb2ffd441.png)

Advanced Query 2:

![image](https://user-images.githubusercontent.com/73111353/178799519-a83c11e8-d676-4a3c-93e5-fd62b010b81c.png)

Report:

We create this index to help reduce the time cost for all queries. After creating index idx_neighborhood, the time cost in query1 remains the same, but it in query2 reduces 0.01s.
Firstly, for the first one, it indexes on a GROUP BY attribute, which means that SQL will scan the whole table without using this index, therefore it cannot reduce the cost. For the second query, the "Neighborhood" table is used during the joining part. A separate index of the used table for joining procedure could reduce the query cost slightly(from 0.03s to 0.02s).

#### 2.2 Safety Score

Index:

![image](https://user-images.githubusercontent.com/73111353/178823867-e8ca92fb-5d0a-4d6a-8b11-5b92e5b81e87.png)

Advanced Query 1:

![image](https://user-images.githubusercontent.com/73111353/178824021-737cfc22-c316-4feb-8b26-b8659ca53b82.png)

Advanced Query 2:

![image](https://user-images.githubusercontent.com/73111353/178824111-e15a583f-5f92-42c8-9d3a-1ec2157dd4db.png)

Report:

We create this index to help reduce the time cost for the second query. After creating index idx_ss for safety score, the time cost in query1 still remains the same, but it in query2 reduces 0.02s.
For the first one, since it does not JOIN with the Neighborhood table, so idx_ss will not affect the performance. For the second query, the "Neighborhood" table is used during the joining part and safety score is used during the ORDER BY part. The index can help reduce the time used here(sort actual time drop from 24.625 to 14.468 and total time drop from 0.03s to 0.01s).

#### 2.3 Price Range: Upper Bound

Index:

![image](https://user-images.githubusercontent.com/73111353/178827098-ca56d92b-a392-4262-9e24-698ea15e7292.png)

Advanced Query 1:

![image](https://user-images.githubusercontent.com/73111353/178827146-d56b700c-b218-4a91-bd52-4165f363a3d4.png)

Advanced Query 2:

![image](https://user-images.githubusercontent.com/73111353/178827850-ccbec002-e85c-4bd2-a75a-4e20d0d26ba2.png)

Report:

We create this index to help reduce the time cost for the first query. After creating index idx_p_u for the upper bound of the PriceRange table, the time cost in query1 increases significantly to 0.10s, but in query 2 it does not change much.
For the first one, by default it is using the primary key of PriceRange table for sorting, so adding this redundant index will reduce the sort performance(from 22.23 to 96.32). Since the PriceRange table is relatively small and we cannot reduce the cardinality of indexes, we cannot save the cost whiile joining the table. So indexing is not always beneficial. For the second query, it does not use the PriceRange table, so the time change is probably random.
