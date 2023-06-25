import { FetchQuestionAnswers } from './fetch-question-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { Answer } from '../../enterprise/entities/answer'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answersRepository: AnswersRepository
let sut: FetchQuestionAnswers

describe('FetchQuestionAnswers', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository(new InMemoryAnswerAttachmentsRepository())
    sut = new FetchQuestionAnswers(answersRepository)
  })

  it('should be able to fetch answers of a question', async () => {
    const createdAnswers: Answer[] = []
    for (let i = 1; i <= 30; i++) {
      createdAnswers.push(
        makeAnswer(
          { questionId: new UniqueEntityID(i <= 5 ? 'A' : 'B') },
          new UniqueEntityID(i.toString())
        )
      )
    }

    await Promise.all(
      createdAnswers.map((question) => {
        return answersRepository.create(question)
      })
    )

    const result = await sut.execute({ questionId: 'A', page: 1 })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const { answers } = result.value
      expect(answers).toHaveLength(5)
      expect(answers[0].id.toString()).toBe('1')
      expect(answers[answers.length - 1].id.toString()).toBe('5')
    }
  })
})
