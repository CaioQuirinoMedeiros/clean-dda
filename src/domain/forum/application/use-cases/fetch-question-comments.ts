import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsParams {
  page: number
  questionId: string
}

interface FetchQuestionCommentsReturn {
  questionComments: QuestionComment[]
}

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

    return { questionComments }
  }
}
