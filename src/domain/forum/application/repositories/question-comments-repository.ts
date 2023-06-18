import { QuestionComent } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComent): Promise<void>
}

