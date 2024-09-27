
import { Client, Databases, Account } from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66e443d9003cd44a3b16'); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';