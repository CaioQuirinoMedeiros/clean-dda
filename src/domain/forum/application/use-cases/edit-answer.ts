import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerParams {
  answerId: string
  authorId: string
  content: string
}

interface EditAnswerReturn {
  answer: Answer
}

export class EditAnswer {
  constructor(private answersRepository: AnswersRepository) {}

  async execute(params: EditAnswerParams): Promise<EditAnswerReturn> {
    const { answerId, authorId, content } = params

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return { answer }
  }
}
