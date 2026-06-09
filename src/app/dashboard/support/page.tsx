"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/auth/useAuth";
import { UserRoles } from "@/enum/user.enum";
import { SupportTicketStatus, SupportTicketSubject } from "@/enum/support.enum";
import { SupportTicket } from "@/interface/support.interface";
import {
  getSupportTickets,
  createSupportTicket,
  updateSupportTicketStatus,
} from "@/services/support.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subject, setSubject] = useState<SupportTicketSubject | "">(
    ""
  );
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getSupportTickets();
      setTickets(data);
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    try {
      setIsSubmitting(true);
      await createSupportTicket({
        subject: subject as SupportTicketSubject,
        message,
      });
      setIsDialogOpen(false);
      setSubject("");
      setMessage("");
      fetchTickets();
    } catch (error) {
      console.error("Failed to create ticket", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: SupportTicketStatus
  ) => {
    try {
      await updateSupportTicketStatus(id, { status: newStatus });
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#232323] mb-2">Support</h1>
          <p className="text-bakerjonesholdings-black">
            Manage your support tickets and inquiries.
          </p>
        </div>

        {user?.role === UserRoles.USER && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#1D1D1B] text-white hover:bg-[#333] px-6 py-2 rounded-xl">
                Create Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#232323]">
                  Contact Support
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <Select
                    value={subject}
                    onValueChange={(value) =>
                      setSubject(value as SupportTicketSubject)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {Object.values(SupportTicketSubject).map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    className="w-full min-h-[150px] p-3 rounded-md border border-input bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Describe your issue in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#1D1D1B] text-white hover:bg-[#333]"
                    disabled={!subject || !message || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 py-8 text-center">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-500 py-8 text-center">
            No support tickets found.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500 text-sm">
                <th className="py-3 px-4 font-medium">Ticket ID</th>
                {user?.role === UserRoles.ADMIN && (
                  <th className="py-3 px-4 font-medium">User</th>
                )}
                <th className="py-3 px-4 font-medium">Subject</th>
                <th className="py-3 px-4 font-medium">Message</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="border-b border-gray-50 hover:bg-gray-50/50"
                >
                  <td className="py-4 px-4 text-sm text-gray-600 font-mono">
                    #{ticket._id.slice(-6).toUpperCase()}
                  </td>
                  {user?.role === UserRoles.ADMIN && (
                    <td className="py-4 px-4 text-sm text-gray-800">
                      {ticket.user?.name}                      <br />
                      <span className="text-xs text-gray-500">
                        {ticket.user?.email}
                      </span>
                    </td>
                  )}
                  <td className="py-4 px-4 text-sm font-medium text-gray-800">
                    {ticket.subject}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 max-w-xs truncate">
                    {ticket.message}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    {user?.role === UserRoles.ADMIN ? (
                      <Select
                        value={ticket.status}
                        onValueChange={(val) =>
                          handleStatusChange(
                            ticket._id,
                            val as SupportTicketStatus
                          )
                        }
                      >
                        <SelectTrigger className="w-[140px] h-8 text-xs bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {Object.values(SupportTicketStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ticket.status === SupportTicketStatus.OPEN
                          ? "bg-blue-100 text-blue-800"
                          : ticket.status === SupportTicketStatus.IN_PROGRESS
                            ? "bg-yellow-100 text-yellow-800"
                            : ticket.status === SupportTicketStatus.RESOLVED
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {ticket.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
