# CS411 Team023-CDGW Final Report

## 1. Please list out changes in your project directions if the final project is different from your original proposal (based on your stage 1 proposal submission).

We have approached the main goal of our project from another perspective. The original functionalities were to select the neighborhoods of Chicago first and show some listings in the neighborhood on the map. Instead, we changed that to a search box that can return the result as a list and could show the location of the results on the map. We kept the original neighborhood selection function to a filter condition. This change was to facilitate the users’ searching process so that they can search with names and filters. What’s more, we added some other features to manipulate the data set, like adding a house, editing a house, and deleting a house. These functions allow superusers to change the listings they want and update the dataset when necessary. The Overview window is another new feature we added. The tab shows a statistic about all the houses in Chicago. It completes the website’s functions.

## 2. Discuss what you think your application achieved or failed to achieve regarding its usefulness.

I think our application has succeeded to achieve its usefulness. The original function is more like an overall distribution of houses in Chicago, which may not be useful for the user to find a specific house. However, now we have incorporated this function into our “Overview” tab and we have added a new tab called “Search” which allows users to filter the search result with keywords, districts, price range, and safety scores. Moreover, we can display the house on a Google Map, which allows users to find useful locations nearby, such as hospitals, restaurants, and supermarkets. Therefore, I believe our application is useful for potential users.

## 3. Discuss if you changed the schema or source of the data for your application

We have not changed the source of our data. We modified the schema of the “Home” table to remove redundant information, such as the late review date. Since our application does not contain functions about commenting on a house, it should be removed.

## 4. Discuss what you change to your ER diagram and/or your table implementations. What are some differences between the original design and the final design? Why? What do you think is a more suitable design?

When working on Stage 2, we conceived 7 entities. They are “Home”, “Host”, “Room type”, “Tenant”, “Neighborhood”, “Surrounding Information”, and “Price Range”. Except for “Price Range”, all the entities are linked by relationships. “Home” is the major entity. The “Price Range” works as a table of reference for the price range, and we want to use “JOIN ON BETWEEN” to create the price range tags for houses.
However, in the final design, we only focused on 5 entities: Home, Host, Tenant, Price Range, and Neighborhood. The “Room type” and “Surrounding Information” tables were eliminated. Firstly, the room type is a bit useless for our application. We believe that our users are more concerned about the location, price, and security of the houses when they rent. Secondly, in the final design, we have implemented a function corresponding to the location of houses in the database to Google Maps. It means that our users could get the surrounding information without the extra table. As a result, the surrounding information table is redundant in our final web application. In my opinion, our final design is more suitable because it functions much quicker while implementing all the features based on the existing five tables.

## 5. Discuss what functionalities you added or removed. Why?

As discussed in topic 1, the function to select the neighborhoods of Chicago and show listings in the neighborhood on the map was removed. Instead, we replaced it with a search box and some checkboxes to help users to find the specific Airbnb house. We also added a map to display the search result by the coordinates we stored in the database. We decided that our application should be focused on serving the user instead of providing a simple overview of Chicago. After changing the functionalities, our application becomes more useful for renters because the original functions cannot support a detailed search in the database.

## 6. Explain how you think your advanced database programs complement your application.

Our choice of advanced database programs is a stored procedure and a trigger. The stored procedure takes in a district name and returns the house with the highest price and the lowest price in that district. It is useful since the traditional sort functions cannot allow users to quickly find the most expensive and cheapest house within one search. The trigger we have implemented restricts the user’s input for the house’s coordinates. Since the coordinates are represented as a pair of numbers, we cannot use foreign keys to force users to pass through coordinates within Chicago. With the trigger’s help, the user must enter a latitude between 41.64 and 42.05, while the longitude must stay within -87.51 and -88.03.

## 7. Each team member should describe one technical challenge that the team encountered. 
This should be sufficiently detailed such that another future team could use this as helpful advice if they were to start a similar project or where to maintain your project.

### Hongxiao Chen:
One technical challenge I faced is related to the deployment step of our application. After using `gcloud app deploy` in the console, the web page it created returned 502. I was initially frustrated by this because there seems no problem with our application, and I can’t debug it locally. However, I soon realized that I could read logs to find the issue. So I searched in Google Docs and find a command that is crucial for resolving my problem:`gcloud app logs tail -s default`. It shows the latest logs of the web app. I soon realized that I did not install `pyyaml` lib on my PC, so the auto-generated `requirement.txt` does not record this. This caused the web app to lose its dependencies and return 502. My conclusion is: if you find something intangible, don’t forget to read logs.

