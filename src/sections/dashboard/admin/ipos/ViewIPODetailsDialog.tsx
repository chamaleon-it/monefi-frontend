"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { fDate } from "@/utility/dateFormatters.ts";
import { fCurrency } from "@/utility/numberFormatters";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface IpoDetails {
  _id: string
  name: string
  companyName: string
  stockSymbol: string
  openDate: string
  closeDate: string
  listingDate: string
  priceBandMin: number
  priceBandMax: number
  lotSize: number
  issueSize: number
  companyDescription?: string
  officialWebsite?: string
  status: string
  isPublic: boolean
  createdAt: string
  totalRequests: number
  approvedRequests: number
  pendingRequests: number
  rejectedRequests: number
}

interface ViewIPODetailsDialogProps {
  ipoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewIPODetailsDialog({ ipoId, open, onOpenChange }: ViewIPODetailsDialogProps) {
  const [details, setDetails] = useState<IpoDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && ipoId) {
      setLoading(true);
      api.get(`/ipos/${ipoId}/details`)
        .then((res) => {
          setDetails(res.data.data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, ipoId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Open</span>;
      case "Closed":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Closed</span>;
      case "Listed":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Listed</span>;
      case "Upcoming":
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Upcoming</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white text-bakerjonesholdings-black">
        <DialogHeader>
          <DialogTitle>IPO Details</DialogTitle>
          <DialogDescription>
            Full details and request statistics for this IPO.
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="py-10 text-center text-gray-500">Loading details...</div>
        )}

        {!loading && details && (
          <div className="space-y-6 py-4">
            {/* Basic Information */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">IPO Name</span>
                  <p className="font-medium">{details.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">Company Name</span>
                  <p className="font-medium">{details.companyName}</p>
                </div>
                <div>
                  <span className="text-gray-500">Stock Symbol</span>
                  <p className="font-semibold">{details.stockSymbol}</p>
                </div>
                <div>
                  <span className="text-gray-500">Status</span>
                  <p className="mt-1">{getStatusBadge(details.status)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Visibility</span>
                  <p className="font-medium">{details.isPublic ? "Public" : "Hidden"}</p>
                </div>
                <div>
                  <span className="text-gray-500">Created At</span>
                  <p className="font-medium">{fDate(details.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium border-b pb-2">Timeline</h3>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Open Date</span>
                  <p className="font-medium">{fDate(details.openDate)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Close Date</span>
                  <p className="font-medium">{fDate(details.closeDate)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Listing Date</span>
                  <p className="font-medium">{fDate(details.listingDate)}</p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium border-b pb-2">Pricing</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Price Band</span>
                  <p className="font-medium">{fCurrency(details.priceBandMin)} - {fCurrency(details.priceBandMax)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Lot Size</span>
                  <p className="font-medium">{details.lotSize}</p>
                </div>
                <div>
                  <span className="text-gray-500">Issue Size</span>
                  <p className="font-medium">{details.issueSize}</p>
                </div>
              </div>
            </div>

            {/* Request Statistics */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium border-b pb-2">Request Statistics</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-bakerjonesholdings-black">{details.totalRequests}</p>
                  <p className="text-xs text-gray-500">Total Requests</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-green-700">{details.approvedRequests}</p>
                  <p className="text-xs text-gray-500">Approved (Sold)</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-700">{details.pendingRequests}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-red-700">{details.rejectedRequests}</p>
                  <p className="text-xs text-gray-500">Rejected</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {(details.companyDescription || details.officialWebsite) && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium border-b pb-2">Additional Information</h3>
                {details.companyDescription && (
                  <div className="text-sm">
                    <span className="text-gray-500">Description</span>
                    <p className="font-medium mt-1">{details.companyDescription}</p>
                  </div>
                )}
                {details.officialWebsite && (
                  <div className="text-sm">
                    <span className="text-gray-500">Website</span>
                    <p className="font-medium mt-1">
                      <a href={details.officialWebsite} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        {details.officialWebsite}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!loading && !details && (
          <div className="py-10 text-center text-gray-500">Failed to load IPO details.</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
