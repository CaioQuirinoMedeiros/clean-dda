import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/domain/forum/application/use-cases/errors/resource-not-found-error'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'

interface ReadNotificationParams {
  notificationId: string
  recipientId: string
}

type ReadNotificationReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  { notification: Notification }
>

export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    params: ReadNotificationParams
  ): Promise<ReadNotificationReturn> {
    const { notificationId, recipientId } = params

    const notification = await this.notificationsRepository.findById(
      notificationId
    )

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    notification.read()
    await this.notificationsRepository.save(notification)

    return right({ notification })
  }
}
