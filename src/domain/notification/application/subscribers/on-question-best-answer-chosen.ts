import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotification } from '../use-cases/send-notification'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionBestAnswerChosen } from '@/domain/forum/enterprise/events/question-best-answer-chosen'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotification
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosen.name
    )
  }

  private async sendQuestionBestAnswerNotification(
    event: QuestionBestAnswerChosen
  ) {
    const { question, bestAnswerId } = event

    const answer = await this.answersRepository.findById(
      bestAnswerId.toString()
    )

    if (answer) {
      const questionTitleTruncated = question.title
        .substring(0, 20)
        .concat('...')

      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${questionTitleTruncated}" foi escolhida pelo author!`
      })
    }
  }
}
