import type { CollectionConfig } from 'payload'
import { authenticated, anyone } from '../access/authenticated'

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
  auth: true,
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
