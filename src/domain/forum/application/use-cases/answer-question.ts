import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { Either, right } from '@/core/either'

interface AnswerQuestionParams {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionReturn = Either<null, { answer: Answer }>
export class AnswerQuestion {
  constructor(private answersRepository: AnswersRepository) {}

  async execute(params: AnswerQuestionParams): Promise<AnswerQuestionReturn> {
    const { instructorId, questionId, content } = params

    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId)
    })

    await this.answersRepository.create(answer)

    return right({ answer })
  }
}
