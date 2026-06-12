import api from "./api";
import { CreateSupportTicketRequest, SupportTicket, UpdateSupportTicketRequest } from "../interface/support.interface";

export const getSupportTickets = async (): Promise<SupportTicket[]> => {
  const response = await api.get('/support');
  return response.data;
};

export const createSupportTicket = async (data: CreateSupportTicketRequest): Promise<SupportTicket> => {
  const response = await api.post('/support', data);
  return response.data;
};

export const updateSupportTicketStatus = async (id: string, data: UpdateSupportTicketRequest): Promise<SupportTicket> => {
  const response = await api.patch(`/support/${id}`, data);
  return response.data;
};
