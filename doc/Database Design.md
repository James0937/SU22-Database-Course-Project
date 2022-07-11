# Database Design

## Home:
```
CREATE TABLE "Airbnb"
(
    "id" int,
    "name" varchar(300),
    "host_id" int,
    "host_name" varchar(300),
    "neighbourhood_group" varchar(300),
    "neighbourhood" varchar(300),
    "latitude" real,
    "longitude" real,
    "room_type" varchar(300),
    "price" real,
    "minimum_nights" int,
    "number_of_reviews" int,
    "last_review" date,
    "reviews_per_month" real,
    "calculated_host_listings_count" int,
    "availability_365" int
);
```
![2cf483fce0229cedf96e92b8ad44faf](https://user-images.githubusercontent.com/73111353/178375546-8b519b5e-86df-4937-9064-a1a5b731fab4.png)
