import { Client, Databases, Account } from "appwrite";

export const PROJECT_ID = "649abb42ed3b1b06c493";
export const DATABASE_ID = "649abc2523c7eb890ba3";
export const COLLECTION_ID_MESSAGES = "649abc30b3fa89e44cfc";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("649abb42ed3b1b06c493");

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
