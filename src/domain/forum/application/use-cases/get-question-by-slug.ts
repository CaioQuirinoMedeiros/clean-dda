import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugParams {
  slug: string
}

interface GetQuestionBySlugReturn {
  question: Question
}

export class GetQuestionBySlug {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(
    params: GetQuestionBySlugParams
  ): Promise<GetQuestionBySlugReturn> {
    const { slug } = params

    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error("Question not found")
    }

    return { question }
  }
}
