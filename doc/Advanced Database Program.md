## Stored Procedure:
```
CREATE DEFINER=`root`@`%` PROCEDURE `DistrictResearch`(IN IN_Neighborhood VARCHAR(255))
BEGIN
	DECLARE currHomeID INT;
    DECLARE currHostID INT;
	DECLARE currName VARCHAR(255);
	DECLARE currPrice REAL;
	DECLARE currNights INT;
	DECLARE currDays INT;
	DECLARE currRange VARCHAR(20);

	DECLARE exit_loop BOOLEAN DEFAULT FALSE;

	DECLARE cur CURSOR FOR
	(SELECT home_id, host_id, name, price, minimum_nights, availability_365
	FROM Neighborhood NATURAL JOIN (SELECT * FROM Home WHERE host_id != 0) AS User_Home
	WHERE neighborhood = IN_Neighborhood);
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;

	DROP TABLE IF EXISTS DistrictTable;

	CREATE TABLE DistrictTable(
	varHomeID INT PRIMARY KEY,
    varHostID INT,
	varHomeName VARCHAR(255),
	varPrice INT,
	varNights INT,
	varDays INT,
	varRangeName VARCHAR(20)
	);

	OPEN cur;

	loop1: LOOP
		FETCH cur INTO currHomeID, currHostID, currName, currPrice, currNights, currDays;
		IF exit_loop THEN
			LEAVE loop1;
		END IF;

		IF (currPrice <= 75) THEN
			SET currRange = "Low Price(0-75)";
		ELSEIF (currPrice <= 150) THEN
			SET currRange = "'Low Price(75-150)'";
		ELSEIF (currPrice <= 225) THEN
			SET currRange = "Low Price(150-225)";
		ELSEIF (currPrice <= 300) THEN
			SET currRange = "High Price(225-300)";
		ELSE
			SET currRange = "High Price(300+)";
		END IF;
		INSERT INTO DistrictTable VALUES (currHomeID, currHostID, currName, currPrice, currNights, currDays, currRange);
	END LOOP loop1;

	CLOSE cur;

	(SELECT *
	FROM DistrictTable JOIN Host ON (varHostID = host_id)
    WHERE varPrice = (SELECT MAX(varPrice) FROM DistrictTable)
	LIMIT 1)
    UNION
    (SELECT *
	FROM DistrictTable JOIN Host ON (varHostID = host_id)
    WHERE varPrice = (SELECT MIN(varPrice) FROM DistrictTable)
	LIMIT 1);
END
```
## Trigger (before INSERT and UPDATE):
```
CREATE DEFINER=`root`@`%` TRIGGER `Home_BEFORE_INSERT` BEFORE INSERT ON `Home` FOR EACH ROW BEGIN
	IF (NEW.latitude < 41.64 OR NEW.latitude > 42.05 OR NEW.longtitude > -87.51 OR NEW.longtitude < -88.03) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Latitude and longtitude must be within Chicago!';
	END IF;
END
```

```
CREATE DEFINER=`root`@`%` TRIGGER `Home_BEFORE_UPDATE` BEFORE UPDATE ON `Home` FOR EACH ROW BEGIN
	IF (NEW.latitude < 41.64 OR NEW.latitude > 42.05 OR NEW.longtitude > -87.51 OR NEW.longtitude < -88.03) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Latitude and longtitude must be within Chicago!';
	END IF;
END
```
