import {
  AnswersRepository,
  FindManyByQuestionIdParams
} from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => {
      return item.id.value === id
    })
    return answer || null
  }

  async delete(answer: Answer): Promise<void> {
    this.items = this.items.filter((item) => {
      return item.id.value !== answer.id.value
    })
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items[answerIndex] = answer
  }

  async findManyByQuestionId(params: FindManyByQuestionIdParams): Promise<Answer[]> {
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
