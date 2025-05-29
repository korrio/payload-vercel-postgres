import type { CollectionConfig } from 'payload'

// import { slugField } from '@/fields/slug'

export const Banners: CollectionConfig = {
  slug: 'banners',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'client', 'startDate', 'endDate', 'status'],
    group: 'การจัดการโฆษณา',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'ชื่อแบนเนอร์',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      label: 'ลูกค้า',
      required: true,
    },
    {
      name: 'location',
      type: 'select',
      label: 'ตำแหน่งบนเว็บไซต์',
      required: true,
      options: [
        {
          label: 'หน้าแรก - ด้านบน',
          value: 'home_top',
        },
        {
          label: 'หน้าแรก - ด้านข้าง',
          value: 'home_sidebar',
        },
        {
          label: 'หน้าแรก - ด้านล่าง',
          value: 'home_bottom',
        },
        {
          label: 'หน้า Franchise - ด้านบน',
          value: 'franchise_top',
        },
        {
          label: 'หน้า Franchise - ด้านข้าง',
          value: 'franchise_sidebar',
        },
        {
          label: 'หน้า Market - ด้านบน',
          value: 'market_top',
        },
        {
          label: 'หน้า Market - ด้านข้าง',
          value: 'market_sidebar',
        },
        {
          label: 'หน้าบทความ - ด้านบน',
          value: 'article_top',
        },
        {
          label: 'หน้าบทความ - ระหว่างเนื้อหา',
          value: 'article_content',
        },
        {
          label: 'หน้าบทความ - ด้านข้าง',
          value: 'article_sidebar',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'รูปภาพแบนเนอร์',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      label: 'ลิงก์ปลายทาง',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'วันที่เริ่มแสดง',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'วันที่สิ้นสุดการแสดง',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'สถานะ',
      defaultValue: 'draft',
      options: [
        {
          label: 'แบบร่าง',
          value: 'draft',
        },
        {
          label: 'เผยแพร่',
          value: 'published',
        },
        {
          label: 'สิ้นสุด',
          value: 'expired',
        },
      ],
    },
    {
      name: 'priority',
      type: 'number',
      label: 'ลำดับความสำคัญ',
      min: 1,
      max: 100,
      defaultValue: 50,
      admin: {
        description: 'ค่าสูง = แสดงก่อน (สำหรับตำแหน่งที่มีแบนเนอร์หลายชิ้น)',
      },
    },
    // {
    //   name: 'views',
    //   type: 'number',
    //   label: 'จำนวนการแสดงผล',
    //   defaultValue: 0,
    //   admin: {
    //     readOnly: true,
    //   },
    // },
    // {
    //   name: 'clicks',
    //   type: 'number',
    //   label: 'จำนวนคลิก',
    //   defaultValue: 0,
    //   admin: {
    //     readOnly: true,
    //   },
    // },
    /*     {
      name: 'dimensions',
      type: 'group',
      label: 'ขนาดแบนเนอร์',
      fields: [
        {
          name: 'width',
          type: 'number',
          label: 'ความกว้าง (px)',
          required: true,
        },
        {
          name: 'height',
          type: 'number',
          label: 'ความสูง (px)',
          required: true,
        },
      ],
    }, */
    {
      name: 'notes',
      type: 'textarea',
      label: 'บันทึกเพิ่มเติม',
    },
    // ...slugField(),
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // ตรวจสอบวันที่สิ้นสุดและอัพเดทสถานะอัตโนมัติ
        const today = new Date();
        const endDate = new Date(data.endDate);

        if (endDate < today && data.status === 'published') {
          data.status = 'expired';
        }

        return data;
      },
    ],
    // afterRead: [
    //   async ({ doc, req }) => {
    //     // Only increment for frontend requests, not in admin panel
    //     if (req.user?.collection !== 'users') {
    //       try {
    //         // Increment asynchronously without waiting
    //         req.payload.update({
    //           collection: 'banners',
    //           id: doc.id,
    //           data: {
    //             views: (doc.views || 0) + 1
    //           }
    //         });
    //       } catch (error) {
    //         console.error('Failed to increment pageview in hook:', error);
    //       }
    //     }
    //     return doc;
    //   }
    // ]
  },
  
}
