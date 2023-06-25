import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswer } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answersRepository: AnswersRepository
let answerAttachmentsRepository: AnswerAttachmentsRepository
let sut: DeleteAnswer

describe('DeleteAnswer', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository
    )
    sut = new DeleteAnswer(answersRepository)
  })

  it('should be able to delete an answer', async () => {
    const createdAnswer = makeAnswer()

    answersRepository.create(createdAnswer)

    const createdAnswerAttachment1 = makeAnswerAttachment({
      answerId: createdAnswer.id,
      attachmentId: new UniqueEntityID('1')
    })
    const createdAnswerAttachment2 = makeAnswerAttachment({
      answerId: createdAnswer.id,
      attachmentId: new UniqueEntityID('1')
    })

    await answerAttachmentsRepository.create(createdAnswerAttachment1)
    await answerAttachmentsRepository.create(createdAnswerAttachment2)

    await sut.execute({
      answerId: createdAnswer.id.toString(),
      authorId: createdAnswer.authorId.toString()
    })

    const answer = await answersRepository.findById(createdAnswer.id.toString())

    expect(answer).toBeNull()

    const answerAttachments =
      await answerAttachmentsRepository.findManyByAnswerId(
        createdAnswer.id.toString()
      )

    expect(answerAttachments).toHaveLength(0)
  })

  it('should not be able to delete an answer of another user', async () => {
    const createdAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-X')
    })

    answersRepository.create(createdAnswer)

    const result = await sut.execute({
      answerId: createdAnswer.id.toString(),
      authorId: 'another-author'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
