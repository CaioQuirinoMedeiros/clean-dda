import { makeAnswer } from 'test/factories/make-answer'
import { OnQuestionBestAnswerChosen } from './on-question-best-answer-chosen'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import {
  SendNotification,
  SendNotificationParams,
  SendNotificationReturn
} from '../use-cases/send-notification'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeQuestion } from 'test/factories/make-question'
import { SpyInstance } from 'vitest'

let questionAttachmentsRepository: QuestionAttachmentsRepository
let questionsRepository: QuestionsRepository
let answersRepository: AnswersRepository
let answerAttachmentsRepository: AnswerAttachmentsRepository
let notificationsRepository: NotificationsRepository
let sendNotification: SendNotification

let sendNotificationMock: SpyInstance<
  [SendNotificationParams],
  Promise<SendNotificationReturn>
>

describe('OnQuestionBestAnswerChosen', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository
    )
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    notificationsRepository = new InMemoryNotificationsRepository()
    answersRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository
    )
    sendNotification = new SendNotification(notificationsRepository)

    sendNotificationMock = vi.spyOn(sendNotification, 'execute')

    new OnQuestionBestAnswerChosen(answersRepository, sendNotification)
  })
  it('should send a notification when an answer question has new best answer', async () => {
    const createdQuestion = makeQuestion()
    const createdAnswer = makeAnswer({ questionId: createdQuestion.id })

    await questionsRepository.create(createdQuestion)
    await answersRepository.create(createdAnswer)

    createdQuestion.bestAnswerId = createdAnswer.id

    await questionsRepository.save(createdQuestion)

    expect(sendNotificationMock).toHaveBeenCalled()
  })
})
