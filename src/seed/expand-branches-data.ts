export const expandBranchesPageData = {
  title: "ขยายสาขาธุรกิจ",
  slug: "expand-branches",
  pageType: "expand-branches-page" as const,
  excerpt: "บริการช่วยขยายสาขาธุรกิจแฟรนไชส์ทั้งในประเทศและไปยังต่างประเทศ ค่าบริการเริ่มต้น 15,000 บาท/ปี",
  status: "published" as const,
  meta: {
    title: "ขยายสาขาธุรกิจ - Best Franchise Thailand",
    description: "บริการช่วยขยายสาขาธุรกิจแฟรนไชส์ทั้งในประเทศและไปยังต่างประเทศ ค่าบริการเริ่มต้น 15,000 บาท/ปี พร้อมทีมการตลาดออนไลน์และพนักงานขายมืออาชีพ"
  },
  contentBlocks: [
    // Hero Block
    {
      blockType: "hero" as const,
      title: "เราคือผู้ช่วยขยายสาขาธุรกิจของคุณ",
      subtitle: "Best Franchise Thailand บริการช่วยขยายสาขาธุรกิจแฟรนไชส์ทั้งในประเทศและไปยังต่างประเทศ",
      pricing: "ค่าบริการเริ่มต้น 15,000 บาท/ปี",
      ctaButton: {
        text: "สมัครขอรับบริการ",
        link: "#brandregister"
      },
      backgroundColor: "#1A2380"
    },
    
    // One-Stop Service Section
    {
      blockType: "textSection" as const,
      title: "One-Stop Service",
      content: {
        html: "<p>Best Franchise Thailand ผู้ช่วยขยายสาขาธุรกิจแฟรนไชส์ของคุณที่แรกและที่เดียวในไทย<br />เริ่มต้น เพียง 15,000 บาท/ปี<br />ได้ครบทั้งทีมการตลาดออนไลน์ + พนักงานขายแฟรนไชส์มืออาชีพ</p>"
      },
      textAlign: "center",
      backgroundColor: "white"
    },
    
    // Pricing Package - FB PRO (Only visible package)
    {
      blockType: "pricingPackages" as const,
      packages: [
        {
          name: "ค่าบริการ",
          badge: "ราคาพิเศษ",
          priceNote: "ค่าบริการการขาย",
          features: [
            { feature: "นำเสนอแบรนด์" },
            { feature: "การตลาดส่วนกลาง" },
            { feature: "จัดทำเว็ปไซต์" },
            { feature: "จัดทำมุมมองเชิงกลยุทธ์" },
            { feature: "การสร้างแบบจำลองธุรกิจเพื่อขยายแฟรนไชส์" },
            { feature: "การเจรจาต่อรอง" },
            { feature: "ปิดการขายแฟรนไชส์ให้" },
            { feature: "Social Media Management (Content Marketing) 3 เดือน" },
            { feature: "Facebook Ads Credits 3 เดือน" },
            { feature: "Facebook Ads Management Service 3 เดือน" },
            { feature: "12 Contents + Credit 30,000 THB" },
            { feature: "จำนวนโพส และค่าเครดิตจะแตกต่างกันในแต่ละแพ็กเกจ สอบถามเพิ่มเติม" }
          ],
          ctaButton: {
            text: "ลงทะเบียน",
            link: "#brandregister",
            color: "#bd2516"
          },
          isVisible: true
        }
      ],
      backgroundColor: "#f7f7f7"
    },
    
    // Services Section Header
    {
      blockType: "textSection" as const,
      title: "One-Stop Service",
      content: {
        html: "<h2 class='text-3xl font-bold mb-4'>พัฒนาธุรกิจแฟรนไชส์ ครบจบในที่เดียว</h2><p class='max-w-3xl mx-auto'>โดยจะดูแลและให้คำปรึกษาตั้งแต่ การรับปรึกษาธุรกิจ SMEs, การสร้างแบรนด์, การพัฒนาธุรกิจให้เป็นระบบแฟรนไชส์, การทำการตลาดออนไลน์ ไปจนถึงการบริการขยายแฟรนไชส์และการปิดการขายให้กับนักลงทุน</p><h3 class='text-xl font-bold mb-2 mt-8'>A Step-By-Step Roadmap To Success</h3><h2 class='text-3xl font-bold'>สิ่งที่เราจัดการให้คุณ</h2>"
      },
      textAlign: "center",
      backgroundColor: "#ffffff"
    },
    
    // Service Cards - First Row
    {
      blockType: "serviceCards" as const,
      cards: [
        {
          title: "พัฒนาธุรกิจให้เป็นระบบแฟรนไชส์",
          description: {
            html: "<p>จัดทำ Business Concept<br />จัดทำมุมมองเชิงกลยุทธ์<br />การวิเคราะห์การแข่งขัน<br />จัดทำแพ็คเกจแฟรนไชส์ที่เหมาะสม และค่าธรรมเนียมแฟรนไชส์ที่เกี่ยวข้อง<br />สร้างแบบจำลองธุรกิจเพื่อขยายแฟรนไชส์</p>"
          }
        },
        {
          title: "นำเสนอแบรนด์",
          description: {
            html: "<p>จัดทำ Proposal/Company profile และนำเสนอแบรนด์ของคุณแบบมืออาชีพ</p>"
          }
        },
        {
          title: "การตลาด",
          description: {
            html: "<p>ทำการตลาดเพื่อดึงดูดนักลงทุนที่ต้องการซื้อแฟรนไชส์ หลากหลายช่องทาง</p>"
          }
        }
      ],
      backgroundColor: "white",
      textColor: "black"
    },
    
    // Service Cards - Second Row
    {
      blockType: "serviceCards" as const,
      cards: [
        {
          title: "จัดทำเว็ปไซต์",
          description: {
            html: "<p>ฟรี! ออกแบบ Microsite หนึ่งหน้า พร้อมฟังชั่น Drop Lead สำหรับผู้สนใจแฟรนไชส์</p>"
          }
        },
        {
          title: "บริการงานด้านกฎหมาย สัญญาแฟรนไชส์ ข้อตกลงทางกฎหมายที่สำคัญ",
          description: {
            html: "<p>• สัญญาแฟรนไชส์<br />• LOI / MOU ข้อตกลงแฟรนไชส์<br />• แบบฟอร์มใบสมัครแฟรนไชส์<br />• ออกหนังสือบอกกล่าวทวงถาม (Notice Letter)<br />• เครื่องหมายการค้า</p>"
          }
        },
        {
          title: "การเจรจาต่อรอง",
          description: {
            html: "<p>• ให้คำปรึกษาการลงทุนธุรกิจแฟรนไชส์พร้อมพื้นที่เปิดร้าน<br />• ต่อรองค่าเช่า<br />• จัดหาสินเชื่อ<br />• โครงสร้างของเงื่อนไขการชำระเงิน<br />• ข้อกำหนดอื่น ๆ ที่สำคัญ</p>"
          }
        }
      ],
      backgroundColor: "white",
      textColor: "black"
    }
  ]
};