import { createDevDb } from "./dev-db";
import { Connection } from "typeorm";
import { Example } from '../entities/Example';

export async function createDb() {
  if (process.env.NODE_ENV === 'dev') {
    let thing = await createDevDb();
    return thing.getRepository(Example);
  }
}
