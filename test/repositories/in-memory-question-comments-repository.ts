import {
  FindManyQuestionCommentsByQuestionIdParams,
  QuestionCommentsRepository
} from '@/domain/forum/application/repositories/question-comments-repository'
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

  async delete(questionComment: QuestionComment): Promise<void> {
    this.items = this.items.filter((item) => {
      return item.id.value !== questionComment.id.value
    })
  }

  async findManyByQuestionId(
    params: FindManyQuestionCommentsByQuestionIdParams
  ): Promise<QuestionComment[]> {
    const { questionId, page } = params

    const size = 20
    const startIndex = (page - 1) * size
    const endIndex = page * size

    return this.items
      .filter((item) => {
        return item.questionId.toString() === questionId
      })
      .slice(startIndex, endIndex)
  }
}
