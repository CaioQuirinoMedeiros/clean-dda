import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerCommentParams {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>

export class DeleteAnswerComment {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute(
    params: DeleteAnswerCommentParams
  ): Promise<DeleteAnswerCommentReturn> {
    const { authorId, answerCommentId } = params

    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    )

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
