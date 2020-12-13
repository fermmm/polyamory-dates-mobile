import { ChatMessage, TokenParameter } from "./common";
import { User } from "./user";

export interface AdminChatPostParams extends TokenParameter {
   messageText: string;
   targetUserId?: string;
}

export interface AdminChatGetParams extends TokenParameter {
   targetUserId?: string;
}

export interface AdminChatGetAllParams extends TokenParameter {
   excludeRespondedByAdmin?: boolean;
}

export interface ChatWithAdmins {
   messages: ChatMessage[];
   adminHasResponded: boolean;
   lastMessageDate: number;
   nonAdminUser: User;
}

export interface AdminConvertPostParams extends TokenParameter {
   targetUserToken?: string;
}