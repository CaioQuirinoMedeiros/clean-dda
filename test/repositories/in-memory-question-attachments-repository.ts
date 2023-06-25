import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async create(questionAttachment: QuestionAttachment): Promise<void> {
    this.items.push(questionAttachment)
  }

  async findManyByQuestionId(
    questionId: string
  ): Promise<QuestionAttachment[]> {
    return this.items.filter((item) => {
      return item.questionId.toString() === questionId
    })
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    this.items = this.items.filter((item) => {
      return item.questionId.toString() !== questionId
    })
  }
}
