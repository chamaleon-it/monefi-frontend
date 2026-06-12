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
import { fDate } from "@/utility/dateFormatters.ts";

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
        <Button className="px-2.5 py-1 bg-green-500 text-black/70 rounded-md font-semibold cursor-pointer">
          Payment Schedule
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-[700px] !max-w-[700px] !max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <p className="text-emerald-500 text-xl">£</p>
            Payment Schedule
          </DialogTitle>
          <DialogDescription>
            View your scheduled payments and their current status.
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {tx.interest.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No payment entries found.
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
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
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
