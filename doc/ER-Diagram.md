# Team-023 CDGW ER Diagram

## Entity-Relationship Diagram
![CDGW](https://user-images.githubusercontent.com/107632673/181871179-4441036b-9ce8-41c5-ba6a-ae324eb6dcb2.jpg)


## Assumptions:

### Home

Home contains the descriptions of each Airbnb house that is avaliable for renting. It is the primary table used in this project.

### Host

Host contains the login information of the host. Each home must belong to exactly one host and a host can have multiple homes.

### Neighborhood

Neighborhood contains the name of the neighborhood (such as Loop or Hyde Park) and the safety rating of the district. The relation is here to find the safety rating of an entity in Home.
Each home must belongs to exactly one neighborhood, and each neighborhood can have multiple homes.

### Room Type

This entity contains the description of each room type, such as apartment or villa. Each home has exactly one type, and each type can contain multiple homes.

### Tenant

Tenant contains the id and name of the customer who rent homes. Each tenant can rent multiple homes and each home can be rented by multiple tenants. The relation contains additional "date" attribute to record the start date of the lease.

### Price Range

This entity works as a table of reference for the range of the price (per night). We plan to use JOIN ON BETWEEN to create a price range tag for each home to provide better searchability.

### Surrounding Information

This entity contains additional information about each district, such as avaliable restaurants or hospitals in the district. We plan to JOIN it with the main table ON same neighborhood name to link these information. It should be noticed that we cannot ensure that there exists homes in every neighborhood. As a result, every attribute in surrounding information could corresponds to one or less neighborhood in the Neighborhood Table.

## Relational Schema:
```
Home (
home_id: INT [PK],
host_id: INT [FK to Host.host_id],
neighborhood: VARCHAR(255) [FK to Neighborhood.neighborhood],
room_type: INT [FK to RoomType.type_id],
name: VARCHAR(255),
latitude: REAL,
longtitude: REAL,
price: REAL,
minimum_nights: INT,
availability_365: INT
);

Host (
host_id: INT [PK],
host_name: VARCHAR(50)
);

Neighborhood (
neighborhood: VARCHAR(255) [PK] [FK to SurroundingInformation.neighborhood],
safety_score: INT
);

RoomType(
type_id: INT [PK],
type_name: VARCHAR(255)
);

Tenant (
user_id: INT [PK],
user_name: VARCHAR(50)
);

Rent (
home_id: INT [PK] [FK to Home.home_id],
user_id: INT [PK] [FK to Tenant.user_id],
date: DATE
);


SurroundingInformation(
neighborhood: VARCHAR(255) [PK],
restaurant: VARCHAR(255),
entertainment: VARCHAR(255),
others: VARCHAR(255)
);

PriceRange(
range_name: VARCHAR(20) [PK],
upper_bound: INT,
lower_bound: INT
);
```
