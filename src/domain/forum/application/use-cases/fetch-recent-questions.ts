import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionsParams {
  page: number
}

type FetchRecentQuestionsReturn = Either<unknown, { questions: Question[] }>

export class FetchRecentQuestions {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(
    params: FetchRecentQuestionsParams
  ): Promise<FetchRecentQuestionsReturn> {
    const { page } = params

    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}
