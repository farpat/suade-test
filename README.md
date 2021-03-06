# Introduction
There are 2 choices to do, Here are my choices:
- Concerning technology, I chose **VueJS** + **VueRouter** + **VueX** written with **TypeScript**
- Concerning scenario, I chose **Visualization dashboard**

<br><br>
There are 3 functionalities in the application:
- **Go to visualize**: This screen displays 2 charts. <br>
The first chart allows to filter the gender. <br>
The choice made on first chart is reflected on the second chart and map screen
- **Go to edit**: This screen allows to edit any people. <br>
 The update is reflected on visualization screen and map screen
- **Go to map**: This screen displays a map in what all people is placed

# Installation
- `git clone git@github.com:farpat/suade-test`
- `cp .env.example .env` : Copy the environment variables. You can edit this file but the actually variables work.
- `make install`: This makefile command installs npm dependencies via docker and cypress locally
<br>**Don't hesitate to display all commands by entering `make help`**

# Use
- `make dev`: This command runs all development servers to work well. *Note that this command displays all servers running*
- `make stop-dev`: This command stops all development servers

# Tests
- `make test`: This command runs all e2e applications tests made with cypress. For tests, you must install npm on your device

# Various notes
- In `./public/index.html`, the asset url is displayed in raw because I suppose that the html is served by a backend application like Python (displaying the good asset url according the current environment)
- I use the package `@farpat/api`. This last one is maintained by me
