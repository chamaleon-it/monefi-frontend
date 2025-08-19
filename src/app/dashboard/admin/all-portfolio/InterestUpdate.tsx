"use client";

import { useState } from "react";
import { Trash2, Plus, Calendar, DollarSign } from "lucide-react";
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
     interest:{
        date:Date,
        amount:number,
        _id:string,
      }[];
  };
  portfolioMutate: () => void;
}

export default function InterestUpdate({ tx,portfolioMutate }: Props) {

  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
      try {
          e.preventDefault();
          if (!newAmount || !newDate) return;
      
          const newEntry = {
            id: tx._id,
            amount: parseFloat(newAmount),
            date: new Date(newDate),
          };
          
    await toast.promise(api.patch("/portfolio/update_interest", newEntry), {
      loading: "Adding interest....",
      success: ({ data }) => data.message,
      error: "Somthing is error, Please try again.",
    });
    portfolioMutate();
    setNewAmount("");
    setNewDate("");
} catch (error) {
    console.log(error);
}
  };

  const deleteInterest = async(id:string) =>{
    try {
        await toast.promise(api.patch('/portfolio/delete_interest', {id:tx._id,interestId:id} ),{
            loading:"Removing interest.",
            error:"Somthing is error, Please try again.",
            success: ({ data }) => data.message
        })
        portfolioMutate();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-2.5 py-1 bg-green-500 text-black/70 rounded-md font-semibold cursor-pointer">
          Update Interest
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
           <p className="text-emerald-500 text-xl">£</p>
            Interest Management
          </DialogTitle>
          <DialogDescription>
            Manage your interest entries. Add new entries or remove existing
            ones.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Interest
                  </p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {fCurrency(tx.interest.reduce((a,b)=>a+b.amount,0))}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Entries
                  </p>
                  <p className="text-2xl font-bold">{tx.interest.length}</p>
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
                  <TableHead className="w-24 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tx.interest.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No interest entries found. Add your first entry below.
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
                              <AlertDialogTitle>
                                Delete Interest Entry
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this interest
                                entry of {fCurrency(entry.amount)}? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={()=>deleteInterest(entry._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Add New Entry Form */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Enter amount"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date
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
                    <Label className="opacity-0">Action</Label>
                    <Button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      {false ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Entry
                        </>
                      )}
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
