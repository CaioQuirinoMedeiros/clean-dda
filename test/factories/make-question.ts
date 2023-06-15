import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionCreateProps
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(
  override: Partial<QuestionCreateProps> = {},
  id?: UniqueEntityID
) {
  return Question.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      ...override
    },
    id
  )
}
