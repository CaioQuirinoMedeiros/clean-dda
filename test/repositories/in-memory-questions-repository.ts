import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
 
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
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
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(item => item.id === question.id)
    this.items[questionIndex] = question
  }
}
