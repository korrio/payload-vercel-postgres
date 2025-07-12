import type { CollectionConfig } from 'payload'
import { authenticated, anyone } from '../access/authenticated'
import { createActivityLogger } from '../utils/activity-logger'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
    access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
  },
  hooks: {
    afterLogin: [
      async ({ req, user }) => {
        if (user?.id) {
          const logger = createActivityLogger(req.payload)
          await logger.logLogin(String(user.id), req)
        }
      },
    ],
    afterLogout: [
      async ({ req }) => {
        if (req.user?.id) {
          const logger = createActivityLogger(req.payload)
          await logger.logLogout(String(req.user.id), req)
        }
      },
    ],
    afterChange: [
      async ({ req, doc, previousDoc, operation }) => {
        if (operation === 'update' && req.user?.id) {
          const logger = createActivityLogger(req.payload)
          
          // Check for password change
          if (doc.password !== previousDoc.password) {
            await logger.logPasswordChange(String(doc.id), req)
          }
          
          // Check for email change
          if (doc.email !== previousDoc.email) {
            await logger.logEmailChange(String(doc.id), previousDoc.email, doc.email, req)
          }
          
          // Log general profile update if other fields changed
          const changes: Record<string, unknown> = {}
          if (doc.name !== previousDoc.name) changes.name = { from: previousDoc.name, to: doc.name }
          if (doc.role !== previousDoc.role) changes.role = { from: previousDoc.role, to: doc.role }
          
          if (Object.keys(changes).length > 0) {
            await logger.logProfileUpdate(String(doc.id), changes, req)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      defaultValue: 'user',
      required: true,

      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    }
  ],
}
