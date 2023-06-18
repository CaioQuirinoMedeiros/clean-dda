import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerComent } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface CommentOnAnswerParams {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerReturn {
  answerComment: AnswerComent
}

export class CommentOnAnswer {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute(
    params: CommentOnAnswerParams
  ): Promise<CommentOnAnswerReturn> {
    const { authorId, answerId, content } = params

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Resource not found')
    }

    const answerComment = AnswerComent.create({
      authorId: new UniqueEntityID(authorId),
      content,
      answerId: new UniqueEntityID(answerId)
    })

    await this.answerCommentsRepository.create(answerComment)

    return { answerComment }
  }
}
