import { MongoClient } from "mongodb";

import { colors, logger } from "../utils/utils";

/**
 * @param {MongoClient} client - MongoClient object
 * @returns Promise<void> - resolves when database is connected
 */
export const connectToDB = async (client: MongoClient): Promise<void> => {
  logger.info("\nConnecting to database...", colors.blue);
  try {
    await client.connect();
    logger.info("Database connected.", colors.green);
  } catch (err) {
    throw new Error("Could not connect to database.");
  }
};
