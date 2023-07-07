import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => {
      return item.id.value === id
    })
    return notification || null
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex((item) => item.id === notification.id)
    this.items[notificationIndex] = notification
  }

}
