import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(answerComment: AnswerComment): Promise<void>
  findManyByAnswerId(
    params: FindManyAnswerCommentsByAnswerIdParams
  ): Promise<AnswerComment[]>
}

export interface FindManyAnswerCommentsByAnswerIdParams {
  answerId: string
  page: number
}