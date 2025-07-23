import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Information',
  admin: {
    group: 'การจัดการหน้า',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyInfo',
      type: 'group',
      label: 'Company Information',
      fields: [
        {
          name: 'companyName',
          type: 'text',
          label: 'Company Name',
          defaultValue: 'บริษัท เฟรนไชน์ จำกัด',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
          defaultValue: '2525 อาคารเอฟวายไอ เซ็นเตอร์ อาคาร 2 ชั้น 12 ยูนิต 2/1201-2/1202 ถนนพระรามที่ 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          defaultValue: '+66 (02) 001-5855 (เปิดทุกวัน 24 ชั่วโมง)',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          defaultValue: 'cs@franchise.com',
          required: true,
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'line',
          type: 'text',
          label: 'LINE Official Account',
          defaultValue: 'https://shop.line.me/@linehoro',
          admin: {
            description: 'LINE Official Account URL',
          },
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook Page',
          defaultValue: 'https://www.facebook.com/bestfranchisethailand',
          admin: {
            description: 'Facebook page URL',
          },
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok Account',
          defaultValue: 'http://tiktok.com/@bestfranchisethailand',
          admin: {
            description: 'TikTok account URL',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram Account',
          admin: {
            description: 'Instagram account URL (optional)',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube Channel',
          admin: {
            description: 'YouTube channel URL (optional)',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X Account',
          admin: {
            description: 'Twitter/X account URL (optional)',
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'group',
      label: 'Location & Map',
      fields: [
        {
          name: 'mapEmbed',
          type: 'textarea',
          label: 'Google Maps Embed Code',
          defaultValue: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.96241924154!2d100.55742897548679!3d13.720725098011444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f108d5e48a5%3A0xaeacc1782272b03f!2sFYI%20Center!5e0!3m2!1sen!2sth!4v1753284339552!5m2!1sen!2sth" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
          admin: {
            description: 'Google Maps iframe embed code',
          },
        },
        {
          name: 'coordinates',
          type: 'group',
          label: 'GPS Coordinates',
          fields: [
            {
              name: 'latitude',
              type: 'number',
              label: 'Latitude',
              defaultValue: 13.720725098011444,
              admin: {
                description: 'GPS Latitude coordinate',
              },
            },
            {
              name: 'longitude',
              type: 'number',
              label: 'Longitude',
              defaultValue: 100.55742897548679,
              admin: {
                description: 'GPS Longitude coordinate',
              },
            },
          ],
        },
        {
          name: 'googleMapsLink',
          type: 'text',
          label: 'Google Maps Direct Link',
          admin: {
            description: 'Direct link to Google Maps location',
          },
        },
      ],
    },
    {
      name: 'businessHours',
      type: 'group',
      label: 'Business Hours',
      fields: [
        {
          name: 'description',
          type: 'text',
          label: 'Hours Description',
          defaultValue: 'เปิดทุกวัน 24 ชั่วโมง',
        },
        {
          name: 'weekdays',
          type: 'group',
          label: 'Weekdays (Monday - Friday)',
          fields: [
            {
              name: 'open',
              type: 'text',
              label: 'Opening Time',
              defaultValue: '00:00',
            },
            {
              name: 'close',
              type: 'text',
              label: 'Closing Time',
              defaultValue: '23:59',
            },
          ],
        },
        {
          name: 'weekends',
          type: 'group',
          label: 'Weekends (Saturday - Sunday)',
          fields: [
            {
              name: 'open',
              type: 'text',
              label: 'Opening Time',
              defaultValue: '00:00',
            },
            {
              name: 'close',
              type: 'text',
              label: 'Closing Time',
              defaultValue: '23:59',
            },
          ],
        },
        {
          name: 'holidays',
          type: 'text',
          label: 'Holiday Hours',
          defaultValue: 'เปิดทุกวัน รวมวันหยุด',
          admin: {
            description: 'Business hours during holidays',
          },
        },
      ],
    },
    {
      name: 'additionalInfo',
      type: 'group',
      label: 'Additional Information',
      fields: [
        {
          name: 'contactForm',
          type: 'checkbox',
          label: 'Enable Contact Form',
          defaultValue: true,
          admin: {
            description: 'Show contact form on contact page',
          },
        },
        {
          name: 'supportLanguages',
          type: 'select',
          label: 'Support Languages',
          hasMany: true,
          options: [
            {
              label: 'ไทย (Thai)',
              value: 'th',
            },
            {
              label: 'English',
              value: 'en',
            },
            {
              label: '中文 (Chinese)',
              value: 'zh',
            },
            {
              label: '日本語 (Japanese)',
              value: 'ja',
            },
          ],
          defaultValue: ['th', 'en'],
        },
        {
          name: 'departments',
          type: 'array',
          label: 'Contact Departments',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Department Name',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
              label: 'Department Email',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Department Phone',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Department Description',
            },
          ],
          admin: {
            initCollapsed: true,
            description: 'Different departments for specific inquiries',
          },
        },
        {
          name: 'emergencyContact',
          type: 'group',
          label: 'Emergency Contact',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Emergency Phone',
              admin: {
                description: 'Emergency contact number',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'Emergency Email',
              admin: {
                description: 'Emergency contact email',
              },
            },
          ],
        },
      ],
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
        condition: (data) => !!data?.updatedBy,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (req.user) {
          data.updatedBy = req.user.id;
          return data;
        }
      },
    ],
  },
}

export default Contact