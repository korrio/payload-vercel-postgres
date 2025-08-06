import payload from 'payload';
import config from '../payload.config.js';

const homePageData = {
  title: "หน้าแรก - Best Franchise Thailand",
  pageType: "homepage",
  slug: "home",
  contentBlocks: [
    {
      blockType: "hero",
      title: "แพลตฟอร์มค้นหาแฟรนไชส์และเซ้ง/เช่าพื้นที่ขายของ",
      subtitle: "ค้นหาแฟรนไชส์และสถานที่เซ้งเช่าที่เหมาะกับคุณได้ที่นี่",
      description: "เลือกจากแฟรนไชส์และสถานที่เช่าหลากหลายประเภทที่ตรงกับความต้องการของคุณ",
      backgroundColor: "#0c1f6c",
      textColor: "#ffffff",
      tabBackgroundColor: "#ffffff",
      ctaButton: {
        text: "เริ่มค้นหาเลย",
        link: "#search",
        color: "#ff6b35"
      }
    },
    {
      blockType: "textSection",
      title: "อันดับ 1 เว็บแฟรนไชส์ที่นักลงทุนและเจ้าของแฟรนไชส์ไว้วางใจ",
      content: JSON.stringify({
        html: `<div class='statistics-data'>
          <div class='stat-item'>
            <div class='stat-number'>2050</div>
            <div class='stat-label'>จำนวนผู้ชม</div>
          </div>
        </div>`
      }),
      backgroundColor: "#0c1f6c",
      textColor: "#ffffff",
      viewerCount: 2050,
      viewerLabel: "จำนวนผู้ชม",
      franchiseLabel: "จำนวนแฟรนไชส์",
      branchLabel: "จำนวนสถานที่เช่า/เซ้ง"
    },
    {
      blockType: "pricingPackages",
      title: "ลงโฆษณากับ Best Franchise Thailand",
      subtitle: "เลือกแพ็คเกจที่เหมาะสมกับความต้องการของคุณ",
      backgroundColor: "#0c1f6c",
      textColor: "#ffffff",
      packages: [
        {
          name: "แพ็คเกจพื้นฐาน",
          badge: "ยอดนิยม",
          price: "699",
          priceNote: "บาท/เดือน",
          contactInfo: "ติดต่อเราสำหรับข้อมูลเพิ่มเติม",
          isVisible: true,
          features: [
            { feature: "โพสต์โฆษณาแฟรนไชส์ได้ไม่จำกัด" },
            { feature: "แสดงผลในหน้าหลักและหมวดหมู่" },
            { feature: "รองรับการอัพโหลดรูปภาพและวิดีโอ" },
            { feature: "ระบบแจ้งเตือนเมื่อมีผู้สนใจ" },
            { feature: "เครื่องมือจัดการโฆษณา" }
          ],
          ctaButton: {
            text: "เริ่มใช้งาน",
            link: "/contact",
            color: "#ff6b35"
          }
        }
      ]
    }
  ],
  meta: {
    title: "Best Franchise Thailand - อันดับ 1 เว็บแฟรนไชส์ที่นักลงทุนและเจ้าของแฟรนไชส์ไว้วางใจ",
    description: "แพลตฟอร์มค้นหาแฟรนไชส์และเซ้ง/เช่าพื้นที่ขายของที่นักลงทุนและเจ้าของแฟรนไชส์ไว้วางใจ"
  }
};

async function seedHomePage() {
  try {
    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: true, // Important: This allows us to bypass API and work directly with the database
      config,
    });

    console.log('Payload initialized');

    // Check if home page already exists
    const existingPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
    });

    let result;
    
    if (existingPages.docs.length > 0) {
      // Update existing home page
      console.log('Updating existing home page...');
      result = await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: homePageData,
      });
      console.log('Home page updated successfully:', result.id);
    } else {
      // Create new home page
      console.log('Creating new home page...');
      result = await payload.create({
        collection: 'pages',
        data: homePageData,
      });
      console.log('Home page created successfully:', result.id);
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding home page:', error);
    process.exit(1);
  }
}

seedHomePage();