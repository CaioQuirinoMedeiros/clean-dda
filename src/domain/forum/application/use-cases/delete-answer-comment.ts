import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentParams {
  authorId: string
  answerCommentId: string
}

export class DeleteAnswerComment {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute(params: DeleteAnswerCommentParams): Promise<void> {
    const { authorId, answerCommentId } = params

    const answerComment = await this.answerCommentsRepository.findById(
      answerCommentId
    )

    if (!answerComment) {
      throw new Error('Resource not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)
  }
}
