import {
  AnswerCommentsRepository,
  FindManyAnswerCommentsByAnswerIdParams
} from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => {
      return item.id.value === id
    })
    return answerComment || null
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    this.items = this.items.filter((item) => {
      return item.id.value !== answerComment.id.value
    })
  }

  async findManyByAnswerId(
    params: FindManyAnswerCommentsByAnswerIdParams
  ): Promise<AnswerComment[]> {
    const { answerId, page } = params

    const size = 20
    const startIndex = (page - 1) * size
    const endIndex = page * size

    return this.items
      .filter((item) => {
        return item.answerId.toString() === answerId
      })
      .slice(startIndex, endIndex)
  }
}
