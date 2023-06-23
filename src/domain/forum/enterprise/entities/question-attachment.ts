import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface QuestionAttachmentProps {
  questionId: string
  attachmentId: string
}

interface QuestionAttachmentCreateProps {
  questionId: string
  attachmentId: string
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentCreateProps, id?: UniqueEntityID) {
    return new QuestionAttachment({ ...props }, id)
  }
}