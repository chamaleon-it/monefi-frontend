import React from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center">

        <div className="flex flex-col items-center justify-center">
          <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="h-10 w-10 text-red-500" />
          </div>

          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
            Access Restricted
          </h2>

          <div className="mt-4 text-sm text-gray-500 space-y-3">
            <p className="text-base leading-relaxed">
              We're sorry, but Baker Jones Holdings services are currently not available in your region.
            </p>
            <p className="bg-gray-50 p-3 rounded-lg text-gray-700 border border-gray-200 mt-4">
              <strong>Reason:</strong> Your region is not permitted to access this service.
            </p>
            <p className="mt-4">
              If you believe this is an error and you are not accessing from this region, please try clearing your cookies, disabling your VPN, or contacting support.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="mailto:support@bakerjonesholdings.com"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-bakerjonesholdings-pink hover:bg-bakerjonesholdings-pink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bakerjonesholdings-pink transition-all w-full"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}
