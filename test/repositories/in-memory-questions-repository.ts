import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}

  async create(question: Question): Promise<void> {
    this.items.push(question)

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => {
      return item.id.value === id
    })
    return question || null
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => {
      return item.slug.value === slug
    })
    return question || null
  }

  async delete(question: Question): Promise<void> {
    this.items = this.items.filter((item) => {
      return item.id.value !== question.id.value
    })
    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString()
    )
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id
    )
    this.items[questionIndex] = question

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    const { page } = params

    const size = 20

    const startIndex = (page - 1) * size
    const endIndex = page * size

    return this.items
      .sort((itemA, itemB) => {
        return itemB.createdAt.getTime() - itemA.createdAt.getTime()
      })
      .slice(startIndex, endIndex)
  }
}
