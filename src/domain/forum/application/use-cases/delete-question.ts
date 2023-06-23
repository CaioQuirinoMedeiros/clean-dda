import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteQuestionParams {
  authorId: string
  questionId: string
}

type DeleteQuestionReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  unknown
>

export class DeleteQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(params: DeleteQuestionParams): Promise<DeleteQuestionReturn> {
    const { questionId, authorId } = params

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right({})
  }
}
