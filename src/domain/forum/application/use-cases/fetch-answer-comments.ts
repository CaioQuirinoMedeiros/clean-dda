import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsParams {
  page: number
  answerId: string
}

type FetchAnswerCommentsReturn = Either<unknown, { answerComments: AnswerComment[] }>

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

    return right({ answerComments })
  }
}
