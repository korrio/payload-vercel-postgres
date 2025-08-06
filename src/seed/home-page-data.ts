export const homePageData = {
  title: "หน้าแรก - Best Franchise Thailand",
  pageType: "homepage",
  slug: "home",
  excerpt: "แพลตฟอร์มค้นหาแฟรนไชส์และเซ้ง/เช่าพื้นที่ขายของที่นักลงทุนและเจ้าของแฟรนไชส์ไว้วางใจ",
  content: `แพลตฟอร์มค้นหาแฟรนไชส์และเซ้ง/เช่าพื้นที่ขายของที่ดีที่สุด

ฟีเจอร์หลัก:
- ค้นหาแฟรนไชส์ที่เหมาะสมกับงบลงทุนของคุณ
- ค้นหาสถานที่เซ้งเช่าที่ตรงใจ  
- สถิติแฟรนไชส์และผู้ใช้งานที่เชื่อถือได้
- ราคาโฆษณาเพียง 699 บาทต่อเดือน`,
  contentBlocks: [
    // Hero block for SearchForm content
    {
      blockType: "hero",
      title: "แพลตฟอร์มค้นหาแฟรนไชส์และเซ้ง/เช่าพื้นที่ขายของ",
      subtitle: "ค้นหาแฟรนไชส์และสถานที่เซ้งเช่าที่เหมาะกับคุณได้ที่นี่",
      description: "เว็บไซต์รวมแฟรนไชส์และพื้นที่เช่าที่ครบครันที่สุดในประเทศไทย",
      backgroundColor: "#0c1f6c",
      ctaButton: {
        text: "เริ่มค้นหาเลย",
        link: "#search"
      }
    },
    // Text section for FranchiseStatistics content
    {
      blockType: "textSection",
      title: "อันดับ 1 เว็บแฟรนไชส์ที่นักลงทุนและเจ้าของแฟรนไชส์ไว้วางใจ",
      content: `{
        "html": "<div class='statistics-data'><div class='stat-item'><h3>2,050</h3><p>จำนวนผู้ชม</p></div><div class='stat-item'><h3 data-source='franchise-count'>-</h3><p>จำนวนแฟรนไชส์</p></div><div class='stat-item'><h3 data-source='branch-count'>-</h3><p>จำนวนสถานที่เช่า/เซ้ง</p></div></div>"
      }`,
      textAlign: "center",
      backgroundColor: "#0c1f6c"
    },
    // Pricing package for PricingSection content
    {
      blockType: "pricingPackages",
      title: "ลงโฆษณากับ Best Franchise Thailand",
      backgroundColor: "#0c1f6c",
      packages: [
        {
          name: "แพ็คเกจพื้นฐาน",
          badge: "ยอดนิยม",
          price: "699",
          priceNote: "บาท/เดือน",
          contactInfo: "สำหรับเจ้าของแฟรนไชส์",
          isVisible: true,
          features: [
            { feature: "โพสต์แฟรนไชส์ได้ไม่จำกัด" },
            { feature: "แสดงผลในหน้าแรก" },
            { feature: "รายงานสถิติการเข้าชม" },
            { feature: "การสนับสนุนลูกค้า 24/7" },
            { feature: "เครื่องมือจัดการแฟรนไชส์" },
            { feature: "การส่งเสริมการขายพิเศษ" }
          ],
          ctaButton: {
            text: "เริ่มต้นใช้งาน",
            link: "/register",
            color: "#bd2516"
          }
        }
      ]
    }
  ],
  meta: {
    title: "Best Franchise Thailand - อันดับ 1 เว็บแฟรนไชส์ที่นักลงทุนและเจ้าของแฟรนไชส์ไว้วางใจ",
    description: "แพลตฟอร์มค้นหาแฟรนไชส์และเซ้ง/เช่าพื้นที่ขายของที่นักลงทุนและเจ้าของแฟรนไชส์ไว้วางใจ พร้อมข้อมูลครบถ้วนและโอกาสทางธุรกิจที่ดีที่สุด",
    image: null
  },
  status: "published"
}