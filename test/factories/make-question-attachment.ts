import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import {
  QuestionAttachment,
  QuestionAttachmentCreateProps
} from '@/domain/forum/enterprise/entities/question-attachment'

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentCreateProps> = {},
  id?: UniqueEntityID
) {
  return QuestionAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      ...override
    },
    id
  )
}
