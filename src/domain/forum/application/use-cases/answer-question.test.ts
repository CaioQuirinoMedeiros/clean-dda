import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestion } from './answer-question'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let answersRepository: AnswersRepository
let sut: AnswerQuestion

describe('AnswerQuestion', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository(
      new InMemoryAnswerAttachmentsRepository()
    )
    sut = new AnswerQuestion(answersRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Resposta',
      attachmentsIds: ['1', '2']
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answer.content).toBe('Resposta')

    expect(result.value?.answer.attachments.currentItems).toHaveLength(2)
    expect(result.value?.answer.attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') })
    ])
  })
})
