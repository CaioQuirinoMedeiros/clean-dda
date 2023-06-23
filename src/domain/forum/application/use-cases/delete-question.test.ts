import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { DeleteQuestion } from './delete-question'
import { NotAllowedError } from './errors/not-allowed-error'

let questionsRepository: QuestionsRepository
let sut: DeleteQuestion

describe('DeleteQuestion', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestion(questionsRepository)
  })

  it('should be able to delete a question', async () => {
    const createdQuestion = makeQuestion({ slug: Slug.create('slug-x') })

    questionsRepository.create(createdQuestion)

    await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: createdQuestion.authorId.toString()
    })

    const question = await questionsRepository.findById(createdQuestion.id.toString())

    expect(question).toBeNull()
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
