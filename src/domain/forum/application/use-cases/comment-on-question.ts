import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CommentOnQuestionParams {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionReturn = Either<
  ResourceNotFoundError,
  { questionComment: QuestionComment }
>

export class CommentOnQuestion {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) {}

  async execute(
    params: CommentOnQuestionParams
  ): Promise<CommentOnQuestionReturn> {
    const { authorId, questionId, content } = params

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      questionId: new UniqueEntityID(questionId)
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}
