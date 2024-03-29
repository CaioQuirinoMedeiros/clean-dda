import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { FetchRecentQuestions } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { subDays } from 'date-fns'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let questionsRepository: QuestionsRepository
let sut: FetchRecentQuestions

describe('FetchRecentQuestions', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository(new InMemoryQuestionAttachmentsRepository())
    sut = new FetchRecentQuestions(questionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    const createdQuestions: Question[] = []
    for (let i = 1; i <= 30; i++) {
      createdQuestions.push(
        makeQuestion(
          { createdAt: subDays(new Date(), i) },
          new UniqueEntityID(i.toString())
        )
      )
    }

    await Promise.all(
      createdQuestions.map((question) => {
        return questionsRepository.create(question)
      })
    )

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const { questions } = result.value
      expect(result.value.questions).toHaveLength(10)
      expect(questions[0].id.toString()).toBe('21')
      expect(questions[questions.length - 1].id.toString()).toBe('30')
    }
  })
})
