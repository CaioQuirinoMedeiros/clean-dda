import { AnswerComent } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComent): Promise<void>
}

