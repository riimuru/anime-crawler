import { MongoClient, CreateCollectionOptions } from "mongodb";

import { logger, colors } from "../utils/utils";

/**
 * @description checks if collection exists in database and creates it if it doesn't exist.
 * @param client - MongoClient
 * @param db - database name
 * @param options - collection options (optional)
 * @returns Promise<void> - resolves when collection is created or exists
 */
export const validateDB = async (
  client: MongoClient,
  db: string,
  options?: CreateCollectionOptions | undefined
): Promise<void> => {
  logger.info("\nValidating database collections...", colors.blue);

  try {
    const collections = await client.db(db).listCollections().toArray();

    for (const coll of ["gogoanime"]) {
      if (!collections.find((collection) => collection.name === coll)) {
        logger.warn(`Collection ${coll} doesn't exist.`);
        await client.db(db).createCollection(coll, options);
        logger.info(`Collection ${coll} created.\n`, colors.green);
      }
    }
    logger.info("Database collections validated.", colors.green);
  } catch (err) {
    throw new Error(`${(err as Error).message}`);
  }
};
