import type { CollectionConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'pageType', 'status', 'updatedAt'],
    group: 'การจัดการหน้า',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      label: 'Page Type',
      options: [
        {
          label: 'Homepage',
          value: 'homepage',
        },
        {
          label: 'Franchise Page',
          value: 'franchise-page',
        },
        {
          label: 'Market Page',
          value: 'market-page',
        },
        {
          label: 'Article Page',
          value: 'article-page',
        },
        {
          label: 'Complaint Page',
          value: 'complaint-page',
        },
        {
          label: 'Contact Page',
          value: 'contact-page',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Page Slug',
      admin: {
        description: 'URL path for this page',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Page Content',
      admin: {
        description: 'Main content for the page',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Page Excerpt',
      admin: {
        description: 'Short description of the page',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'Main image for the page',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Image Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption',
        },
      ],
      admin: {
        description: 'Additional images for the page',
      },
    },
    {
      name: 'customFields',
      type: 'group',
      label: 'Custom Fields',
      fields: [
        {
          name: 'showBreadcrumb',
          type: 'checkbox',
          label: 'Show Breadcrumb',
          defaultValue: true,
        },
        {
          name: 'headerStyle',
          type: 'select',
          label: 'Header Style',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Minimal',
              value: 'minimal',
            },
            {
              label: 'Full Width',
              value: 'full-width',
            },
          ],
          defaultValue: 'default',
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color',
          admin: {
            description: 'CSS color value (e.g., #ffffff, rgb(255,255,255))',
          },
        },
      ],
    },
    // SEO Fields
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
        MetaTitleField({
          hasGenerateFn: true,
        }),
        MetaImageField({
          relationTo: 'media',
        }),
        MetaDescriptionField({}),
        PreviewField({
          hasGenerateFn: true,
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published Date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => !!data?.createdBy,
      },
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => !!data?.createdBy,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (req.user) {
          if (operation === 'create') {
            data.updatedBy = req.user.id;
            data.createdBy = req.user.id;
            if (!data.publishedAt && data.status === 'published') {
              data.publishedAt = new Date();
            }
          } else if (operation === 'update') {
            data.updatedBy = req.user.id;
            if (!data.publishedAt && data.status === 'published') {
              data.publishedAt = new Date();
            }
          }
          return data;
        }
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}

export default Pages