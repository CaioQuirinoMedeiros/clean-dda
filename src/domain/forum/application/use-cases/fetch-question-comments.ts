import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsParams {
  page: number
  questionId: string
}

type FetchQuestionCommentsReturn = Either<
  unknown,
  { questionComments: QuestionComment[] }
>

export class FetchQuestionComments {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute(
    params: FetchQuestionCommentsParams
  ): Promise<FetchQuestionCommentsReturn> {
    const { questionId, page } = params

    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId({
        questionId,
        page
      })

    return right({ questionComments })
  }
}
