import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => {
      return item.id.value === id
    })
    return questionComment || null
  }

  async delete(questionComent: QuestionComment): Promise<void> {
    this.items = this.items.filter((item) => {
      return item.id.value !== questionComent.id.value
    })
  }
}
