// src/collections/Markets.js
import type { CollectionConfig } from 'payload'
// import { slugField } from '@/fields/slug'

export const Markets: CollectionConfig = {
  slug: 'markets',
  admin: {
    useAsTitle: 'title',
    // defaultColumns: ['name.th', , 'business_hours.description.th', 'published'],
    defaultColumns: ['title', 'slug', 'updatedAt','published'],
    group: 'การจัดการข้อมูล',
  },
  access: {
    read: () => true,
  },
  fields: [
    // แท็บแบ่งกลุ่มฟิลด์
    {
      type: 'tabs',
      tabs: [
        {
          label: 'ข้อมูลทั่วไป',
          fields: [
            // Meta Information
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'slug',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'URL Slug สำหรับตลาด',
                  },
                },
                // {
                //   name: 'title',
                //   type: 'text',
                //   required: true,
                //   admin: {
                //     description: 'ชื่อ SEO สำหรับหน้าตลาด',
                //   },
                // },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'คำอธิบาย SEO สำหรับหน้าตลาด',
                  },
                },
              ],
            },

            {
		      name: 'title',
		      type: 'text',
		      required: true,
		    },
            
            // Name (Multilingual)
            {
              name: 'name',
              type: 'group',
              fields: [
                {
                  name: 'th',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'ชื่อตลาดภาษาไทย',
                  },
                },
                {
                  name: 'en',
                  type: 'text',
                  admin: {
                    description: 'ชื่อตลาดภาษาอังกฤษ (ไม่บังคับ)',
                  },
                },
              ],
            },
            
            // Tags (Multilingual)
            {
              name: 'tags',
              type: 'group',
              fields: [
                {
                  name: 'th',
                  type: 'array',
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                    },
                  ],
                  admin: {
                    description: 'แท็กของตลาดภาษาไทย',
                  },
                },
                {
                  name: 'en',
                  type: 'array',
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                    },
                  ],
                  admin: {
                    description: 'แท็กของตลาดภาษาอังกฤษ',
                  },
                },
              ],
            },
            
            // Business Hours
            {
              name: 'business_hours',
              type: 'group',
              fields: [
                {
                  name: 'description',
                  type: 'group',
                  fields: [
                    {
                      name: 'th',
                      type: 'text',
                      required: false,
                    },
                    {
                      name: 'en',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'open',
                  type: 'number',
                  admin: {
                    description: 'เวลาเปิด (รูปแบบ 24 ชั่วโมง)',
                  },
                },
                {
                  name: 'close',
                  type: 'number',
                  admin: {
                    description: 'เวลาปิด (รูปแบบ 24 ชั่วโมง)',
                  },
                },
                {
                  name: 'days',
                  type: 'select',
                  hasMany: true,
                  options: [
                    { label: 'จันทร์', value: "1" },
                    { label: 'อังคาร', value: "2" },
                    { label: 'พุธ', value: "3" },
                    { label: 'พฤหัสบดี', value: "4" },
                    { label: 'ศุกร์', value: "5" },
                    { label: 'เสาร์', value: "6" },
                    { label: 'อาทิตย์', value: "7" },
                  ],
                },
              ],
            },
          ],
        },
        
        {
          label: 'ที่ตั้งและที่อยู่',
          fields: [
            // Address Information
            {
              name: 'address',
              type: 'group',
              fields: [
                {
                  name: 'place_id',
                  type: 'text',
                  admin: {
                    description: 'รหัสสถานที่บน Google Maps',
                  },
                },
                {
                  name: 'country_code',
                  type: 'text',
                  defaultValue: 'TH',
                  admin: {
                    description: 'รหัสประเทศ ISO (ค่าเริ่มต้น: TH)',
                  },
                },
                {
                  name: 'territory_id',
                  type: 'text',
                },
                {
                  name: 'district',
                  type: 'text',
                },
                {
                  name: 'district_id',
                  type: 'number',
                },
                {
                  name: 'sub_district',
                  type: 'text',
                },
                {
                  name: 'sub_district_id',
                  type: 'number',
                },
                {
                  name: 'province',
                  type: 'text',
                },
                {
                  name: 'province_id',
                  type: 'number',
                },
                {
                  name: 'post_code',
                  type: 'number',
                },
                {
                  name: 'detail',
                  type: 'group',
                  fields: [
                    {
                      name: 'th',
                      type: 'textarea',
                      required: false,
                    },
                    {
                      name: 'en',
                      type: 'textarea',
                    },
                  ],
                },
                // {
                //   name: 'location',
                //   type: 'group',
                //   fields: [
                //     {
                //       name: 'type',
                //       type: 'select',
                //       defaultValue: 'Point',
                //       options: [
                //         {
                //           label: 'Point',
                //           value: 'Point',
                //         },
                //       ],
                //     },
                //     {
                //       name: 'coordinates',
                //       type: 'array',
                //       fields: [
                //         {
                //           name: 'coordinate',
                //           type: 'number',
                //           required: false,
                //         },
                //       ],
                //       admin: {
                //         description: 'พิกัดในรูปแบบ [ลองจิจูด, ละติจูด]',
                //       },
                //     },
                //   ],
                // },
                {
                  name: 'maps_url',
                  type: 'text',
                  admin: {
                    description: 'ลิงก์ Google Maps สำหรับการนำทางโดยตรง',
                  },
                },
                {
                  name: 'maps_embed_url',
                  type: 'text',
                  admin: {
                    description: 'ลิงก์ Google Maps สำหรับฝัง iframe',
                  },
                },
              ],
            },
          ],
        },
        
        {
          label: 'รูปภาพและสื่อ',
          fields: [
            // Media
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'รูปภาพหน้าปกของตลาด',
              },
            },
            {
                  name: 'coverUrl',
                  type: 'text',
                  admin: {
                    description: 'coverUrl',
                  },
                },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                },
              ],
              admin: {
                description: 'แกลเลอรีรูปภาพของตลาด',
              },
            },
            // {
            //   name: 'logo',
            //   type: 'upload',
            //   label: 'Logo',
            //   relationTo: 'media',
            //   admin: {
            //     description: 'Upload franchise logo',
            //   },
            // },
            {
              name: 'images',
              type: 'array',
              label: 'Franchise Images',
              admin: {
                description: 'Upload images related to this franchise',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: false,
                },
                {
                  name: 'alt',
                  type: 'text',
                  label: 'Alt Text',
                },
              ],
            },
            {
              name: 'galleryUrl',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'text',
                  required: false,
                },
              ],
              admin: {
                description: 'แกลเลอรีรูปภาพของตลาด',
              },
            },
          ],
        },
{
          label: 'ราคา',
          fields: [
            
        {
          name: 'price_text',
          type: 'text',
          required: true,
        },
      ]},
        
        {
          label: 'แผงค้า',
          fields: [
            // Price Information
            {
              name: 'price',
              type: 'group',
              fields: [
                {
                  name: 'description',
                  type: 'group',
                  fields: [
                    {
                      name: 'th',
                      type: 'text',
                      required: false,
                    },
                    {
                      name: 'en',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'month',
                  type: 'group',
                  fields: [
                    {
                      name: 'min',
                      type: 'number',
                    },
                    {
                      name: 'max',
                      type: 'number',
                    },
                  ],
                },
              ],
            },
            
            // Booth Size
            {
              name: 'booth_size',
              type: 'group',
              fields: [
                {
                  name: 'description',
                  type: 'group',
                  fields: [
                    {
                      name: 'th',
                      type: 'text',
                      required: false,
                    },
                    {
                      name: 'en',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'sqm',
                  type: 'group',
                  fields: [
                    {
                      name: 'min',
                      type: 'number',
                    },
                    {
                      name: 'max',
                      type: 'number',
                    },
                  ],
                },
              ],
            },
            
            // Booth Information
            {
              name: 'booth_summary',
              type: 'group',
              fields: [
                {
                  name: 'available',
                  type: 'number',
                  admin: {
                    description: 'จำนวนแผงค้าที่ว่าง',
                  },
                },
                {
                  name: 'total',
                  type: 'number',
                  admin: {
                    description: 'จำนวนแผงค้าทั้งหมด',
                  },
                },
              ],
            },
            
            // Booths
            {
              name: 'booths',
              type: 'array',
              fields: [
                {
                  name: 'id',
                  type: 'text',
                  required: false,
                },
                {
                  name: 'market',
                  type: 'relationship',
                  relationTo: 'markets',
                  required: false,
                },
                {
                  name: 'price',
                  type: 'group',
                  fields: [
                    {
                      name: 'month',
                      type: 'number',
                      required: false,
                      admin: {
                        description: 'ค่าเช่ารายเดือน (บาท)',
                      },
                    },
                    {
                      name: 'entrance_fee',
                      type: 'number',
                      admin: {
                        description: 'ค่าแรกเข้าครั้งเดียว (บาท)',
                      },
                    },
                    {
                      name: 'insurance',
                      type: 'number',
                      admin: {
                        description: 'เงินประกัน (บาท)',
                      },
                    },
                    {
                      name: 'advance_rental',
                      type: 'number',
                      admin: {
                        description: 'ค่าเช่าล่วงหน้า (บาท)',
                      },
                    },
                    {
                      name: 'other_expenses',
                      type: 'number',
                      admin: {
                        description: 'ค่าใช้จ่ายอื่นๆ (บาท)',
                      },
                    },
                    {
                      name: 'water_bill',
                      type: 'number',
                      admin: {
                        description: 'อัตราค่าน้ำ (บาท)',
                      },
                    },
                    {
                      name: 'electricity_bill',
                      type: 'number',
                      admin: {
                        description: 'อัตราค่าไฟฟ้า (บาท/หน่วย)',
                      },
                    },
                  ],
                },
                {
                  name: 'status',
                  type: 'select',
                  options: [
                    { label: 'ว่าง', value: 'AVAILABLE' },
                    { label: 'มีผู้เช่าแล้ว', value: 'OCCUPIED' },
                    { label: 'จองแล้ว', value: 'RESERVED' },
                    { label: 'อยู่ระหว่างซ่อมบำรุง', value: 'MAINTENANCE' },
                  ],
                  defaultValue: 'AVAILABLE',
                  required: false,
                },
              ],
            },
          ],
        },
        
        {
          label: 'สิ่งอำนวยความสะดวก',
          fields: [
            // Facilities
            {
              name: 'facility',
              type: 'group',
              fields: [
                {
                  name: 'parking',
                  type: 'number',
                  admin: {
                    description: 'จำนวนที่จอดรถ',
                  },
                },
                {
                  name: 'toilet',
                  type: 'number',
                  admin: {
                    description: 'จำนวนห้องน้ำ',
                  },
                },
              ],
            },
            
            // Highlight Relation
            // {
            //   name: 'highlight',
            //   type: 'relationship',
            //   relationTo: 'highlights',
            //   hasMany: true,
            //   admin: {
            //     description: 'คุณสมบัติเด่นที่เกี่ยวข้อง',
            //   },
            // },
          ],
        },
        
        {
          label: 'โปรโมชันและการจัดอันดับ',
          fields: [
            // Rating
            {
              name: 'rating',
              type: 'group',
              fields: [
                {
                  name: 'score',
                  type: 'number',
                  min: 0,
                  max: 5,
                  admin: {
                    description: 'คะแนนการให้คะแนน (0-5)',
                  },
                },
                {
                  name: 'count',
                  type: 'number',
                  admin: {
                    description: 'จำนวนการให้คะแนน',
                  },
                },
              ],
            },
            
            // Promotions
            {
              name: 'promotions',
              type: 'array',
              fields: [
                {
                  name: 'id',
                  type: 'text',
                },
                {
                  name: 'name',
                  type: 'group',
                  fields: [
                    {
                      name: 'th',
                      type: 'text',
                    },
                    {
                      name: 'en',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    { label: 'ส่วนลดเป็นเปอร์เซ็นต์', value: 'PERCENTAGE_DISCOUNT' },
                    { label: 'ส่วนลดเป็นจำนวนเงิน', value: 'FIXED_AMOUNT_DISCOUNT' },
                    { label: 'ของแถมฟรี', value: 'FREE_GIFT' },
                  ],
                },
                {
                  name: 'discount_value',
                  type: 'number',
                },
                {
                  name: 'start_date',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                  },
                },
                {
                  name: 'end_date',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                  },
                },
                {
                  name: 'active',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
            },
          ],
        },
        
        {
          label: 'การเผยแพร่และการติดตาม',
          fields: [
            // Publishing Options
            {
              name: 'hot',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'ทำเครื่องหมายเป็นตลาดยอดนิยม',
              },
            },
            {
              name: 'published',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'เปิดใช้งานเพื่อเผยแพร่ตลาดนี้',
              },
            },
            {
              name: 'published_at',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
                description: 'วันและเวลาที่เผยแพร่',
              },
            },
            {
              name: 'tracking',
              type: 'group',
              fields: [
                {
                  name: 'click',
                  type: 'number',
                  admin: {
                    description: 'จำนวนคลิก/การเข้าชม',
                  },
                },
              ],
            },
            
            // Relations
            // {
            //   name: 'users',
            //   type: 'relationship',
            //   relationTo: 'users',
            //   hasMany: true,
            //   admin: {
            //     description: 'ผู้ใช้ที่เกี่ยวข้อง (เช่น เจ้าของตลาด ผู้จัดการ)',
            //   },
            // },
            {
              name: 'created_at',
              type: 'date',
              admin: {
                readOnly: true,
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'updated_at',
              type: 'date',
              admin: {
                readOnly: true,
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
        },
      ],
    },
    // ...slugField(),
  ],
  hooks: {
    // beforeChange: [
    //   ({ data }) => {
    //     const now = new Date();
        
    //     // Update timestamps
    //     if (!data.created_at) {
    //       data.created_at = now;
    //     }
        
    //     data.updated_at = now;
        
    //     return data;
    //   },
    // ],
    beforeChange: [
      ({ req, operation, data }) => {
        if (req.user) {
          if (operation === 'create') {
            data.updatedBy = req.user.id;
            data.createdBy = req.user.id;
          } else if (operation === 'update') {
            data.updatedBy = req.user.id;
          }
          return data;
        }

                const now = new Date();
        
        // Update timestamps
        if (!data.created_at) {
          data.created_at = now;
        }
        
        data.updated_at = now;
      },
    ]
  },
};

export default Markets;