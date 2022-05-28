import { scrapeAnimeDetails, BASE_URL, scrapeRecentRelease, recent_release_url } from "./parser";
import { connectToDB } from "./connect-db";
import { getCollection } from "./get-collection";

export { scrapeAnimeDetails, connectToDB, getCollection, BASE_URL, scrapeRecentRelease, recent_release_url };
