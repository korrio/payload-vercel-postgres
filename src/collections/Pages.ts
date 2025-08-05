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
        {
          label: 'Expand Branches Page',
          value: 'expand-branches-page',
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
      type: 'textarea',
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
      name: 'contentBlocks',
      type: 'blocks',
      label: 'Page Content Blocks',
      blocks: [
        // Hero Block
        {
          slug: 'hero',
          labels: {
            singular: 'Hero Section',
            plural: 'Hero Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Main Title',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Subtitle',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'pricing',
              type: 'text',
              label: 'Pricing Text',
            },
            {
              name: 'ctaButton',
              type: 'group',
              label: 'CTA Button',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  label: 'Button Text',
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Button Link',
                },
              ],
            },
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Background Color',
              defaultValue: '#1A2380',
            },
          ],
        },
        // Text Section Block
        {
          slug: 'textSection',
          labels: {
            singular: 'Text Section',
            plural: 'Text Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
            },
            {
              name: 'content',
              type: 'textarea',
              label: 'Content',
            },
            {
              name: 'textAlign',
              type: 'select',
              label: 'Text Alignment',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
                { label: 'Right', value: 'right' },
              ],
              defaultValue: 'center',
            },
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Background Color',
              defaultValue: 'white',
            },
          ],
        },
        // Service Cards Block
        {
          slug: 'serviceCards',
          labels: {
            singular: 'Service Cards Section',
            plural: 'Service Cards Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Section Subtitle',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Section Description',
            },
            {
              name: 'cards',
              type: 'array',
              label: 'Service Cards',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Card Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Card Description',
                },
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon Name (Lucide React)',
                  admin: {
                    description: 'Use Lucide React icon names like: Shield, ThumbsUp, FileText',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Card Image (optional)',
                },
              ],
            },
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Background Color',
              defaultValue: '#1A2380',
            },
            {
              name: 'textColor',
              type: 'text',
              label: 'Text Color',
              defaultValue: 'white',
            },
          ],
        },
        // Pricing Package Block
        {
          slug: 'pricingPackages',
          labels: {
            singular: 'Pricing Packages Section',
            plural: 'Pricing Packages Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
            },
            {
              name: 'packages',
              type: 'array',
              label: 'Pricing Packages',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Package Name',
                },
                {
                  name: 'badge',
                  type: 'text',
                  label: 'Package Badge',
                },
                {
                  name: 'price',
                  type: 'text',
                  label: 'Price Display',
                },
                {
                  name: 'priceNote',
                  type: 'text',
                  label: 'Price Note',
                },
                {
                  name: 'features',
                  type: 'array',
                  label: 'Package Features',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                      required: true,
                      label: 'Feature Text',
                    },
                  ],
                },
                {
                  name: 'ctaButton',
                  type: 'group',
                  label: 'CTA Button',
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      label: 'Button Text',
                    },
                    {
                      name: 'link',
                      type: 'text',
                      label: 'Button Link',
                    },
                    {
                      name: 'color',
                      type: 'text',
                      label: 'Button Color',
                      defaultValue: '#1A2380',
                    },
                  ],
                },
                {
                  name: 'contactInfo',
                  type: 'textarea',
                  label: 'Contact Information',
                },
                {
                  name: 'isVisible',
                  type: 'checkbox',
                  label: 'Show Package',
                  defaultValue: true,
                },
              ],
            },
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Background Color',
              defaultValue: '#f7f7f7',
            },
          ],
        },
      ],
      admin: {
        description: 'Use content blocks to build your page layout',
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