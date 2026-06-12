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
import { fDate } from "@/utility/dateFormatters.ts";
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
        <Button className="px-2.5 py-1 bg-green-500 text-black/70 rounded-md font-semibold cursor-pointer">
          Payment Schedule
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-[800px] !max-w-[800px] !max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <p className="text-emerald-500 text-xl">£</p>
            Payment Schedule
          </DialogTitle>
          <DialogDescription>
            Manage your payment schedule entries. Add new entries, update status, or remove existing ones.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Payment No.</TableHead>
                  <TableHead>Payment Type</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-32 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tx.interest.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No payment entries found. Add your first entry below.
                    </TableCell>
                  </TableRow>
                ) : (
                  tx.interest.map((entry, index) => {
                    const status = entry.status || "Upcoming";
                    const paymentType = entry.paymentType || "Interest Payment";

                    return (
                      <TableRow key={entry._id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{paymentType}</TableCell>
                        <TableCell>{fDate(entry.date)}</TableCell>
                        <TableCell className="font-semibold text-gray-800">
                          {fCurrency(entry.amount)}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                              status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
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
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Entry</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this payment
                                  entry of {fCurrency(entry.amount)}? This action
                                  cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600"
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

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentType" className="flex items-center gap-2">
                      Payment Type
                    </Label>
                    <Select
                      value={newPaymentType}
                      onValueChange={setNewPaymentType}
                    >
                      <SelectTrigger>
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

                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Due Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount" className="flex items-center gap-2">
                      <p className="text-emerald-500 text-xl">£</p>
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Amount"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="opacity-0">Action</Label>
                    <Button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
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
