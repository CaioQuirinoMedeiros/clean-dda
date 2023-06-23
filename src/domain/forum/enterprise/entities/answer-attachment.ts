import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface AnswerAttachmentProps {
  answerId: string
  attachmentId: string
}

interface AnswerAttachmentCreateProps {
  answerId: string
  attachmentId: string
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentCreateProps, id?: UniqueEntityID) {
    return new AnswerAttachment({ ...props }, id)
  }
}