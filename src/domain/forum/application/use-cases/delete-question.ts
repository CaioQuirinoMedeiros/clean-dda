import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionParams {
  authorId: string
  questionId: string
}

export class DeleteQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(params: DeleteQuestionParams): Promise<void> {
    const { questionId, authorId } = params

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(question)
  }
}
