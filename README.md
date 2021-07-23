# Task Assigning WebApp
![Films   TV 21-07-2021 20_11_27](https://user-images.githubusercontent.com/80690679/126507974-4bcc0e7d-55ba-4cdb-bfdc-cc31a709fe60.png)
> Teachers can see and create multiple classes and assignments...

> each time a class is created they are given a unique id which is used in various backend process
> They can also see progress details of each student 

> Students will be able to join classes(using thier unique id) and access assignments assigned for each individual classes….they will also be able to see their progress
## A React Based Web-Application...
> To access the database info we have used proxyservers(back-end)...

### The libraries used for the backend were...


![server js - Task_Assigning_WebApp - Visual Studio Code 21-07-2021 20_03_52](https://user-images.githubusercontent.com/80690679/126506860-89cfa722-cb97-40da-a6f7-a5a956bf1092.png)



### We've have used Mysql as database for this project...

![MySQL Workbench 21-07-2021 20_07_13](https://user-images.githubusercontent.com/80690679/126507380-bd9e16eb-5763-4c78-8a39-042e68a1b57b.png)
>We have created separate tables for students and teachers...

>For teacher the classes and assignments can be accessed using their email-id as foreign key in table assignments_table and classes_table

>For Students we have used each classes unique id to access assignments and their individual progress
