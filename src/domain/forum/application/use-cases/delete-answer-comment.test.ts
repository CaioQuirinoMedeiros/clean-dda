import { DeleteAnswerComment } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let answerCommentsRepository: AnswerCommentsRepository
let sut: DeleteAnswerComment

describe('DeleteAnswerComment', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerComment(answerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const createdAnswerComment = makeAnswerComment()

    answerCommentsRepository.create(createdAnswerComment)

    await sut.execute({
      answerCommentId: createdAnswerComment.id.toString(),
      authorId: createdAnswerComment.authorId.toString()
    })

    const answer = await answerCommentsRepository.findById(
      createdAnswerComment.id.toString()
    )

    expect(answer).toBeNull()
  })

  it('should not be able to delete a answer comment of another user', async () => {
    const createdAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-x')
    })

    answerCommentsRepository.create(createdAnswerComment)

    const result = await sut.execute({
      answerCommentId: createdAnswerComment.id.toString(),
      authorId: 'another-author'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
