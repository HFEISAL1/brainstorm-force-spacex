# Brainstorm Force SpaceX Interview Assessment

## SpaceX Explorer :rocket:

### Working URL on Firebase 👁‍🗨
- https://spacex-explorer-ca9dc.web.app/

### Working Demo Link: https://drive.google.com/file/d/1Q5krkRaDjRKoHiQH7jMic50dDiTF_Upu/view?usp=share_link

## Setting Up on Local

### Pre-requisites
Make sure you have the following installed on your machine:
1. PHP 8.x
2. NodeJS -> NPM
3. MySQL
4. Composer

### API
In separate terminal instances, set up the DB and create the `users` table and install app dependencies

```bash
$ cd brainstorm-force-spacex/api/

# Copy the env.example file to .env and set the environment variables with DB connection values
$ cp .env.example .env
```

The `.env` file should look something like this:
```yml
# cp this file to `.env` and populate the variables with the required values to connect to the DB

DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=test
DB_USERNAME=test
DB_PASSWORD=test
JWT_SECRET=secret
```

```bash
$ cd brainstorm-force-spacex/api/

# Set up the DB
# Copy initdb.sql.example to initdb.sql and execute it to set up the DB
$ mysql -uroot -p < /<path>/<to>/initdb.sql
```

The `initdb.sql` file should look something like this
```sql
DROP DATABASE IF EXISTS <db_name>;
CREATE DATABASE <db_name> CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
DROP USER IF EXISTS <db_user>;
CREATE USER IF NOT EXISTS '<db_user>'@'localhost' identified by '<password>';
GRANT ALL on <db_name>.* to '<db_user>'@'localhost';
quit
```

Install app dependencies and then execute `dbseed.php` file to set up the `users` table
```bash
$ composer install
$ php dbseed.php
```

Navigate to the `api` directory and start the PHP Server on localhost:
```bash
$ cd brainstorm-force-spacex/api/
$ php -S localhost:8000
```

### Frontend

Navigate to the `frontend` directory, install requirements and start the application on local:
```bash
$ cd brainstorm-force-spacex/frontend/
$ npm i
$ npm run start
```
