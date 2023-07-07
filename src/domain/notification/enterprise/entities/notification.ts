import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface NotificationProps {
  recipientId: UniqueEntityID
  title: string
  content: string
  createdAt: Date
  readAt?: Date
}

export interface NotificationCreateProps {
  recipientId: UniqueEntityID
  title: string
  content: string
  readAt?: Date
}


export class Notification extends Entity<NotificationProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get title() {
    return this.props.recipientId
  }

  get content() {
    return this.props.recipientId
  }

  get readAt() {
    return this.props.recipientId
  }

  get createdAt() {
    return this.props.recipientId
  }

  static create(props:NotificationCreateProps, id?: UniqueEntityID) {
    return new Notification({...props, createdAt: new Date()}, id)
  }

} 