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
    <div className="space-y-6 font-inter">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348]">
            Advisory & Concierge Support
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            24/7 dedicated support desk and ticket inquiries with private client advisors
          </p>
        </div>

        {user?.role === UserRoles.USER && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md shadow-[#C5A880]/20 hover:opacity-95 transition-all cursor-pointer">
                Submit Inquiry Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-3xl p-6 border border-slate-200">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif font-bold text-[#082348]">
                  Concierge Support Desk
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Inquiry Subject
                  </label>
                  <Select
                    value={subject}
                    onValueChange={(value) =>
                      setSubject(value as SupportTicketSubject)
                    }
                  >
                    <SelectTrigger className="w-full h-11 bg-slate-50 border-slate-200 rounded-xl font-medium text-sm text-[#082348]">
                      <SelectValue placeholder="Select a subject category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-xl border border-slate-200">
                      {Object.values(SupportTicketSubject).map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Message Details
                  </label>
                  <textarea
                    className="w-full min-h-[140px] p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#082348] placeholder:text-slate-400 focus:bg-white focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all outline-none"
                    placeholder="Describe your inquiry or requirement..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
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

      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_rgba(8,35,72,0.04)] overflow-hidden">
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
                  <td className="py-4 px-4 text-sm text-gray-600 w-96">
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
