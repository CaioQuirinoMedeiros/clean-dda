import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionParams {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionReturn {
  question: Question
}

export class CreateQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(params: CreateQuestionParams): Promise<CreateQuestionReturn> {
    const { authorId, title, content } = params

    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
