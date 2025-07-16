import type { CollectionConfig } from 'payload'

export const UserLogs: CollectionConfig = {
  slug: 'user-logs',
  admin: {
    useAsTitle: 'activity',
    defaultColumns: ['activity', 'userEmail', 'userRole', 'timestamp', 'success'],
    listSearchableFields: ['activity', 'userEmail', 'userRole', 'ipAddress'],
  },
  access: {
    read: () => true, // Allow anyone to read logs
    create: () => true,
    update: () => false,
    delete: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return false
    },
  },
  fields: [
    {
      name: 'user',
      type: 'text',
      required: true,
      admin: {
        description: 'The user ID who performed the activity',
      },
    },
    {
      name: 'userEmail',
      type: 'text',
      admin: {
        description: 'The email of the user who performed the activity',
      },
    },
    {
      name: 'userRole',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      admin: {
        description: 'The role of the user who performed the activity',
      },
    },
    {
      name: 'activity',
      type: 'select',
      required: true,
      options: [
        { label: 'Login', value: 'login' },
        { label: 'Logout', value: 'logout' },
        { label: 'Profile Update', value: 'profile_update' },
        { label: 'Password Change', value: 'password_change' },
        { label: 'Email Change', value: 'email_change' },
        { label: 'Franchise Created', value: 'franchise_created' },
        { label: 'Franchise Updated', value: 'franchise_updated' },
        { label: 'Franchise Deleted', value: 'franchise_deleted' },
        { label: 'Market Created', value: 'market_created' },
        { label: 'Market Updated', value: 'market_updated' },
        { label: 'Market Deleted', value: 'market_deleted' },
        { label: 'Post Created', value: 'post_created' },
        { label: 'Post Updated', value: 'post_updated' },
        { label: 'Post Deleted', value: 'post_deleted' },
        { label: 'Media Uploaded', value: 'media_uploaded' },
        { label: 'Media Deleted', value: 'media_deleted' },
        { label: 'Failed Login Attempt', value: 'failed_login' },
      ],
      admin: {
        description: 'Type of activity performed',
      },
    },
    {
      name: 'details',
      type: 'json',
      admin: {
        description: 'Additional details about the activity (e.g., document ID, changes made)',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        description: 'IP address of the user',
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
      name: 'sessionId',
      type: 'text',
      admin: {
        description: 'Session identifier',
      },
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        description: 'When the activity occurred',
        date: {
          displayFormat: 'dd/MM/yyyy HH:mm:ss',
        },
      },
    },
    {
      name: 'success',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether the activity was successful',
      },
    },
    {
      name: 'errorMessage',
      type: 'text',
      admin: {
        description: 'Error message if the activity failed',
        condition: (data) => data.success === false,
      },
    },
  ],
  timestamps: false,
}