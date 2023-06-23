import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswer } from './edit-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let answersRepository: AnswersRepository
let sut: EditAnswer

describe('EditAnswer', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswer(answersRepository)
  })

  it('should be able to edit an answer', async () => {
    const createdAnswer = makeAnswer({
      content: 'content-X'
    })

    await answersRepository.create(createdAnswer)

    await sut.execute({
      answerId: createdAnswer.id.toString(),
      authorId: createdAnswer.authorId.toString(),
      content: 'content-Y'
    })

    const answer = await answersRepository.findById(createdAnswer.id.toString())

    expect(answer?.content).toBe('content-Y')
  })

  it('should not be able to edit an answer of another user', async () => {
    const createdAnswer = makeAnswer()

    await answersRepository.create(createdAnswer)

    const result = await sut.execute({
      answerId: createdAnswer.id.toString(),
      authorId: 'another-author',
      content: 'content-Y'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
