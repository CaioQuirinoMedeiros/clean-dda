import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestion } from './create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionsRepository: QuestionsRepository
let sut: CreateQuestion

describe('CreateQuestion', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestion(questionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'content',
      title: 'title',
      attachmentsIds: ['1', '2']
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.attachments).toHaveLength(2)
    expect(result.value?.question.attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })
})
