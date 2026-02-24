export const schema = {
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

  // ======== Apply ==========
   ApplyCreate: {
      type: 'object',
      required: [
        'nameApply',
        'emailApply',
        'phoneNumberApply',
        'gender',
        'domicile',
        'resume',
      ],
      properties: {
        nameApply: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        emailApply: {
          type: 'string',
          format: 'email',
        },
        phoneNumberApply: {
          type: 'string',
          description: 'Minimum 10 digits',
        },
        gender: {
          type: 'string',
        },
        domicile: {
          type: 'string',
        },
        resume: {
          type: 'string',
          description: 'Resume file URL or text',
        },
          },
          example: {
            nameApply: 'John Doe',
            emailApply: 'john@gmail.com',
            phoneNumberApply: '081234567890',
            gender: 'Male',
            domicile: 'Jakarta',
            resume: 'https://example.com/resume.pdf',
          },
        },

        ApplyUpdate: {
          type: 'object',
          properties: {
            nameApply: { type: 'string' },
            emailApply: { type: 'string', format: 'email' },
            phoneNumberApply: { type: 'string' },
            gender: { type: 'string' },
            domicile: { type: 'string' },
            resume: { type: 'string' },
          },
          example: {
            nameApply: 'John Doe Updated',
            emailApply: 'john.new@gmail.com',
            phoneNumberApply: '081234567891',
            gender: 'Female',
            domicile: 'Bandung',
            resume: 'https://example.com/resume-new.pdf',
          },
        },

        BranchCreate: {
        type: 'object',
        properties: {
          nameBranch: {type: 'string'},
          companyId: { type: 'integer'},
          streetAddress: { type: 'string'},
          linkMap : { type: 'string' },
          phone: { type: 'integer'},
          email: { type: 'string', format: 'email'},
          website: { type: 'string'},
        },
        exampe: {
          nameBranch: 'RDS Semarang',
          companyId: 2,
          streetAdress: 'JL.Indraprasta',
          phone: 6292834992,
          email: 'rdssemarang@gmail.com',
          website: 'https://rds.co.id'
        }
      },

      BranchUpdate: {
        type: 'object',
        properties: {
          nameBranch: {type: 'string'},
          companyId: { type: 'integer'},
          streetAddress: { type: 'string'},
          linkMap : { type: 'string' },
          phone: { type: 'integer'},
          email: { type: 'string', format: 'email'},
          website: { type: 'string'},
        },
        exampe: {
          nameBranch: 'RDS Semarang',
          companyId: 2,
          streetAdress: 'JL.Indraprasta',
          phone: 6292834992,
          email: 'rdssemarang@gmail.com',
          website: 'https://rds.co.id'
        }
      }
}