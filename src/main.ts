require("dotenv").config();

import { Collection, MongoClient, MongoClientOptions } from "mongodb";
import axios from "axios";
import { load } from "cheerio";

import { logger, colors, animelistSuffixes } from "./utils/utils";
import { BASE_URL, connectToDB, getCollection } from "./helpers/";
import { validateDB } from "./resolvers/validate-db";
import { validateGogoanime } from "./resolvers/validate-gogoanime";
import { Gogoanime } from "./models";

let mongoClient: MongoClient;

// for testing purposes
let startTime: number, endTime: number;
global.config = {
  animesAdded: 0,
  animesUpdated: 0,
};

const validateEnviromentVariables = () => {
  logger.info("Checking enviroment variables...", colors.blue);
  if (!process.env.MONGO_URI) {
    throw new Error(
      `${colors.red}Missing environment variables. Please check the README.md file for more information.${colors.reset}`
    );
  }

  const mongoOptions: MongoClientOptions = {
    connectTimeoutMS: 5000,
    keepAlive: true,
  };

  mongoClient = new MongoClient(process.env.MONGO_URI!, mongoOptions);

  logger.info("Enviroment variables checked.", colors.green);
};

const startCrawler = async () => {
  logger.info("\nStarting crawler...", colors.blue);

  const gogoanimeColl = getCollection<Gogoanime>(mongoClient, process.env.DB_NAME!, "gogoanime")!;

  try {
    for (const suffix of animelistSuffixes) {
      let page = 1;

      await handlePages(suffix, page, gogoanimeColl);

      logger.info(`\nFinished scraping anime-list${suffix}...`, colors.green);
    }

    logger.info("\nFinished crawling.", colors.green);
  } catch (err) {
    throw new Error(`${(err as Error).message}`);
  }
};

const handlePages = async (suffix: string, page: number, gogoanimeColl: Collection<Gogoanime>): Promise<void> => {
  const url = `${BASE_URL}anime-list${suffix}?page=${page}`;

  logger.info(`\nScraping anime-list${suffix} page = ${page}...`, colors.blue);

  const html = await axios.get(url);
  const $ = load(html.data);

  const hasNextPage = $("div.anime_name.anime_list > div > div > ul > li.selected").next().length > 0;

  const animeList = $("section.content_left > div > div.anime_list_body > ul").children();

  for (const anime of animeList) {
    const animeId = $(anime).find("a").attr("href")?.split("/")[2];

    if (animeId) {
      if (!(await validateGogoanime(animeId, gogoanimeColl))) {
        logger.error(`Could not validate animeId = ${animeId}`);
      }
    }
  }

  endTime = performance.now();
  logger.info(
    `Anime-list page = ${page} scraped. ${global.config.animesAdded} anime(s) added, ${
      global.config.animesUpdated
    } anime(s) updated.  ${((endTime - startTime) / 1000 / 60).toFixed(3)} minutes elapsed.`,
    colors.green
  );

  if (hasNextPage) {
    await handlePages(suffix, page + 1, gogoanimeColl);
  }
};

(async () => {
  validateEnviromentVariables();

  await connectToDB(mongoClient!);
  await validateDB(mongoClient!, process.env.DB_NAME!);

  startTime = performance.now();
  await startCrawler();
})();
