import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from './comment'

interface AnswerComentProps extends CommentProps {
  answerId: UniqueEntityID
}

export interface AnswerComentCreateProps {
  authorId: UniqueEntityID
  answerId: UniqueEntityID
  content: string
  updatedAt?: Date
} 

export class AnswerComent extends Comment<AnswerComentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(props: AnswerComentCreateProps, id?: UniqueEntityID) {
    return new AnswerComent({ ...props, createdAt: new Date() }, id)
  }
}
