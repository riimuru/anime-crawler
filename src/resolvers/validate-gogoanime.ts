import { Collection } from "mongodb";

import { Gogoanime } from "../models";
import { logger } from "../utils/utils";
import { scrapeAnimeDetails } from "../helpers/parser";

export const validateGogoanime = async (
  animeId: string,
  gogoanimeColl: Collection<Gogoanime>
): Promise<boolean> => {
  try {
    const animeDetails = await scrapeAnimeDetails(animeId);

    if (!animeDetails) return false;

    const anime = await gogoanimeColl.findOne({ id: animeId }, { projection: { _id: 1 } });
    let gogoanimeDbId = null;

    if (anime) {
      logger.info(`Updating [${animeDetails.title} - ${animeDetails.subOrDub}]...`);
      gogoanimeDbId = anime._id;
      await gogoanimeColl.updateOne({ _id: gogoanimeDbId }, { $set: { ...animeDetails } });
      global.config.animesUpdated++;
    } else {
      logger.info(`Inserting [${animeDetails.title} - ${animeDetails.subOrDub}]...`);
      gogoanimeDbId = (await gogoanimeColl.insertOne({ ...animeDetails })).insertedId;
      global.config.animesAdded++;
    }
    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const validateGogoanimeV2 = async (
  gogoanime: Gogoanime,
  gogoanimeColl: Collection<Gogoanime>
): Promise<boolean> => {
  try {
    if (!gogoanime) return false;

    const anime = await gogoanimeColl.findOne({ id: gogoanime.id }, { projection: { _id: 1 } });
    let gogoanimeDbId = null;

    if (anime) {
      logger.info(`Updating [${gogoanime.title} - ${gogoanime.subOrDub}]...`);
      gogoanimeDbId = anime._id;
      await gogoanimeColl.updateOne({ _id: gogoanimeDbId }, { $set: { ...gogoanime } });
      global.config.animesUpdated++;
    } else {
      logger.info(`Inserting [${gogoanime.title} - ${gogoanime.subOrDub}]...`);
      gogoanimeDbId = (await gogoanimeColl.insertOne({ ...gogoanime })).insertedId;
      global.config.animesAdded++;
    }

    return true;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
