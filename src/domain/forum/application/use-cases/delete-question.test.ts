import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { makeQuestion } from 'test/factories/makeQuestion'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { DeleteQuestion } from './delete-question'

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

    expect(
      questionsRepository.findById(createdQuestion.id.toString())
    ).resolves.toBeNull()
  })

  it('should not be able to delete a question of another user', async () => {
    const createdQuestion = makeQuestion({ slug: Slug.create('slug-x') })

    questionsRepository.create(createdQuestion)

    expect(
      sut.execute({
        questionId: createdQuestion.id.toString(),
        authorId: 'another-author'
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
