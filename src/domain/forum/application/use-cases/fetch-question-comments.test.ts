import { FetchQuestionComments } from './fetch-question-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let questionCommentsRepository: QuestionCommentsRepository
let sut: FetchQuestionComments

describe('FetchQuestionComments', () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionComments(questionCommentsRepository)
  })

  it('should be able to fetch comments of a question', async () => {
    const createdQuestionComments: QuestionComment[] = []
    for (let i = 1; i <= 30; i++) {
      createdQuestionComments.push(
        makeQuestionComment(
          { questionId: new UniqueEntityID(i <= 5 ? 'A' : 'B') },
          new UniqueEntityID(i.toString())
        )
      )
    }

    await Promise.all(
      createdQuestionComments.map((question) => {
        return questionCommentsRepository.create(question)
      })
    )

    const result = await sut.execute({ questionId: 'A', page: 1 })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const { questionComments } = result.value
      expect(questionComments).toHaveLength(5)
      expect(questionComments[0].id.toString()).toBe('1')
      expect(questionComments[questionComments.length - 1].id.toString()).toBe(
        '5'
      )
    }
  })
})
