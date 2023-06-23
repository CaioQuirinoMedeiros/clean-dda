import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerParams {
  authorId: string
  answerId: string
}

type DeleteAnswerReturn = Either<
  ResourceNotFoundError | NotAllowedError,
  unknown
>

export class DeleteAnswer {
  constructor(private answersRepository: AnswersRepository) {}

  async execute(params: DeleteAnswerParams): Promise<DeleteAnswerReturn> {
    const { answerId, authorId } = params

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)

    return right({})
  }
}
