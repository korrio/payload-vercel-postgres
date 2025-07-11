import type { CollectionConfig } from 'payload'

export const Views: CollectionConfig = {
  slug: 'views',
  admin: {
    useAsTitle: 'viewedAt',
    defaultColumns: ['collectionName', 'documentId', 'viewedAt', 'ipAddress'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'collectionName',
      type: 'select',
      required: true,
      options: [
        { label: 'Franchises', value: 'franchises' },
        { label: 'Markets', value: 'markets' },
        { label: 'Posts', value: 'posts' },
      ],
      admin: {
        description: 'The collection that was viewed',
      },
    },
    {
      name: 'documentId',
      type: 'text',
      required: true,
      admin: {
        description: 'The ID of the document that was viewed',
      },
    },
    {
      name: 'documentTitle',
      type: 'text',
      admin: {
        description: 'The title of the document for easy reference',
      },
    },
    {
      name: 'categoryId',
      type: 'text',
      admin: {
        description: 'Category ID (for franchises) or Province (for markets)',
      },
    },
    {
      name: 'categoryName',
      type: 'text',
      admin: {
        description: 'Category name or Province name for easy reference',
      },
    },
    {
      name: 'userId',
      type: 'text',
      admin: {
        description: 'User ID if logged in',
      },
    },
    {
      name: 'sessionId',
      type: 'text',
      admin: {
        description: 'Session ID for anonymous users',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        description: 'IP address of the viewer',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        description: 'User agent string',
      },
    },
    {
      name: 'referrer',
      type: 'text',
      admin: {
        description: 'Referrer URL',
      },
    },
    {
      name: 'viewedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        description: 'When the view occurred',
        date: {
          displayFormat: 'dd/MM/yyyy HH:mm:ss',
        },
      },
    },
  ],
  timestamps: false,
}