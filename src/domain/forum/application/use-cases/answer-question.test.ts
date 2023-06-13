import { AnswerQuestion } from './answer-question'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  async create() {
    return
  }
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestion(fakeAnswersRepository)

  const { answer } = await answerQuestion.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Resposta'
  })

  expect(answer.content).toBe('Resposta')
})
