import { SupportTicketStatus, SupportTicketSubject } from "../enum/support.enum";
import { User } from "./user.interface";

export interface SupportTicket {
  _id: string;
  user: User;
  subject: SupportTicketSubject;
  message: string;
  status: SupportTicketStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupportTicketRequest {
  subject: SupportTicketSubject;
  message: string;
}

export interface UpdateSupportTicketRequest {
  status: SupportTicketStatus;
}
