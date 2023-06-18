import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsParams {
  page: number
  answerId: string
}

interface FetchAnswerCommentsReturn {
  answerComments: AnswerComment[]
}

export class FetchAnswerComments {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute(
    params: FetchAnswerCommentsParams
  ): Promise<FetchAnswerCommentsReturn> {
    const { answerId, page } = params

    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId({
        answerId,
        page
      })

    return { answerComments }
  }
}
