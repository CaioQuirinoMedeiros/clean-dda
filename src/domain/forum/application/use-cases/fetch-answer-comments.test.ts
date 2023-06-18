import { FetchAnswerComments } from './fetch-answer-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let answerCommentsRepository: AnswerCommentsRepository
let sut: FetchAnswerComments

describe('FetchAnswerComments', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerComments(answerCommentsRepository)
  })

  it('should be able to fetch comments of a answer', async () => {
    const createdAnswerComments: AnswerComment[] = []
    for (let i = 1; i <= 30; i++) {
      createdAnswerComments.push(
        makeAnswerComment(
          { answerId: new UniqueEntityID(i <= 5 ? 'A' : 'B') },
          new UniqueEntityID(i.toString())
        )
      )
    }

    await Promise.all(
      createdAnswerComments.map((answer) => {
        return answerCommentsRepository.create(answer)
      })
    )

    const { answerComments } = await sut.execute({ answerId: 'A', page: 1 })

    expect(answerComments).toHaveLength(5)
    expect(answerComments[0].id.toString()).toBe('1')
    expect(answerComments[answerComments.length - 1].id.toString()).toBe('5')
  })
})
