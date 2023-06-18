import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionComent } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface CommentOnQuestionParams {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionReturn {
  questionComment: QuestionComent
}

export class CommentOnQuestion {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) {}

  async execute(
    params: CommentOnQuestionParams
  ): Promise<CommentOnQuestionReturn> {
    const { authorId, questionId, content } = params

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Resource not found')
    }

    const questionComment = QuestionComent.create({
      authorId: new UniqueEntityID(authorId),
      content,
      questionId: new UniqueEntityID(questionId)
    })

    await this.questionCommentsRepository.create(questionComment)

    return { questionComment }
  }
}
