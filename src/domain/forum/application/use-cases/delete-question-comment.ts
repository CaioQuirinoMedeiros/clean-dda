import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteQuestionCommentParams {
  authorId: string
  questionCommentId: string
}

type DeleteAnswerCommentReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  unknown
>

export class DeleteQuestionComment {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute(
    params: DeleteQuestionCommentParams
  ): Promise<DeleteAnswerCommentReturn> {
    const { authorId, questionCommentId } = params

    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId
    )

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right({})
  }
}
