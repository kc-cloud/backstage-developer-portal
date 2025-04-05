import { createRouter } from '@backstage/plugin-scaffolder-backend';
import { simpleApiCallAction } from './actions/simpleApiCall';

export default async function createPlugin(env) {
  return await createRouter({
    actions: [simpleApiCallAction],  // Register the custom action
    logger: env.logger,
    config: env.config,
    database: env.database,
    discovery: env.discovery,
    tokenManager: env.tokenManager,
    permissions: env.permissions,
  });
}

console.log("Registering custom action: simple-api-call-backend");
