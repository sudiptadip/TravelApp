import { Account, Client, Databases, Storage } from "appwrite";

export const appWriteConfig = {
  endpointUrl: import.meta.env.VITE_APP_WRITE_API_END_POINT,
  projectId: import.meta.env.VITE_APP_WRITE_PROJECT_ID,
  apiKey: import.meta.env.VITE_APP_WRITE_API_KEY,
  databaseId: import.meta.env.VITE_APP_WRITE_DATABASE_ID,
  usersCollectionId: import.meta.env.VITE_APP_WRITE_USERS_COLLECTION_ID,
  tripsCollectionId: import.meta.env.VITE_APP_WRITE_TRIPS_COLLECTION_ID,
};

const client = new Client()
  .setEndpoint(appWriteConfig.endpointUrl)
  .setProject(appWriteConfig.projectId);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage };
