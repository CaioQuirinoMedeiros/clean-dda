import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswer } from './edit-answer'
import { NotAllowedError } from './errors/not-allowed-error'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answersRepository: AnswersRepository
let answerAttachmentsRepository: AnswerAttachmentsRepository
let sut: EditAnswer

describe('EditAnswer', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswersRepository(answerAttachmentsRepository)
    sut = new EditAnswer(answersRepository, answerAttachmentsRepository)
  })

  it('should be able to edit an answer', async () => {
    const createdAnswer = makeAnswer({
      content: 'content-X'
    })
    const createdAnswerAttachment1 = makeAnswerAttachment({
      answerId: createdAnswer.id,
      attachmentId: new UniqueEntityID('1')
    })
    const createdAnswerAttachment2 = makeAnswerAttachment({
      answerId: createdAnswer.id,
      attachmentId: new UniqueEntityID('2')
    })

    await answersRepository.create(createdAnswer)
    await answerAttachmentsRepository.create(createdAnswerAttachment1)
    await answerAttachmentsRepository.create(createdAnswerAttachment2)

    await sut.execute({
      answerId: createdAnswer.id.toString(),
      authorId: createdAnswer.authorId.toString(),
      content: 'content-Y',
      attachmentsIds: ['1', '3']
    })

    const answer = await answersRepository.findById(createdAnswer.id.toString())

    expect(answer?.content).toBe('content-Y')

    expect(answer?.attachments.currentItems).toHaveLength(2)
    expect(answer?.attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
    ])
  })

  it('should not be able to edit an answer of another user', async () => {
    const createdAnswer = makeAnswer()

    await answersRepository.create(createdAnswer)

    const result = await sut.execute({
      answerId: createdAnswer.id.toString(),
      authorId: 'another-author',
      content: 'content-Y',
      attachmentsIds: []
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
