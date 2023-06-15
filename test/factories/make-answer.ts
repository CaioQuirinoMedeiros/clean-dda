import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Answer,
  AnswerCreateProps
} from '@/domain/forum/enterprise/entities/answer'

export function makeAnswer(
  override: Partial<AnswerCreateProps> = {},
  id?: UniqueEntityID
) {
  return Answer.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...override
    },
    id
  )
}
