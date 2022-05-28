import { MongoClient } from "mongodb";

declare global {
  var config: {
    animesAdded: number;
    animesUpdated: number;
  };
}

export default global;
