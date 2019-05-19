import * as path from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Example } from '../entities/Example';

export async function createDevDb() {
  let synchronize: boolean;
  if (process.env.RECREATE_DB) {
    synchronize = true;
  } else {
    synchronize = false;
  }
  const options: ConnectionOptions = {
    type: 'sqlite',
    synchronize: synchronize,
    entities: [Example],
    database: path.join(__dirname, 'dest/db.db'),
    logger: 'simple-console',
    logging: ['error', 'info']
  }
  console.log('returning created db');
  return await createConnection(options);
}