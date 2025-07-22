import { Conversation, Message, User, Notification } from "@prisma/client";

export type FulleMessageType = Message & {
    sender: User,
    seen: User[]
};

export type FulleConversationType = Conversation & {
    users: User[],
    messages: FulleMessageType[],
};

export type FullNotificationType = Notification & {
    sender: User,
    receiver: User
}