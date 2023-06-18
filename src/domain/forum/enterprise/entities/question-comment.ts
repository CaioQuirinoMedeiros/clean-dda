import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from './comment'

interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID
}

export interface QuestionCommentCreateProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  updatedAt?: Date
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(props: QuestionCommentCreateProps, id?: UniqueEntityID) {
    return new QuestionComment({ ...props, createdAt: new Date() }, id)
  }
}
