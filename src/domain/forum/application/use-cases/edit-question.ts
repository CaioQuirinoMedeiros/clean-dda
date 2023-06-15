import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionParams {
  questionId: string
  authorId: string
  title: string
  content: string
}

export class EditQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(params: EditQuestionParams): Promise<void> {
    const {questionId, authorId, title, content } = params

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)
  }
}
