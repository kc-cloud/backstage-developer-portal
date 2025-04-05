import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fetch from 'node-fetch';

export const simpleApiCallAction = createTemplateAction<{ service_name: string }>({
  id: 'custom:simple-api-call-backend',
  schema: {
    input: {
      required: ['service_name'],
      type: 'object',
      properties: {
        service_name: {
          type: 'string',
          title: 'Service Name',
          description: 'The name of the service to query from the API',
        },
      },
    },
  },
  async handler(ctx) {
    const { service_name } = ctx.input;
    const apiUrl = `http://localhost:8080/api?service_name=${encodeURIComponent(service_name)}`;

    ctx.logger.info(`Calling API: ${apiUrl}`);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      ctx.output('apiResponse', data);

      ctx.logger.info(`API Response: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      ctx.logger.error(`API call failed: ${(error as Error).message}`);
      throw error;
    }
  },
});

console.log("Registering custom action: simple-api-call-backend (1)");