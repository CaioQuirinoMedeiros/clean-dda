import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { DeleteQuestion } from './delete-question'
import { NotAllowedError } from './errors/not-allowed-error'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionsRepository: QuestionsRepository
let questionAttachmentsRepository: QuestionAttachmentsRepository
let sut: DeleteQuestion

describe('DeleteQuestion', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository)
    sut = new DeleteQuestion(questionsRepository)
  })

  it('should be able to delete a question', async () => {
    const createdQuestion = makeQuestion({ slug: Slug.create('slug-x') })

    questionsRepository.create(createdQuestion)

    const createdQuestionAttachment1 = makeQuestionAttachment({
      questionId: createdQuestion.id,
      attachmentId: new UniqueEntityID('1')
    })
    const createdQuestionAttachment2 = makeQuestionAttachment({
      questionId: createdQuestion.id,
      attachmentId: new UniqueEntityID('1')
    })

    await questionAttachmentsRepository.create(createdQuestionAttachment1)
    await questionAttachmentsRepository.create(createdQuestionAttachment2)

    await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: createdQuestion.authorId.toString()
    })

    const question = await questionsRepository.findById(
      createdQuestion.id.toString()
    )

    expect(question).toBeNull()

    const questionAttachments =
      await questionAttachmentsRepository.findManyByQuestionId(
        createdQuestion.id.toString()
      )

    expect(questionAttachments).toHaveLength(0)
  })

  it('should not be able to delete a question of another user', async () => {
    const createdQuestion = makeQuestion({ slug: Slug.create('slug-x') })

    questionsRepository.create(createdQuestion)

    const result = await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: 'another-author'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
