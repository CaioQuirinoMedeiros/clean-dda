import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestion } from './answer-question'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

let answersRepository: AnswersRepository
let sut: AnswerQuestion

describe('AnswerQuestion', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestion(answersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Resposta'
    })

    expect(answer.content).toBe('Resposta')
  })
})
