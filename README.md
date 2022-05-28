# Gogoanime Crawler

## Guide
 - [Getting Started](#getting-started)
 - [How to use](#how-to-use)

### Getting Started

```bash
git clone https://github.com/riimuru/gogoanime-crawler.git
cd gogoanime-crawler
yarn install # or npm install
```

Create a `.env` file in the root directory of the project.
```
DB_NAME=       # Mongodb Database name
MONGO_URI=     # Mongodb URI
```
Check out [How to create a new mongodb cluster](https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/) to get the mongodb URI and the database name.

### How to use

```bash
yarn start # or npm start
```
The crawler will validate the environment variables and the database connection. If everything is fine, it will start crawling.

if everything is fine, your terminal will show the following:

```
Checking enviroment variables...
Enviroment variables checked.

Connecting to database...
Database connected.

Validating database collections...
Database collections validated.

Starting crawler...

Scraping anime-list.html page = 1...
Updating [.Hack//G.U. Returner - sub]...
Updating [.hack//G.U. Trilogy - sub]...
...
```

**if you want to stop the crawler, you can use `ctrl + c` on the terminal.**

**NOTE: if you stop the crawler and want to start it again, it will start from the first page again, But it will not re-add the anime that already exist in the database.**

The crawler will stop when it reaches the last page of the anime-list.html page. it will take approximately 3 hours to crawl all of gogoanime.

