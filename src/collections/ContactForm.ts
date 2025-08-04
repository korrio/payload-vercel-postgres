import type { CollectionConfig } from 'payload'

export const ContactForm: CollectionConfig = {
  slug: 'contact-forms',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'การจัดการข้อมูล',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
      admin: {
        description: 'Full name of the person submitting the form',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
      admin: {
        description: 'Contact email address',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      admin: {
        description: 'Contact phone number (optional)',
      },
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company Name',
      admin: {
        description: 'Company or organization name (optional)',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Subject',
      admin: {
        description: 'Subject of the inquiry',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
      admin: {
        description: 'Detailed message or inquiry',
      },
    },
    {
      name: 'inquiryType',
      type: 'select',
      label: 'Inquiry Type',
      options: [
        {
          label: 'General Inquiry',
          value: 'general',
        },
        {
          label: 'Franchise Information',
          value: 'franchise',
        },
        {
          label: 'Market Rental',
          value: 'market',
        },
        {
          label: 'Technical Support',
          value: 'support',
        },
        {
          label: 'Business Partnership',
          value: 'partnership',
        },
        {
          label: 'Complaint',
          value: 'complaint',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      defaultValue: 'general',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Resolved',
          value: 'resolved',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'priority',
      type: 'select',
      label: 'Priority',
      options: [
        {
          label: 'Low',
          value: 'low',
        },
        {
          label: 'Normal',
          value: 'normal',
        },
        {
          label: 'High',
          value: 'high',
        },
        {
          label: 'Urgent',
          value: 'urgent',
        },
      ],
      defaultValue: 'normal',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'source',
      type: 'text',
      label: 'Source',
      defaultValue: 'website',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Source of the contact form submission',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      label: 'IP Address',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'IP address of the submitter',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Browser information',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      label: 'Assigned To',
      admin: {
        position: 'sidebar',
        description: 'Staff member assigned to handle this inquiry',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        description: 'Internal notes for staff use only',
      },
    },
    {
      name: 'responseTemplate',
      type: 'select',
      label: 'Response Template',
      options: [
        {
          label: 'Standard Thank You',
          value: 'standard-thank-you',
        },
        {
          label: 'Franchise Information',
          value: 'franchise-info',
        },
        {
          label: 'Market Rental Info',
          value: 'market-info',
        },
        {
          label: 'Technical Support',
          value: 'tech-support',
        },
        {
          label: 'Custom Response',
          value: 'custom',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Template for responding to this inquiry',
      },
    },
    {
      name: 'emailSent',
      type: 'checkbox',
      label: 'Admin Email Sent',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Whether admin notification email was sent',
      },
    },
    {
      name: 'autoResponded',
      type: 'checkbox',
      label: 'Auto Response Sent',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Whether auto-response email was sent to user',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          // Set source and tracking info for new submissions
          data.source = data.source || 'website';
          
          // Add IP address and user agent if available from request
          if (req.ip) {
            data.ipAddress = req.ip;
          }
          if (req.headers && req.headers['user-agent']) {
            data.userAgent = req.headers['user-agent'];
          }
        }
        return data;
      },
    ],
    afterChange: [
      async ({ req, doc, operation }) => {
        // Send email notification after new contact form is created
        if (operation === 'create') {
          try {
            // Note: Email sending will be implemented in the API endpoint
            console.log(`New contact form submission: ${doc.id} - ${doc.subject}`);
          } catch (error) {
            console.error('Error sending contact form notification:', error);
          }
        }
      },
    ],
  },
  timestamps: true,
}

export default ContactForm