### Sifei Du:
My part is mainly implementing the frontend of the website. The biggest challenge I met is to add a google map to the website. At first, the map cannot be shown correctly. There’s no map or the map just appears to be a 0*0 division on the website. It turns out that the implementation we learned from Google needs changes to fit our project: we have to apply for a new API key for the map on the Google Cloud Platform. As the project goes on, we need to add the locations of the houses to the map. It was stuck when we cannot click on any of the points on the map. Then we find out that we have to add a constant called “InfoWindow” to allow “Listener” events to be activated.

### Jiacheng Guo:
One technical challenge our team encountered during developing our website was that initially, we had different code editors. The reason why different code editors were the problem is that we have different coding backgrounds. Some of our team members have more coding backgrounds and are able to write SQL queries with their familiar coding editor, but some of our team members are not that familiar with coding editors. And this summer course is fast-paced. There is a limited amount of time for students with different coding experiences to keep the same pace on the project. Installing environment for a code editor could take so much time. If every team member has the same code editor and gives support to each other, team members can help each other in terms of installing the required environment. Therefore, there will not be any team members left behind if someone is not familiar with the code editor and has to take so much time to be familiar with the editor before the actual coding part.

### Zhiyuan Wang:
In preparation for the final demo, we needed to implement a stored procedure. Initially, it was a bit difficult for us. The main reason is the complexity of this procedure's requirements. It asks us to use cursors, make looping, and involve at least two advanced queries. Another reason is that the functionality of our web application was already relatively well developed. If we just make a procedure to cope with the course requirements, the user experience will not be improved. Finally, after fully considering both requirements, I decided to use this procedure to implement further and faster research on the district. After inputting the neighborhood name correctly, the procedure will directly return the useful information in that district. With this module, our application users could get a faster view of houses in the area. While writing this part of the code, I also ran into problems. During the first trial run, the procedure returned the correct number of rows. However, only the first row of data was returned repeatedly. At first, I thought it was a cursor problem, but that part of the code looked perfectly correct. Finally, we found the error in the final SELECT clause. The reason was that the variables in SELECT were called cyclically. After changing it into “SELECT *”, the problem was solved.

## 8. Are there other things that changed comparing the final application with the original proposal?

We have also changed how we represent the safety score. It used to be a huge table with all criminal events in Chicago. But we soon realized that it was redundant since the main focus of our application was to find houses instead of criminals. So we replaced it with a table of calculated safety scores for every district.

## 9. Describe future work that you think, other than the interface, that the application can improve on.

Our future work could be adding a certain period of time for our attributes such that some houses are only available for a certain time during the year. This feature requires us to implement a “time” function similar to our “edit” function on our website right now. Users can use the time function to add a house with limited time. I think this function will be useful because it improves the flexibility of our house supplier. And the other future work could be the way our team designs the relation between different tables. Right now there are only eight tables for our database, but in the future, as we add more functions and features to our website. There will be much more data tables we need to put in our database. The decision of which attribute in which table should be the primary or secondary key is really critical because the proper database design will improve the system dramatically.

## 10. Describe the final division of labor and how well you managed teamwork.

As a team leader, I (Hongxiao Chen) mainly worked on the backend functions that control the webpage and communicate with the SQL server by using JavaScript and Python. Sifei Du has experience in HTML language during his internship. He developed a beautiful interface that is highly accessible even for new users. Jiacheng Guo helped to develop some Python functions and SQL schema design. Zhiyuan Wang also contributed to the code for communicating with SQL using Python. He also helped with ER Diagram, SQL table schema, and advanced database program.

Despite the fact that some of our team members are located in China and we have the problem of time zone, we still complete our group project with high efficiency. I think distributing the workload beforehand and setting up deadlines for each step is crucial for our project to progress. Even though we cannot discuss face-to-face, we use GitHub to synchronize our work and leave our ideas in the discussion group when we are awake. Overall, I think our teamwork is successful.

## Extra. Makeup for fulfilling the missing requirements in stages 2&3

In addtion, we made changes in "ER diagram.md" and "Database Design.md" to maintain the requirements of stage 2&3 better.

For stage 2, we updated the ER diagram. We made a relationship between "neighborhood" and "surrounding information". The link of md is: https://github.com/cs411-su22/su22-cs411-team023-CDGW/blob/main/doc/ER-Diagram.md

For stage 3, we corrected the implementation of database. We added some foreign keys according to the relational schema we made. The update is shown in the "Table" part of "Database Design.md" file. The link is: https://github.com/cs411-su22/su22-cs411-team023-CDGW/blob/main/doc/Database%20Design.md
