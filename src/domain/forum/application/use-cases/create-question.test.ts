import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestion } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  async create() {
    return
  }
}

test('create a question', async () => {
  const createQuestion = new CreateQuestion(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({
    authorId: "1",
    content: "content",
    title: "title"
  })

  expect(question.id).toBeTruthy()
})
