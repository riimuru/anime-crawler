import { MongoClient, Collection, Document } from "mongodb";

/**
 *
 * @description Gets a collection from the database and returns it.
 * @param {MongoClient} client MongoDB client
 * @param {String} dbName Database name
 * @param {String} collectionName Collection name
 * @returns {Document} MongoDB collection
 * @throws {Error} If database doesn't exist
 */
export const getCollection = <T extends Document = Document>(
  client: MongoClient,
  dbName: string,
  collectionName: string
): Collection<T> | undefined => {
  try {
    return client.db(dbName).collection<T>(collectionName);
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
