import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentList } from './answer-attachment-list'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { AnswerCreatedEvent } from '../events/answer-created-event'

interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  attachments: AnswerAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export interface AnswerCreateProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  attachments?: AnswerAttachmentList
  updatedAt?: Date
}

export class Answer extends AggregateRoot<AnswerProps> {
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.props.updatedAt = new Date()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.props.updatedAt = new Date()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  static create(props: AnswerCreateProps, id?: UniqueEntityID) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: new Date()
      },
      id
    )

    const isNewAnswer = !id
    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer))
    }

    return answer
  }
}
