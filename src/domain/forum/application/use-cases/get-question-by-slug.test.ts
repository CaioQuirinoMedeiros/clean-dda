import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { GetQuestionBySlug } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/makeQuestion'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let questionsRepository: QuestionsRepository
let sut: GetQuestionBySlug

describe('GetQuestionBySlug', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlug(questionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const createdQuestion = makeQuestion({ slug: Slug.create('slug-x') })
    
    questionsRepository.create(createdQuestion)

    const { question } = await sut.execute({ slug: 'slug-x' })

    expect(question.slug.value).toBe(createdQuestion.slug.value)
  })
})
