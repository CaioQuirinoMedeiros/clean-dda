import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from './comment'

interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

export interface AnswerCommentCreateProps {
  authorId: UniqueEntityID
  answerId: UniqueEntityID
  content: string
  updatedAt?: Date
} 

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(props: AnswerCommentCreateProps, id?: UniqueEntityID) {
    return new AnswerComment({ ...props, createdAt: new Date() }, id)
  }
}
