import { CommentOnAnswer } from './comment-on-answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answersRepository: AnswersRepository
let answerCommentsRepository: AnswerCommentsRepository
let sut: CommentOnAnswer

describe('CommentOnAnswer', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository(new InMemoryAnswerAttachmentsRepository())
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswer(answersRepository, answerCommentsRepository)
  })

  it('should be able to comment on a answer', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    const result = await sut.execute({
      authorId: '1',
      answerId: answer.id.toString(),
      content: 'Comentario'
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const { answerComment } = result.value
      expect(answerComment.content).toBe('Comentario')
    }
  })
})
