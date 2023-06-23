import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetQuestionBySlugParams {
  slug: string
}

type GetQuestionBySlugReturn = Either<
  ResourceNotFoundError,
  { question: Question }
>

export class GetQuestionBySlug {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(
    params: GetQuestionBySlugParams
  ): Promise<GetQuestionBySlugReturn> {
    const { slug } = params

    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}
