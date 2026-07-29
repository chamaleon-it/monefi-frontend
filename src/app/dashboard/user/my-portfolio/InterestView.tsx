"use client";

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
import { fCurrency } from "@/utility/numberFormatters";
import { fDate } from "@/utility/dateFormatters";

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
    certificate?: string | null;
    interest: {
      date: Date;
      amount: number;
      paymentType?: string;
      status?: string;
      _id: string;
    }[];
  };
}

export default function InterestView({ tx }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#082348] text-white hover:bg-[#0B2A54] font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-2xs cursor-pointer transition-colors">
          Payment Schedule
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-[700px] !max-w-[700px] !max-h-[85vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 font-inter">
        <DialogHeader className="border-b border-slate-100 pb-4">
          <DialogTitle className="flex items-center gap-2 font-serif font-bold text-2xl text-[#082348]">
            <span className="text-[#C5A880] text-2xl font-serif">£</span>
            Payment & Yield Schedule
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-xs mt-1">
            View scheduled coupon distributions, dividend payments, and payout terms.
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
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100">
                {tx.interest.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-slate-400 text-sm"
                    >
                      No scheduled payment entries found.
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
                            className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                              }`}
                          >
                            {status}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
