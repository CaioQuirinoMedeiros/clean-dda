import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestion } from './edit-question'

let questionsRepository: QuestionsRepository
let sut: EditQuestion

describe('EditQuestion', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestion(questionsRepository)
  })

  it('should be able to edit a question', async () => {
    const createdQuestion = makeQuestion({
      title: 'title-X',
      content: 'content-X'
    })

    questionsRepository.create(createdQuestion)

    await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: createdQuestion.authorId.toString(),
      title: 'title-Y',
      content: 'content-Y'
    })

    const question = await questionsRepository.findById(
      createdQuestion.id.toString()
    )

    expect(question?.title).toBe('title-Y')
    expect(question?.content).toBe('content-Y')
  })

  it('should not be able to edit a question of another user', async () => {
    const createdQuestion = makeQuestion()

    questionsRepository.create(createdQuestion)

    expect(
      sut.execute({
        questionId: createdQuestion.id.toString(),
        authorId: 'another-author',
        title: 'title-Y',
        content: 'content-Y'
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
