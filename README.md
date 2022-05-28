# Gogoanime Crawler

##### [Gogoanime Crawler](#gogoanime-crawler) can help you populate your anime database using [gogoanime](https://gogoanime.gg/) data in just few hours. It can also help you to keep your anime database up-to-date with new releases.

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
If you want to populate your anime database, and keep it up-to-date with new releases, you can use the following command:

```bash
yarn crawl # or npm run crawl
```
If you want to populate your anime database, but don't want to keep it up-to-date with new releases, you can use the following command:

```bash
yarn populate # or npm run populate
```
if you want add new releases, but don't want to populate your anime database, you can use the following command:
```bash
yarn refresh # or npm run refresh
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

**I recommend you to use the `yarn crawl` or `npm run crawl` even if you already have your database populated.**

**if you want to stop the crawler, you can use `ctrl + c` on the terminal.**

**NOTE: if you stop the crawler and want to start it again, it will start from the first page again, But it will not re-add the anime that already exist in the database.**

The crawler will stop when it reaches the last page of the anime-list.html page. it will take approximately 2 hours to crawl all of gogoanime. Then it will start the refresh process to the database up-to-date.

