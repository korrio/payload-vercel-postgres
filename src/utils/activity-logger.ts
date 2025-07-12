import type { Payload } from 'payload'

export interface ActivityLogData {
  user: string
  activity: string
  details?: any
  ipAddress?: string
  userAgent?: string
  sessionId?: string
  success?: boolean
  errorMessage?: string
}

export class ActivityLogger {
  private payload: Payload

  constructor(payload: Payload) {
    this.payload = payload
  }

  private getClientInfo(req: any) {
    const ipAddress = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection?.remoteAddress || 
                     req.socket?.remoteAddress || 
                     (req.connection?.socket ? req.connection.socket.remoteAddress : null) ||
                     'unknown'

    const userAgent = req.headers['user-agent'] || ''
    
    return {
      ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
      userAgent,
    }
  }

  async logActivity(data: ActivityLogData, req?: any): Promise<void> {
    try {
      const clientInfo = req ? this.getClientInfo(req) : {}
      
      await this.payload.create({
        collection: 'user-logs',
        data: {
          user: data.user,
          activity: data.activity,
          details: data.details,
          ipAddress: data.ipAddress || clientInfo.ipAddress,
          userAgent: data.userAgent || clientInfo.userAgent,
          sessionId: data.sessionId,
          timestamp: new Date().toISOString(),
          success: data.success !== undefined ? data.success : true,
          errorMessage: data.errorMessage,
        },
      })
    } catch (error) {
      console.error('Failed to log user activity:', error)
    }
  }

  async logLogin(userId: string, req?: any, success = true, errorMessage?: string): Promise<void> {
    await this.logActivity({
      user: userId,
      activity: 'login',
      success,
      errorMessage,
    }, req)
  }

  async logLogout(userId: string, req?: any): Promise<void> {
    await this.logActivity({
      user: userId,
      activity: 'logout',
    }, req)
  }

  async logFailedLogin(email: string, req?: any, errorMessage?: string): Promise<void> {
    try {
      const user = await this.payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
        limit: 1,
      })

      if (user.docs.length > 0) {
        await this.logActivity({
          user: user.docs[0].id,
          activity: 'failed_login',
          success: false,
          errorMessage,
          details: { email },
        }, req)
      }
    } catch (error) {
      console.error('Failed to log failed login attempt:', error)
    }
  }

  async logProfileUpdate(userId: string, changes: any, req?: any): Promise<void> {
    await this.logActivity({
      user: userId,
      activity: 'profile_update',
      details: { changes },
    }, req)
  }

  async logPasswordChange(userId: string, req?: any): Promise<void> {
    await this.logActivity({
      user: userId,
      activity: 'password_change',
    }, req)
  }

  async logEmailChange(userId: string, oldEmail: string, newEmail: string, req?: any): Promise<void> {
    await this.logActivity({
      user: userId,
      activity: 'email_change',
      details: { oldEmail, newEmail },
    }, req)
  }

  async logDocumentActivity(
    userId: string, 
    activity: string, 
    collection: string, 
    documentId: string, 
    details?: any, 
    req?: any
  ): Promise<void> {
    await this.logActivity({
      user: userId,
      activity,
      details: {
        collection,
        documentId,
        ...details,
      },
    }, req)
  }

  async logMediaActivity(userId: string, activity: string, mediaId: string, filename?: string, req?: any): Promise<void> {
    await this.logActivity({
      user: userId,
      activity,
      details: {
        mediaId,
        filename,
      },
    }, req)
  }
}

export const createActivityLogger = (payload: Payload) => new ActivityLogger(payload)