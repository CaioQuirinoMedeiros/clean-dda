import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionsParams {
  page: number
}

interface FetchRecentQuestionsReturn {
  questions: Question[]
}

export class FetchRecentQuestions {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(
    params: FetchRecentQuestionsParams
  ): Promise<FetchRecentQuestionsReturn> {
    const { page } = params

    const questions = await this.questionsRepository.findManyRecent({ page })

    return { questions }
  }
}
