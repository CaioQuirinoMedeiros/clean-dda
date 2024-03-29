import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { GetQuestionBySlug } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let questionsRepository: QuestionsRepository
let sut: GetQuestionBySlug

describe('GetQuestionBySlug', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository(
      new InMemoryQuestionAttachmentsRepository()
    )
    sut = new GetQuestionBySlug(questionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const createdQuestion = makeQuestion({ slug: Slug.create('slug-x') })

    questionsRepository.create(createdQuestion)

    const result = await sut.execute({ slug: 'slug-x' })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const { question } = result.value
      expect(question.slug.value).toBe(createdQuestion.slug.value)
    }
  })
})
