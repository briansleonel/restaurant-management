# Restaurant management platform

Restaurant management system that allows to show the available restaurants, and the list of available products. It also allows you to create orders with many products.

## Starting 🚀

These instructions will guide you to get a working copy of this project on your local machine for development and testing purposes.

### Prerequisites 📋

To run this project you will need to create a database in postgresql called db_restaurants. And in the `.env` file in the `./server` folder, you will have to enter the corresponding credentials to be able to access the database.

The file would look something like this:

```env
DB_HOSTNAME=localhost
DB_PORT=5432
DB_USER=YOUR_USER
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=db_restaurants
```

### Installation 🔧

Open a terminal and go to the folder in which you want to clone the project.

Clone GitHub repository:

```sh
$ git clone https://github.com/briansleonel/restaurant-management.git
```

#### Run the Server

Navigate to `./server` folder of the project via the terminal and install the dependencies:

```bash
$ cd server
$ yarn install

# --- Running the app ---

# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

#### Run the Client

Using another terminal, navigate to the `./client` folder of the project through the terminal and install the dependencies:

```bash
$ cd client
$ yarn install

# --- Running the app ---

# development
$ yarn dev
```

## Auhors ✒️

-   **González, Brian Leonel** - [briansleonel](https://github.com/briansleonel)
