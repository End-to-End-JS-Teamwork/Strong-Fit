 <p align="center"><a href="http://telerikacademy.com//"><img src="https://github.com/tddold/Telerik-Academy/blob/master/Programming%20with%20C%23/1.%20C%23%20Fundamentals%20I/Presentation/Telerik.png" /></a></p>
 
-<h1 align="center">Strong-Fit</h1>

# Team-3-Telerik
---

## Team Members
* Dimitar Stoyanov
* Radostin Angelov
* Todor Dakov

## Secret Agent Service

Форум за хора занимаващи се с Crossfit

## Логика 

 -	Потребителя трябва да се регестрира въув форума ако желае да коментира или да създава теми.
 - 	Има един администратор който е първоначално зададен.
 -	Администартора може да указва дали някой да е с администраторски права.
 -	Потребителите могат да разглеждат статиите без да са регистирани или логната. 
 -	Всеко потребител може да си обновява информацията в профила.
 - Server side paging and sorting;

 ## RESTful API Overview
| HTTP Method | Web service endpoint | Description |
|:----------:|:-----------:|:-------------|
|GET (for admin) | /admin/users | Gets all users |
|POST (public) | /register | Adds new user 
|PUT (for registered)| /profile | Updates user profile |
|GET (public)|/forum|Gets all articles|
|GET (for registered)|/admin/articles/add|Creaat new articles|
|POST (for registered)|/missions/add|Creates a new mission|
|GET (for registered)|/forum/comments/:id|Add commentar|
|POST (for registered)|/forum/topics|View all topic|
|GET (for admin)|/admin/administration|Gets admin panel|
|DELETE (for admin)|/admin/users/:id|Deletes the given user|
|GET (public)|/users/agents|Gets public information about agents|
|GET (public)|/users/commissioners|Gets public information about commissioners|
|GET (for registered)|/users/details/:id|Gets user details|
|GET (for registered)|/messages/inbox|Gets all messages to the given user|
|GET (for registered)|/messages/outbox|Gets all messages sent by the given user|
|GET (for registered)|/messages/send/:username|Loads the page for sending messages|
|POST (for registered)|/messages/send/:username|Sends message to the given user|
|GET (for registered)|/chat|Gets the chat screen|
|POST (public) |/login|Logs the user into the website|
|POST (for registered)|/logout|Logs out the user|
|GET (public) |/ |Shows the homescreen|

- - - - 

###### Repo of Team-3-Telerik [Link to GitHub](https://github.com/End-to-End-JS-Teamwork/Strong-Fit)

- - - -

###### Telereik-Academy Season 2015-2016 
