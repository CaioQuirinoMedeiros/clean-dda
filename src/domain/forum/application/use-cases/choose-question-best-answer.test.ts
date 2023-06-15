import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { ChooseQuestionBestAnswer } from './choose-question-best-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let questionsRepository: QuestionsRepository
let answersRepository: AnswersRepository
let sut: ChooseQuestionBestAnswer

describe('ChooseQuestionBestAnswer', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    answersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswer(questionsRepository, answersRepository)
  })

  it('should be able to choose the best answer for a question', async () => {
    const createdQuestion = makeQuestion()
    const createdAnswer = makeAnswer({ questionId: createdQuestion.id })

    await questionsRepository.create(createdQuestion)
    await answersRepository.create(createdAnswer)

    await sut.execute({
      authorId: createdQuestion.authorId.toString(),
      answerId: createdAnswer.id.toString()
    })

    const question = await questionsRepository.findById(
      createdQuestion.id.toString()
    )

    expect(question?.bestAnswerId).toEqual(createdAnswer.id)
  })

  it('should not be able to choose the best answer for a question of another user', async () => {
    const createdQuestion = makeQuestion()
    const createdAnswer = makeAnswer({ questionId: createdQuestion.id })

    await questionsRepository.create(createdQuestion)
    await answersRepository.create(createdAnswer)

    expect(
      sut.execute({
        authorId: 'another-author',
        answerId: createdAnswer.id.toString()
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
