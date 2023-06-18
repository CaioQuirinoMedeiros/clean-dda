import { CommentOnAnswer } from './comment-on-answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswer } from 'test/factories/make-answer'

let answersRepository: AnswersRepository
let answerCommentsRepository: AnswerCommentsRepository
let sut: CommentOnAnswer

describe('CommentOnAnswer', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswer(answersRepository, answerCommentsRepository)
  })

  it('should be able to comment on a answer', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    const { answerComment } = await sut.execute({
      authorId: '1',
      answerId: answer.id.toString(),
      content: 'Comentario'
    })

    expect(answerComment.content).toBe('Comentario')
  })
})