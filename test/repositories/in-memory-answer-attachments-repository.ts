import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async create(answerAttachment: AnswerAttachment): Promise<void> {
    this.items.push(answerAttachment)
  }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    return this.items.filter((item) => {
      return item.answerId.toString() === answerId
    })
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    this.items = this.items.filter((item) => {
      return item.answerId.toString() !== answerId
    })
  }
}
