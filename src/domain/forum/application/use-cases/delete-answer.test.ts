import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswer } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answersRepository: AnswersRepository
let sut: DeleteAnswer

describe('DeleteAnswer', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswer(answersRepository)
  })

  it('should be able to delete an answer', async () => {
    const createdAnswer = makeAnswer()

    answersRepository.create(createdAnswer)

    await sut.execute({
      answerId: createdAnswer.id.toString(),
      authorId: createdAnswer.authorId.toString()
    })

    expect(
      answersRepository.findById(createdAnswer.id.toString())
    ).resolves.toBeNull()
  })

  it('should not be able to delete an answer of another user', async () => {
    const createdAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-X')
    })

    answersRepository.create(createdAnswer)

    expect(
      sut.execute({
        answerId: createdAnswer.id.toString(),
        authorId: 'another-author'
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
