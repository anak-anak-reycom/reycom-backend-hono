export const openApiDoc = {
  openapi: '3.0.0',

  info: {
    title: 'API Documentation Reycom',
    version: '1.0.0',
    description: 'API documentation for Reycom Service',
  },

  // =============================
  // GLOBAL SECURITY SCHEMES
  // =============================
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
      },
    },

    schemas: {
      CareerCreate: {
        type: 'object',
        required: [
          'jobDate',
          'jobName',
          'jobDescription',
          'jobResponbilities',
          'jobRequirement',
          'categoryId',
        ],
        properties: {
          jobDate: {
            type: 'string',
            format: 'date-time',
            example: '2026-02-19T08:00:00Z',
          },
          jobName: {
            type: 'string',
            example: 'Backend Developer',
          },
          jobDescription: {
            type: 'string',
            example: 'Develop REST API using Node.js',
          },
          jobResponbilities: {
            type: 'string',
            example: 'Build scalable backend services',
          },
          jobRequirement: {
            type: 'string',
            example: 'Minimum 1 year experience',
          },
          categoryId: {
            type: 'integer',
            example: 1,
          },
        },
      },

      CareerUpdate: {
        type: 'object',
        properties: {
          jobDate: {
            type: 'string',
            format: 'date-time',
            example: '2026-02-20T08:00:00Z',
          },
          jobName: { type: 'string' },
          jobDescription: { type: 'string' },
          jobResponbilities: { type: 'string' },
          jobRequirement: { type: 'string' },
          categoryId: { type: 'integer' },
        },
      },
    },

    ApplyCreate: {
      type: 'object',
      properties: {
        nameApply: {type: 'string'},
        emailApply: {type: 'string'},
        phoneNumberApply: {
          type: 'number',
          example: ''
        }
      }
    }
  },

  tags: [
    { name: 'Admin', description: 'Admin management APIs' },
    { name: 'Apply', description: 'Job apply APIs' },
    { name: 'Career', description: 'Career APIs' },
    { name: 'Category', description: 'Category APIs' },
    { name: 'News', description: 'News APIs' },
    { name: 'Carousel', description: 'Carousel APIs' },
    { name: 'Videos', description: 'Videos APIs' },
    { name: 'Country', description: 'Country APIs' },
    { name: 'Company', description: 'Company APIs' },
    { name: 'Branch', description: 'Branch Company APIs' },
  ],

  paths: {

    // ======================================================
    // ADMIN CRUD
    // ======================================================
    '/admin': {
      get: {
        tags: ['Admin'],
        summary: 'Get all admins',
        security: [{ BearerAuth: [] }],
        responses: {
          '200': { description: 'OK' },
          '401': { description: 'Unauthorized' },
        },
      },
      post: {
        tags: ['Admin'],
        summary: 'Create admin',
        security: [{ BearerAuth: [] }],
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },

    '/admin/{id}': {
      get: {
        tags: ['Admin'],
        summary: 'Get admin by ID',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          '200': { description: 'OK' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      patch: {
        tags: ['Admin'],
        summary: 'Update admin',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
        },
      },
      delete: {
        tags: ['Admin'],
        summary: 'Delete admin',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
        },
      },
    },

    // ======================================================
    // ADMIN AUTH
    // ======================================================
    '/admin/login': {
      post: {
        tags: ['Admin'],
        summary: 'Login Admin',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['nameAdmin', 'passwordAdmin'],
                properties: {
                  nameAdmin: { type: 'string', example: 'admin' },
                  passwordAdmin: { type: 'string', example: 'password123' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Login success' },
          '401': { description: 'Invalid credentials' },
        },
      },
    },

    '/admin/logout': {
      post: {
        tags: ['Admin'],
        summary: 'Logout Admin',
        security: [{ BearerAuth: [] }],
        responses: {
          '200': { description: 'Logout success' },
          '401': { description: 'Unauthorized' },
        },
      },
    },

    // ======================================================
    // GENERIC CRUD TEMPLATE (ALL USE TOKEN)
    // ======================================================

    '/apply': crud('Apply', 'application'),
    '/apply/{id}': crudById('Apply', 'application'),

    '/career': {
      get: crud('Career', 'career').get,
      post: {
        tags: ['Career'],
        summary: 'Create career',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CareerCreate',
              },
            },
          },
        },
        responses: {
          '201': { description: 'Career created successfully' },
          '400': { description: 'Validation error' },
          '401': { description: 'Unauthorized' },
        },
      },
    },

    '/career/{id}': {
      get: crudById('Career', 'career').get,
      patch: {
        tags: ['Career'],
        summary: 'Update career',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CareerUpdate',
              },
            },
          },
        },
        responses: {
          '200': { description: 'Career updated successfully' },
        },
      },
      delete: crudById('Career', 'career').delete,
    },

    '/category': crud('Category', 'category'),
    '/category/{id}': crudById('Category', 'category'),

    '/country': crud('Country', 'country'),
    '/country/{id}': crudById('Country', 'country'),

    '/news': crud('News', 'news'),
    '/news/{id}': crudById('News', 'news'),

    '/carousel': crud('Carousel', 'carousel'),
    '/carousel/{id}': crudById('Carousel', 'carousel'),

    '/videos': crud('Videos', 'video'),
    '/videos/{id}': crudById('Videos', 'video'),

    '/company': crud('Company', 'company'),
    '/company/{id}': crudById('Company', 'company'),

    '/branch': crud('Branch', 'branch'),
    '/branch/{id}': crudById('Branch', 'branch'),
  },
}

// ======================================
// REUSABLE CRUD GENERATOR (CLEAN CODE)
// ======================================

function crud(tag: string, name: string) {
  return {
    get: {
      tags: [tag],
      summary: `Get all ${name}s`,
      security: [{ BearerAuth: [] }],
      responses: { '200': { description: 'OK' } },
    },
    post: {
      tags: [tag],
      summary: `Create ${name}`,
      security: [{ BearerAuth: [] }],
      responses: { '201': { description: 'Created' } },
    },
  }
}

function crudById(tag: string, name: string) {
  return {
    get: {
      tags: [tag],
      summary: `Get ${name} by ID`,
      security: [{ BearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      responses: { '200': { description: 'OK' } },
    },
    patch: {
      tags: [tag],
      summary: `Update ${name}`,
      security: [{ BearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      responses: { '200': { description: 'Updated' } },
    },
    delete: {
      tags: [tag],
      summary: `Delete ${name}`,
      security: [{ BearerAuth: [] }],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      responses: { '200': { description: 'Deleted' } },
    },
  }
}
