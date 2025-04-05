import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fetch from 'node-fetch';

export const simpleApiCallAction = () =>
  createTemplateAction<{
    service_name: string;
    service_group: string;
  }>({
    id: 'custom:simple-api-call-backend',
    description: 'Calls an API with service info as JSON',
    schema: {
      input: {
        type: 'object',
        required: ['service_name', 'service_group'],
        properties: {
          service_name: {
            type: 'string',
            description: 'The name of the service',
          },
          service_group: {
            type: 'string',
            description: 'The group of the service',
          },
        },
      },
    },
    async handler(ctx) {
      const payload = {
        service_name: ctx.input.service_name,
        service_group: ctx.input.service_group,
      };

      const response = await fetch('http://localhost:8080/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      ctx.logger.info(`API responded with: ${JSON.stringify(result)}`);
    },
  });
