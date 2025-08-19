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

import { Card, CardContent } from "@/components/ui/card";
import { fCurrency } from "@/utility/numberFormatters";
import { fDate } from "@/utility/dateFormatters.ts";
import { useMemo } from "react";


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
     interest:{
        date:Date,
        amount:number,
        _id:string,
      }[];
  };
}

export default function InterestView({ tx }: Props) {


  const totalInterest = useMemo(() => tx.interest.reduce((a,b)=>a+b.amount,0), [tx.interest])



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-2.5 py-1 bg-green-500 text-black/70 rounded-md font-semibold cursor-pointer">
          View Interest
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <p className="text-emerald-500 text-xl">£</p>
            
            Interest View
          </DialogTitle>
          <DialogDescription>
            Manage your interest entries.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">

 <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Initial Investment
                  </p>
                  <p className="text-2xl font-bold">{fCurrency(tx.totalValue)}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Interest Accrued
                  </p>
                  <p className="text-2xl font-bold ">
                    {fCurrency(totalInterest)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Value at Maturity
                  </p>
                  <p className="text-2xl font-bold text-emerald-600">{fCurrency(totalInterest + tx.totalValue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interest Entries Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">SL</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tx.interest.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No interest entries found.
                    </TableCell>
                  </TableRow>
                ) : (
                  tx.interest.map((entry, index) => (
                    <TableRow key={entry._id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-semibold">
                        {fCurrency(entry.amount)}
                      </TableCell>
                      <TableCell>{fDate(entry.date)}</TableCell>

                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
