import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestion } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionsRepository: QuestionsRepository
let questionAttachmentsRepository: QuestionAttachmentsRepository
let sut: EditQuestion

describe('EditQuestion', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
    sut = new EditQuestion(questionsRepository, questionAttachmentsRepository)
  })

  it('should be able to edit a question', async () => {
    const createdQuestion = makeQuestion({
      title: 'title-X',
      content: 'content-X'
    })
    const createdQuestionAttachment1 = makeQuestionAttachment({
      questionId: createdQuestion.id,
      attachmentId: new UniqueEntityID('1')
    })
    const createdQuestionAttachment2 = makeQuestionAttachment({
      questionId: createdQuestion.id,
      attachmentId: new UniqueEntityID('2')
    })

    await questionsRepository.create(createdQuestion)
    await questionAttachmentsRepository.create(createdQuestionAttachment1)
    await questionAttachmentsRepository.create(createdQuestionAttachment2)

    await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: createdQuestion.authorId.toString(),
      title: 'title-Y',
      content: 'content-Y',
      attachmentsIds: ['1', '3']
    })

    const question = await questionsRepository.findById(
      createdQuestion.id.toString()
    )

    expect(question?.title).toBe('title-Y')
    expect(question?.content).toBe('content-Y')

    expect(question?.attachments.currentItems).toHaveLength(2)
    expect(question?.attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
    ])
  })

  it('should not be able to edit a question of another user', async () => {
    const createdQuestion = makeQuestion()

    await questionsRepository.create(createdQuestion)

    const result = await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: 'another-author',
      title: 'title-Y',
      content: 'content-Y',
      attachmentsIds: []
    })

    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
