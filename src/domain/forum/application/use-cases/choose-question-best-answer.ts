import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionParams {
  answerId: string
  authorId: string
}

interface EditQuestionReturn {
  question: Question
}

export class ChooseQuestionBestAnswer {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute(params: EditQuestionParams): Promise<EditQuestionReturn> {
    const { authorId, answerId } = params

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = new UniqueEntityID(answerId)

    await this.questionsRepository.save(question)

    return { question }
  }
}
