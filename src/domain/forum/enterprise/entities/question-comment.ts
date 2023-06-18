import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from './comment'

interface QuestionComentProps extends CommentProps {
  questionId: UniqueEntityID
}

export interface QuestionComentCreateProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  updatedAt?: Date
}

export class QuestionComent extends Comment<QuestionComentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(props: QuestionComentCreateProps, id?: UniqueEntityID) {
    return new QuestionComent({ ...props, createdAt: new Date() }, id)
  }
}
