import { CommentOnQuestion } from './comment-on-question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let questionsRepository: QuestionsRepository
let questionCommentsRepository: QuestionCommentsRepository
let sut: CommentOnQuestion

describe('CommentOnQuestion', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository(new InMemoryQuestionAttachmentsRepository())
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestion(questionsRepository, questionCommentsRepository)
  })

  it('should be able to comment on a question', async () => {
    const question = makeQuestion()

    await questionsRepository.create(question)

    const result = await sut.execute({
      authorId: '1',
      questionId: question.id.toString(),
      content: 'Comentario'
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const { questionComment } = result.value
      expect(questionComment.content).toBe('Comentario')
    }
  })
})
