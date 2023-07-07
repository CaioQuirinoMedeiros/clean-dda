import { SendNotification } from './send-notification'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'

let notificationsRepository: NotificationsRepository
let sut: SendNotification

describe('SendNotification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotification(notificationsRepository)
  })

  it('should be able to send a question', async () => {
    const result = await sut.execute({
      recipientId: '1',
      content: 'content',
      title: 'title'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.notification.id).toBeTruthy()
  })
})
