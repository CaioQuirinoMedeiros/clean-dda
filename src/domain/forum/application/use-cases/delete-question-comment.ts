import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentParams {
  authorId: string
  questionCommentId: string
}

export class DeleteQuestionComment {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute(params: DeleteQuestionCommentParams): Promise<void> {
    const { authorId, questionCommentId } = params

    const questionComment = await this.questionCommentsRepository.findById(
      questionCommentId
    )

    if (!questionComment) {
      throw new Error('Resource not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionCommentsRepository.delete(questionComment)
  }
}
