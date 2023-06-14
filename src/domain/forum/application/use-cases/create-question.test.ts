import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestion } from './create-question'

let questionsRepository: QuestionsRepository
let sut: CreateQuestion

describe('CreateQuestion', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestion(questionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      content: 'content',
      title: 'title'
    })

    expect(question.id).toBeTruthy()
  })
})
