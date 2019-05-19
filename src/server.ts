import { Server } from 'http';
import { createDb } from './db/db';

import * as Q from 'q';
import { Example } from './entities/Example';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { createExpress } from './express/ExpressInitializer';

const applicationConfig = [
  { db: createDb },
  { express: createExpress }
];

export interface AppType {
  db: Repository<Example>;
  express: Server;
}

// Start the app by completing a sequence of startup steps.
function start(steps: Array<{ [P in keyof AppType]?: (app: AppType) => Promise<any> }>): AppType {
  // this is the app that we'll be starting. 
  let app: AppType = {
    db: undefined,
    express: undefined
  };

  let converted = steps.map((step) => {
    // Convert step to list of deferred service steps.
    var services = _.mapKeys(step, (value, key) => {
      console.log('Binding %s...', key);
      if (app[key as keyof AppType]) {
        console.log('Warning, duplicate binding, overriding original binding %s...', key);
      }
      // Lookup the service binding.
      return value(app).then((res) => {
        app[key as keyof AppType] = res;
      });
    });
    Q.all(Object.values(services)).catch((err) => {
      throw err;
    });
  });
  console.log('Application startup completed!');
  return app;
}

export var GlobalApplication: AppType = start(applicationConfig);