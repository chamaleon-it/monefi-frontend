import { SupportTicketStatus, SupportTicketSubject } from "../enum/support.enum";

export interface SupportTicket {
  _id: string;
  user: any;
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
