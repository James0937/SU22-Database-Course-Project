# Database Design

## Connection:
On GCC:
![image](https://user-images.githubusercontent.com/73111353/178641741-354dad77-f9c1-4329-b5b5-592478090a06.png)

On MySQL Workbench:
![image](https://user-images.githubusercontent.com/73111353/178641334-f82b763b-dade-4f29-a6ca-7e88e0ef1b86.png)


## Tables:
```
CREATE TABLE Homes
(
    home_id INT,
    host_id INT,
    neighborhood VARCHAR(255),
    room_id INT,
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

