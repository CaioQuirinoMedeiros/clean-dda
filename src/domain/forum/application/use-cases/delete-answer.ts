import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerParams {
  authorId: string
  answerId: string
}

export class DeleteAnswer {
  constructor(private answersRepository: AnswersRepository) {}

  async execute(params: DeleteAnswerParams): Promise<void> {
    const { answerId, authorId } = params

    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answer)
  }
}
