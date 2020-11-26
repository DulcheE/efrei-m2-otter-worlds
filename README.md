## Project Async Programming

## Summary
**[All you need to know](https://github.com/DulcheE/efrei-m2-otter-worlds#all-you-need-to-know)**

[Where to find the project](https://github.com/DulcheE/efrei-m2-otter-worlds#where-to-find-the-project)

[The project's concept](https://github.com/DulcheE/efrei-m2-otter-worlds#the-projects-concept)

[Getting Started](https://github.com/DulcheE/efrei-m2-otter-worlds#getting-started)


**[Advanced presentation](https://github.com/DulcheE/efrei-m2-otter-worlds#advanced-presentation)**

[Synopsis](https://github.com/DulcheE/efrei-m2-otter-worlds#synopsis)

[Conception](https://github.com/DulcheE/efrei-m2-otter-worlds#conception)

[RoadMap](https://github.com/DulcheE/efrei-m2-otter-worlds#roadMap)

[Prototype](https://github.com/DulcheE/efrei-m2-otter-worlds#prototype)


**[Technical round-up](https://github.com/DulcheE/efrei-m2-otter-worlds#technical-round-up)**


**[Authors](https://github.com/DulcheE/efrei-m2-otter-worlds#authors)**




## All you need to know

### Where to find the project
Here is the Github repository :
 ```
https://github.com/DulcheE/efrei-m2-otter-worlds
 ```
And here is the Heroku link where the website is deployed *(since the project is not deployed yet, here is another link as a placeholder)* :
 ```
https://build-your-fleet.herokuapp.com/
 ```


### The project's concept
The goal of this project is to create a website using the Vue.js framework, with both a Front-End and a Back-End side.

Otter Worlds is a set of worldbuilding tools that helps you create, organize and store your fictional world's settings.
With wiki-like articles, interactive maps, historical timelines, and a full novel-writing software, we have all the tools you’ll need to run your RPG Campaign, or write your novel !


### Getting Started
The programmation is fully completed, but we have a small requirement : downloading the dependencies.
Don't worry ! We've got you covered.

```
Download the project.
To fully end the download, open a console tab where the project is located, and enter :
  $npm install
  
To make the server operationnal, please enter :
  $npm build
```



## Advanced presentation


### Synopsis
This website is a fictional universe management system for author and rpg Game master. The point of the system is to help worldbuilders to keep track of all different elements of their fictional world (places, character, religion, evenement), and rpg players to manage the different characters they have in said word (their stories and inventory).

![schema n° 1 : use-case graph](https://github.com/DulcheE/efrei-m2-otter-worlds/blob/main/static/graph-useCase.png)

So we can divide the functionalities we want to implement in two big categories:

#### World Builder
* Create a fictional world
  * Create a Wiki for this universe
  * upload a Map and place Interest Points
  * Races and Classes compatible with this universe
  * Build a Timeline of the universe's history
* Manage these worlds
  * If private, invite players to join it
  * Rename
  * Delete
* See other worlds
  * Read the Wikis
  * Read the Maps

#### Player
* Create a Character
  * In a specific Universe
  * Give a Class and a Race compatible with the specific world
  * Write the Character's statistics
  * Write the Character's story
* Manage a Character
  * Edit
  * Delete
* See other worlds
  * Read the Wikis
  * Read the Maps
  
#### All users
* Blog
  * Chat around an ongoing campain
  
The point of our project is to offer an easy to use solution very similar to software like **[worldAnvil](https://www.worldanvil.com)** to help manage worldbuilding and campaign management for tabletop RPG players.

![schema n° 2 : user graph](https://github.com/DulcheE/efrei-m2-otter-worlds/blob/main/static/graph-user.png)


### Conception
To implement all of this, we will of course need a Database, which means we also need a REST API with our Front to communicate with it.
To easily develop the back and the front together, we will use the framework **[Nuxt](https://nuxtjs.org)** to have a Front in **[Vue.js](https://fr.vuejs.org)** and other routes for the back in **[Node.js](https://nodejs.org)**. For the database, we will use **[Mario DB](https://mariadb.org)** which is an open source database engine based on the same core as the MySQL database engine. The advantages of **[Mario DB](https://mariadb.org)** over other database engine are the special type existing in MariaDB (especially the Auto increment) and the possibility to implement PL/SQL triggers and programs.


![schema n° 3 : technologies graph](https://github.com/DulcheE/efrei-m2-otter-worlds/blob/main/static/graph-technologies.png)


Regarding the front, we will use as UI Framework **[Vuetify](https://vuetifyjs.com)** which is modular, responsive, and performant. For all the API calls to the back, we will use Axios and we will manage the state of the client application with Vuex.
For complex functionalities, like the edition of wiki pages we will use a WYSIWYG editor to have the most complete formatting and Openlayers for all the functionalities of the custom maps.
For the back, we will use express to create all the routes of the API and the module mariadb to communicate with the Database.
The database will contain all the different data needed by the application in tables with relationship links.



### RoadMap

* Phase 1 : configuration
  * Creation of the database
  * Configuration of the nuxt project
  * Creation of development environment
* Phase 2 : start API creation
  * API
    * Universe
    * User
    * Article
    * Photo
* Phase 3 : API continuation and webapp development
  * API
    * Map
    * Interest Point
    * Timeline
  * WebApp
    * Home page
    * Login page
    * Universe management
    * Cunsult Universes
* Phase 4 : configuration
  * API (implementation of Character's endpoints)
    * Character
    * Inventory
    * Stat
  * WebApp
    * Implementation of Maps and Interest Pointe
    * Implementation of the Timeline
* Phase 5 : configuration
  * WebApp
    * Character creation (with stats)
    * Character management
    * Inventory management
* Phase 6 : deployement
  * deployement on Heroku



### Prototype
In this prototype we will have set up the final database. The different tables as well as the links between them will be designed. So we can start adding elements easily and build on this solid base to continue the development.
We will also set up the API : thanks to this feature, we will be able to start retrieving a page.
We will have a first front end with an API call, so we can display our database elements. 
For the final result of the site and to understand the architecture of the site we will create a figma document. This document will allow us to schematize the structure of the site, to see the interaction between the different pages and thus it will be easier to develop the different pages and their interaction. 




## Technical round-up
The whole project was made using :
* **[Node.js](https://nodejs.org)** - An asynchronous event-driven JavaScript runtime designed to build scalable network applications
* **[Vue.js](https://fr.vuejs.org)** - Javascript's framework
* **[Vuetify](https://vuetifyjs.com)** - a **[Vue.js](https://fr.vuejs.org)**'s UI library
* **[Nuxt](https://nuxtjs.org)** - a **[Vue.js](https://fr.vuejs.org)**'s framework that enables to make singlepage websites (back and front on the same project)
* **[Axios](https://github.com/axios)** - Promise based HTTP client for the browser and **[Node.js](https://nodejs.org)**
* **[Vuex](https://vuex.vuejs.org)** -  State management pattern + library for **[Vue.js](https://fr.vuejs.org)** applications
* **[Mario DB](https://mariadb.org)** - the database, chosen for its PL/SQL triggers and programs



## Authors
It was made by the following Efrei Paris students :
* **BEGEOT Hugues** - [his Git repository](https://github.com/opsilonn)
* **BONI François** - [his Git repository](https://github.com/scorpionsdu78)
* **DULCHE Eddy** - [his Git repository](https://github.com/DulcheE)
* **LEPRÉ Paul** - [his Git repository](https://github.com/paul-lepre)

See also the list of [contributors](https://github.com/DulcheE/efrei-m2-otter-worlds/graphs/contributors) who participated in this project.

Note : we are currently in our 5th year (2020-21), in a Software Engineering cursus.
