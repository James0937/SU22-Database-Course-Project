# Team-023 CDGW ER Diagram

## Entity-Relationship Diagram
![image](https://user-images.githubusercontent.com/73111353/177441653-bd9107b9-45e1-4012-9b1b-6051beb3cdd1.png)

## Assumptions:

### Home

Home contains the descriptions of each Airbnb house that is avaliable for renting. It is the primary table used in this project.

### Host

Host contains the login information of the host. Each home must belong to only one host and a host can have multiple homes.

### Neighborhood

Neighborhood contains the name of the neighborhood (such as Loop or Hyde Park) and the safety rating of the district. The relation is here to find the safety rating of an entity in Home.
Each home must belongs to one neighborhood, and each neighborhood can have multiple homes.

### Room Type

This entity contains the description of each room type, such as apartment or villa. Each home has one type, and each type can contain multiple homes.

### Tenant

Tenant contains the id and name of the customer who rent homes. Each tenant can rent multiple homes and each home can be rented by multiple tenants. The relation contains additional "date" attribute to record
the start date of the lease.

### Price Range

This entity works as a table of reference for the range of the price (per night). We plan to use JOIN ON BETWEEN to create a price range tag for each home to provide better searchability.

### Surrounding Information

This entity contains additional information about each district, such as avaliable restaurants or hospitals in the district.

## Relational Schema:
Home (

home_id: INT [PK],

host_id: INT [FK to Host.host_id],

neighborhood: VARCHAR(255) [FK to Neighborhood.neighborhood],

room_type: VARCHAR(255) [FK to RoomType.type_id],

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

neighborhood: VARCHAR(255) [PK],

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