import { DeleteQuestionComment } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let questionCommentsRepository: QuestionCommentsRepository
let sut: DeleteQuestionComment

describe('DeleteQuestionComment', () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionComment(questionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const createdQuestionComment = makeQuestionComment()

    questionCommentsRepository.create(createdQuestionComment)

    await sut.execute({
      questionCommentId: createdQuestionComment.id.toString(),
      authorId: createdQuestionComment.authorId.toString()
    })

    const questionComment = await questionCommentsRepository.findById(
      createdQuestionComment.id.toString()
    )

    expect(questionComment).toBeNull()
  })

  it('should not be able to delete a question comment of another user', async () => {
    const createdQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-x')
    })

    questionCommentsRepository.create(createdQuestionComment)

    const result = await sut.execute({
      questionCommentId: createdQuestionComment.id.toString(),
      authorId: 'another-author'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
