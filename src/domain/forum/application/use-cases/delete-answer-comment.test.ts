import { DeleteAnswerComment } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

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

    expect(
      answerCommentsRepository.findById(createdAnswerComment.id.toString())
    ).resolves.toBeNull()
  })

  it('should not be able to delete a answer comment of another user', async () => {
    const createdAnswerComment = makeAnswerComment({ authorId: new UniqueEntityID("author-x")})

    answerCommentsRepository.create(createdAnswerComment)

    expect(
      sut.execute({
        answerCommentId: createdAnswerComment.id.toString(),
        authorId: 'another-author'
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
