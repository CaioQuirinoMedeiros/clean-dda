import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionAnswersParams {
  page: number
  questionId: string
}

type FetchQuestionAnswersReturn = Either<unknown, { answers: Answer[] }>

export class FetchQuestionAnswers {
  constructor(private answersRepository: AnswersRepository) {}

  async execute(
    params: FetchQuestionAnswersParams
  ): Promise<FetchQuestionAnswersReturn> {
    const { questionId, page } = params

    const answers = await this.answersRepository.findManyByQuestionId({
      questionId,
      page
    })

    return right({ answers })
  }
}
