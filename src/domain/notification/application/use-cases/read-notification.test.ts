import { ReadNotification } from './read-notification'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeNotification } from 'test/factories/make-notification'
import { NotAllowedError } from '@/domain/forum/application/use-cases/errors/not-allowed-error'

let notificationsRepository: NotificationsRepository
let sut: ReadNotification

describe('ReadNotification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotification(notificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const createdNotification = makeNotification()

    await notificationsRepository.create(createdNotification)

    const result = await sut.execute({
      recipientId: createdNotification.recipientId.toString(),
      notificationId: createdNotification.id.toString()
    })

    expect(result.isRight()).toBe(true)

    const notification = await notificationsRepository.findById(
      createdNotification.id.toString()
    )

    console.log(typeof notification?.readAt)
    expect(notification?.readAt).toEqual(expect.any(Date))
  })

  it('should not be able to read another recipient notification', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-x')
    })

    await notificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: 'recipient-y',
      notificationId: notification.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
