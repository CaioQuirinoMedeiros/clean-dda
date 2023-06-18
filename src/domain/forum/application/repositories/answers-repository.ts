import { Answer } from "@/domain/forum/enterprise/entities/answer";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findManyByQuestionId(params: FindManyAnswersByQuestionIdParams): Promise<Answer[]>
}

export interface FindManyAnswersByQuestionIdParams {
  questionId: string
  page: number
}