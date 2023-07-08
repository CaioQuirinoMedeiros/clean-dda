import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { Either, right } from '@/core/either'

export interface SendNotificationParams {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationReturn = Either<null, { notification: Notification }>

export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    params: SendNotificationParams
  ): Promise<SendNotificationReturn> {
    const { recipientId, title, content } = params

    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
