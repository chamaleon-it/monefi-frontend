"use client";

import { useState } from "react";
import { Trash2, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fCurrency } from "@/utility/numberFormatters";
import { fDate } from "@/utility/dateFormatters";
import toast from "react-hot-toast";
import api from "@/services/api";

interface Props {
  tx: {
    _id: string;
    symbol: string;
    quantity: number;
    unitPrice: number;
    totalValue: number;
    investmentType: string;
    createdAt: Date;
    buyBack: null | "Yes" | "No";
    user: {
      email: string;
      name: string;
    };
    certificate?: string | null;
    interest: {
      date: Date;
      amount: number;
      paymentType?: string;
      status?: string;
      _id: string;
    }[];
  };
  portfolioMutate: () => void;
}

export default function InterestUpdate({ tx, portfolioMutate }: Props) {
  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPaymentType, setNewPaymentType] = useState("Interest Payment");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!newAmount || !newDate) return;

      const newEntry = {
        id: tx._id,
        amount: parseFloat(newAmount),
        date: new Date(newDate),
        paymentType: newPaymentType,
        status: "Upcoming",
      };

      await toast.promise(api.patch("/portfolio/update_interest", newEntry), {
        loading: "Adding payment....",
        success: ({ data }) => data.message,
        error: "Something went wrong. Please try again.",
      });
      portfolioMutate();
      setNewAmount("");
      setNewDate("");
      setNewPaymentType("Interest Payment");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInterest = async (id: string) => {
    try {
      await toast.promise(
        api.patch("/portfolio/delete_interest", { id: tx._id, interestId: id }),
        {
          loading: "Removing payment...",
          error: "Something went wrong. Please try again.",
          success: ({ data }) => data.message,
        }
      );
      portfolioMutate();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (interestId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "Upcoming" ? "Completed" : "Upcoming";
      await toast.promise(
        api.patch("/portfolio/update_interest_status", {
          id: tx._id,
          interestId,
          status: newStatus,
        }),
        {
          loading: "Updating status...",
          error: "Something went wrong. Please try again.",
          success: "Status updated successfully.",
        }
      );
      portfolioMutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#082348] text-white hover:bg-[#0B2A54] font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-lg shadow-2xs cursor-pointer transition-colors">
          Payment Schedule
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-[800px] !max-w-[800px] !max-h-[85vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 font-inter">
        <DialogHeader className="border-b border-slate-100 pb-4">
          <DialogTitle className="flex items-center gap-2 font-serif font-bold text-2xl text-[#082348]">
            <span className="text-[#C5A880] text-2xl font-serif">£</span>
            Yield & Interest Payment Schedule
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-xs mt-1">
            Manage scheduled interest distributions, coupon payouts, and maturity terms.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <div className="border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80 border-b border-slate-200/80">
                  <TableHead className="w-20 text-[11px] font-bold uppercase tracking-wider text-[#082348]">No.</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider text-[#082348]">Payment Type</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider text-[#082348]">Due Date</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider text-[#082348]">Amount</TableHead>
                  <TableHead className="text-[11px] font-bold uppercase tracking-wider text-[#082348]">Status</TableHead>
                  <TableHead className="w-28 text-center text-[11px] font-bold uppercase tracking-wider text-[#082348]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {tx.interest.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-slate-400 text-sm"
                    >
                      No payment entries scheduled. Add your first payment below.
                    </TableCell>
                  </TableRow>
                ) : (
                  tx.interest.map((entry, index) => {
                    const status = entry.status || "Upcoming";
                    const paymentType = entry.paymentType || "Interest Payment";

                    return (
                      <TableRow key={entry._id} className="hover:bg-slate-50/80 transition-colors">
                        <TableCell className="font-mono text-xs text-slate-400">{index + 1}</TableCell>
                        <TableCell className="text-xs font-semibold text-slate-700">{paymentType}</TableCell>
                        <TableCell className="text-xs font-mono text-slate-500">{fDate(entry.date)}</TableCell>
                        <TableCell className="text-sm font-bold text-[#082348]">
                          {fCurrency(entry.amount)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border transition-colors ${status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                              }`}
                            onClick={() => toggleStatus(entry._id, status)}
                            title="Click to toggle status"
                          >
                            {status}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 font-inter">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="font-serif font-bold text-xl text-[#082348]">Delete Payment Entry</AlertDialogTitle>
                                <AlertDialogDescription className="text-slate-500 text-xs">
                                  Are you sure you want to delete this payment
                                  entry of {fCurrency(entry.amount)}? This action
                                  cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="mt-4">
                                <AlertDialogCancel className="rounded-xl border border-slate-200 font-semibold text-xs">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                                  onClick={() => deleteInterest(entry._id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <Card className="rounded-2xl border border-slate-200/90 shadow-2xs">
            <CardContent className="pt-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="paymentType" className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Payment Type
                    </Label>
                    <Select
                      value={newPaymentType}
                      onValueChange={setNewPaymentType}
                    >
                      <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-slate-50 text-xs font-semibold text-[#082348]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Interest Payment">
                          Interest Payment
                        </SelectItem>
                        <SelectItem value="Maturity & Final Payout">
                          Maturity & Final Payout
                        </SelectItem>
                        <SelectItem value="Dividend">Dividend</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="date" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                      Due Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      className="h-10 rounded-xl border-slate-200 bg-slate-50 text-xs font-semibold text-[#082348]"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="amount" className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                      <span className="text-[#C5A880] text-xs font-bold font-serif">£</span>
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Amount"
                      className="h-10 rounded-xl border-slate-200 bg-slate-50 text-xs font-semibold text-[#082348]"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="opacity-0 block text-[11px]">Action</Label>
                    <Button
                      type="submit"
                      className="w-full h-10 gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-2xs cursor-pointer hover:opacity-95 transition-opacity"
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Add Entry
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
