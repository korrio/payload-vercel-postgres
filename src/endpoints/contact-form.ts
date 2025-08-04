export const submitContactForm = async (req: any) => {
  try {
    const { payload } = req
    
    // Read the request body
    const data = await req.json()
    const {
      name,
      email,
      phone,
      company,
      subject,
      message,
      inquiryType = 'general'
    } = data

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return Response.json({
        success: false,
        error: 'Missing required fields: name, email, subject, and message are required'
      }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 })
    }

    // Create the contact form entry
    const contactForm = await payload.create({
      collection: 'contact-forms',
      data: {
        name,
        email,
        phone: phone || '',
        company: company || '',
        subject,
        message,
        inquiryType,
        status: 'new',
        priority: 'normal',
        source: 'website',
        ipAddress: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown',
        userAgent: req.headers['user-agent'] || '',
        emailSent: false,
        autoResponded: false,
      }
    })

    // Send notification email to admin
    try {
      await payload.sendEmail({
        to: 'admin@bestfranchisethailand.com',
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #BD2516; border-bottom: 2px solid #BD2516; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="mailto:${email}" style="color: #BD2516; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">${phone}</td>
                </tr>
                ` : ''}
                ${company ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td>
                  <td style="padding: 8px 0; color: #333;">${company}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Inquiry Type:</td>
                  <td style="padding: 8px 0; color: #333;">${getInquiryTypeLabel(inquiryType)}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Subject</h3>
              <p style="color: #333; font-size: 16px; margin: 0 0 15px 0;">${subject}</p>
              
              <h3 style="color: #333;">Message</h3>
              <div style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>

            <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #666;">Technical Information</h4>
              <p style="margin: 5px 0; color: #666; font-size: 12px;">
                <strong>Submission ID:</strong> ${contactForm.id}<br>
                <strong>Submitted:</strong> ${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}<br>
                <strong>IP Address:</strong> ${req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'Unknown'}<br>
                <strong>User Agent:</strong> ${req.headers['user-agent'] || 'Unknown'}
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://cms.bestfranchisethailand.com'}/admin/collections/contact-forms/${contactForm.id}" 
                 style="background-color: #BD2516; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View in Admin Panel
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 12px; text-align: center;">
              This email was automatically generated from Best Franchise Thailand contact form.
            </p>
          </div>
        `,
      })

      // Update the contact form to mark email as sent
      await payload.update({
        collection: 'contact-forms',
        id: contactForm.id,
        data: {
          emailSent: true,
        }
      })

      console.log(`Admin notification email sent for contact form: ${contactForm.id}`)
    } catch (emailError) {
      console.error('Error sending admin notification email:', emailError)
      // Don't fail the request if email fails, just log the error
    }

    // Send auto-response email to the user
    try {
      await payload.sendEmail({
        to: email,
        subject: 'ขอบคุณสำหรับการติดต่อ - Best Franchise Thailand',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px; background-color: #BD2516; color: white; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Best Franchise Thailand</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">ขอบคุณสำหรับการติดต่อ</p>
            </div>
            
            <div style="padding: 30px 20px; background-color: #f9f9f9;">
              <h2 style="color: #333; margin-top: 0;">สวัสดีคุณ ${name}</h2>
              
              <p style="color: #666; line-height: 1.6;">
                เราได้รับข้อความของคุณเรียบร้อยแล้ว และจะติดต่อกลับไปยังอีเมล <strong>${email}</strong> 
                ในเร็วๆ นี้
              </p>

              <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #BD2516;">
                <h3 style="margin-top: 0; color: #BD2516;">สรุปข้อมูลที่ส่งมา</h3>
                <p style="margin: 5px 0; color: #333;"><strong>หัวข้อ:</strong> ${subject}</p>
                <p style="margin: 5px 0; color: #333;"><strong>ประเภท:</strong> ${getInquiryTypeLabel(inquiryType)}</p>
                <p style="margin: 5px 0; color: #333;"><strong>วันที่ส่ง:</strong> ${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</p>
              </div>

              <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">ช่องทางติดต่ออื่นๆ</h3>
                <p style="margin: 5px 0; color: #666;">
                  <strong>โทรศัพท์:</strong> +66 (02) 001-5855 (เปิดทุกวัน 24 ชั่วโมง)<br>
                  <strong>อีเมล:</strong> cs@franchise.com<br>
                  <strong>Line:</strong> @bestfranchisethailand
                </p>
              </div>

              <p style="color: #666; line-height: 1.6;">
                หากมีความเร่งด่วน สามารถติดต่อเราได้โดยตรงผ่านช่องทางข้างต้น
              </p>
            </div>

            <div style="text-align: center; padding: 20px; background-color: #333; color: white; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; font-size: 14px;">
                Best Franchise Thailand - แพลตฟอร์มแฟรนไชส์อันดับ 1 ของไทย
              </p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #ccc;">
                ขอบคุณที่เลือกใช้บริการของเรา
              </p>
            </div>
          </div>
        `,
      })

      // Update the contact form to mark auto-response as sent
      await payload.update({
        collection: 'contact-forms',
        id: contactForm.id,
        data: {
          autoResponded: true,
        }
      })

      console.log(`Auto-response email sent to: ${email}`)
    } catch (emailError) {
      console.error('Error sending auto-response email:', emailError)
      // Don't fail the request if email fails, just log the error
    }

    return Response.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: contactForm.id
    }, { status: 201 })

  } catch (error) {
    console.error('Error submitting contact form:', error)
    return Response.json({
      success: false,
      error: 'Internal server error while submitting contact form'
    }, { status: 500 })
  }
}

// Helper function to get inquiry type label in Thai
function getInquiryTypeLabel(inquiryType: string): string {
  const labels: { [key: string]: string } = {
    general: 'สอบถามทั่วไป',
    franchise: 'ข้อมูลแฟรนไชส์',
    market: 'เช่าพื้นที่ขาย',
    support: 'ฝ่ายสนับสนุน',
    partnership: 'ความร่วมมือทางธุรกิจ',
    complaint: 'ร้องเรียน',
    other: 'อื่นๆ'
  }
  return labels[inquiryType] || 'สอบถามทั่วไป'
}