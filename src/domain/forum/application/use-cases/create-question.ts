import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Either, right } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'

interface CreateQuestionParams {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionReturn = Either<null, { question: Question }>

export class CreateQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(params: CreateQuestionParams): Promise<CreateQuestionReturn> {
    const { authorId, title, content, attachmentsIds } = params

    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
