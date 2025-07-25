"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { fDateAndTime } from "@/utility/dateFormatters.ts";
import { fName } from "@/utility/fName";
import toast from "react-hot-toast";
import api from "@/services/api";
import getConfig from "@/config/configuration";

interface Application {
  email: string;
  accountType: "Individual" | "Joint" | "Company";
  company?: {
    name?: string;
    companyType?: "Public" | "Proprietary";
    companyNumber?: string;
    taxCode?: string;
    taxCodeExemption?: "Yes" | "No";
    dateOfRegistration?: string;
    natureOfBusiness?: string;
    category?:
      | "Limited Company"
      | "Publicly Listed Company"
      | "Majority owned subsidiary of a listed company"
      | "Regulated company"
      | "None of the above";
    address?: string;
    streetName?: string;
    town?: string;
    region?: string;
    postcode?: string;
    country?: string;
    companyTaxInformation?:
      | "Financial Institution"
      | "Public Listed Company, Majority owned subsidiary of a Public Listed Company or a Registered Charity"
      | " Active Non-Financial Entity (NFE)"
      | "None of the above";

    companyOwnership?: "Yes" | "No";
  };
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  occupation: string;
  occupationCategory: string;
  homePhone: string;
  mobilePhone: string;
  password: string;
  confirmPassword: string;
  country: string;
  houseNumberOrName: string;
  streetName: string;
  town: string;
  region: string;
  postcode: string;
  jointHolder?: {
    title?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    occupation?: string;
    occupationCategory?: string;
    homePhone?: string;
    mobilePhone?: string;
    country?: string;
    houseNumberOrName?: string;
    streetName?: string;
    town?: string;
    region?: string;
    postcode?: string;
  };
  identityVerification:
    | "International travel document"
    | "Driving Licence"
    | "Email Identification";
    identityVerificationFile:string,
      backIdentityVerificationFile?:string,
  proofOfAddress: "Utility Bill" | "Driving Licence" | "Email Proof of Address";
  proofOfAddressFile:string
  backProofOfAddressFile?:string
  purposeOfAccount:
    | "Savings"
    | "Growth"
    | "Income"
    | "Retirement"
    | "Business account"
    | "Other";
  bankAccount:
    | "Provide Existing Bank Account Details"
    | "Email Existing Bank Account Details";
  bankAccountDetails?: {
    bankName?: string;
    branchName?: string;
    accountName?: string;
    accountNumber?: string;
    sortCode?: string;
  };
  nextOfKinName: {
    name: string;
    homePhone: string;
    mobilePhone: string;
    email: string;
  };
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

interface ApplicationsApiResponse {
  data: Application[];
  pagination: Pagination;
}

export default function ApplicationTable() {
  const [filter, setFilter] = useState({ page: 1, limit: 10 });

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: filter.page.toString(),
      limit: filter.limit.toString(),
    });
    return `/application_form?${params.toString()}`;
  }, [filter]);

  const { data, isLoading,mutate } = useSWR<ApplicationsApiResponse>(apiUrl);

  const applications = data?.data ?? [];
  const pagination = data?.pagination;

  const handlePageChange = (newPage: number) => {
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    setFilter({ page: 1, limit: newLimit });
  };

  const getPageNumbers = () => {
    if (!pagination) return [];
    const { page, totalPage } = pagination;
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPage, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} className="py-3 px-4">
          <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
        </td>
      ))}
    </tr>
  );

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-monefi-black">Applications</h1>
        <select
          value={filter.limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monefi-pink"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-gray-600 bg-monefi-off-pink">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Application Date</th>
                <th className="py-3 px-4">View</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: filter.limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}

              {!isLoading && applications.length > 0 && (
                <>
                  {applications.map((application, i) => (
                    <tr
                      key={application._id}
                      className="border-b bg-monefi-off-pink"
                    >
                      <td className="py-3 px-4 text-sm">
                        {(filter.page - 1) * filter.limit + i + 1}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        <div className="flex flex-col">
                          <p className="font-bold">
                            {" "}
                            {fName(
                              `${application.title} ${application.firstName} ${application.lastName}`
                            )}
                          </p>
                          <p className="text-sm">{application.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        {application.accountType}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        {fDateAndTime(application.createdAt)}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        <button
                          className="text-yellow-600 hover:text-yellow-800 text-sm font-medium cursor-pointer"
                          onClick={() => setSelectedApplication(application)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {!isLoading && applications.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && pagination.totalPage > 1 && (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-2 border border-gray-300 text-sm rounded-md disabled:opacity-50"
            >
              Previous
            </button>

            {getPageNumbers().map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`px-3 py-2 text-sm rounded-md border ${
                  num === pagination.page
                    ? "bg-monefi-pink text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPage}
              className="px-3 py-2 border border-gray-300 text-sm rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {selectedApplication && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50" data-lenis-prevent>
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 shadow-xl overflow-y-auto max-h-[90vh] space-y-4 overflow-auto">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Application Details
              </h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-500 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <p>
                <strong>Email:</strong> {selectedApplication.email}
              </p>
              <p>
                <strong>Account Type:</strong> {selectedApplication.accountType}
              </p>
              <p>
                <strong>Title:</strong> {selectedApplication.title}
              </p>
              <p>
                <strong>Name:</strong>{" "}
                {`${selectedApplication.firstName} ${selectedApplication.lastName}`}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {selectedApplication.dateOfBirth}
              </p>
              <p>
                <strong>Occupation:</strong> {selectedApplication.occupation}
              </p>
              <p>
                <strong>Occupation Category:</strong>{" "}
                {selectedApplication.occupationCategory}
              </p>
              <p>
                <strong>Home Phone:</strong> {selectedApplication.homePhone}
              </p>
              <p>
                <strong>Mobile Phone:</strong> {selectedApplication.mobilePhone}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${selectedApplication.houseNumberOrName}, ${selectedApplication.streetName}, ${selectedApplication.town}, ${selectedApplication.region}, ${selectedApplication.postcode}, ${selectedApplication.country}`}
              </p>
              <p>
                <strong>Identity Verification:</strong>{" "}
                {selectedApplication.identityVerification}
              </p>
              {selectedApplication.identityVerification !== "Email Identification" &&<p>
                <strong>Identity File:</strong>{" "}
                <div className="flex gap-2.5">

               <a className="px-2 py-0.5 rounded-md border" href={getConfig().backendURL+selectedApplication.identityVerificationFile} target="_blank" rel="noopener noreferrer">View File</a>
                {selectedApplication.backIdentityVerificationFile && <a className="px-2 py-0.5 rounded-md border" href={getConfig().backendURL+selectedApplication.backIdentityVerificationFile} target="_blank" rel="noopener noreferrer">View Back File</a>}
                </div>
              </p>}
              <p>
                <strong>Proof of Address:</strong>{" "}
                {selectedApplication.proofOfAddress}
              </p>
               {selectedApplication.proofOfAddress !== "Email Proof of Address" &&<p>
                <strong>Proof of Address File:</strong>{" "}
                <div className="flex gap-2.5">

               <a className="px-2 py-0.5 rounded-md border" href={getConfig().backendURL+selectedApplication.proofOfAddressFile} target="_blank" rel="noopener noreferrer">View File</a>
              {selectedApplication.backProofOfAddressFile && <a className="px-2 py-0.5 rounded-md border" href={getConfig().backendURL+selectedApplication.backProofOfAddressFile} target="_blank" rel="noopener noreferrer">View Back File</a>}
                </div>
              </p>}
              <p>
                <strong>Purpose of Account:</strong>{" "}
                {selectedApplication.purposeOfAccount}
              </p>
              <p>
                <strong>Bank Account:</strong> {selectedApplication.bankAccount}
              </p>
              <p>
                <strong>Bank Name:</strong>{" "}
                {selectedApplication.bankAccountDetails?.bankName}
              </p>
              <p>
                <strong>Branch Name:</strong>{" "}
                {selectedApplication.bankAccountDetails?.branchName}
              </p>
              <p>
                <strong>Account Name:</strong>{" "}
                {selectedApplication.bankAccountDetails?.accountName}
              </p>
              <p>
                <strong>Account Number:</strong>{" "}
                {selectedApplication.bankAccountDetails?.accountNumber}
              </p>
              <p>
                <strong>Sort Code:</strong>{" "}
                {selectedApplication.bankAccountDetails?.sortCode}
              </p>
            </div>

            {selectedApplication.accountType === "Company" &&
              selectedApplication.company && (
                <div className="border-t pt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedApplication.company.name}
                    </p>
                    <p>
                      <strong>Company Type:</strong>{" "}
                      {selectedApplication.company.companyType}
                    </p>
                    <p>
                      <strong>Company Number:</strong>{" "}
                      {selectedApplication.company.companyNumber}
                    </p>
                    <p>
                      <strong>Tax Code:</strong>{" "}
                      {selectedApplication.company.taxCode}
                    </p>
                    <p>
                      <strong>Tax Exemption:</strong>{" "}
                      {selectedApplication.company.taxCodeExemption}
                    </p>
                    <p>
                      <strong>Registration Date:</strong>{" "}
                      {selectedApplication.company.dateOfRegistration}
                    </p>
                    <p>
                      <strong>Nature of Business:</strong>{" "}
                      {selectedApplication.company.natureOfBusiness}
                    </p>
                    <p>
                      <strong>Category:</strong>{" "}
                      {selectedApplication.company.category}
                    </p>
                    <p>
                      <strong>Company Ownership:</strong>{" "}
                      {selectedApplication.company.companyOwnership}
                    </p>
                    <p>
                      <strong>Tax Information:</strong>{" "}
                      {selectedApplication.company.companyTaxInformation}
                    </p>
                    <p>
                      <strong>Company Address:</strong>{" "}
                      {`${selectedApplication.company.streetName}, ${selectedApplication.company.town}, ${selectedApplication.company.region}, ${selectedApplication.company.postcode}, ${selectedApplication.company.country}`}
                    </p>
                  </div>
                </div>
              )}

            {selectedApplication.accountType === "Joint" &&
              selectedApplication.jointHolder && (
                <div className="border-t pt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Joint Holder Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p>
                      <strong>Title:</strong>{" "}
                      {selectedApplication.jointHolder.title}
                    </p>
                    <p>
                      <strong>Name:</strong>{" "}
                      {`${selectedApplication.jointHolder.firstName} ${selectedApplication.jointHolder.lastName}`}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {selectedApplication.jointHolder.dateOfBirth}
                    </p>
                    <p>
                      <strong>Occupation:</strong>{" "}
                      {selectedApplication.jointHolder.occupation}
                    </p>
                    <p>
                      <strong>Occupation Category:</strong>{" "}
                      {selectedApplication.jointHolder.occupationCategory}
                    </p>
                    <p>
                      <strong>Home Phone:</strong>{" "}
                      {selectedApplication.jointHolder.homePhone}
                    </p>
                    <p>
                      <strong>Mobile Phone:</strong>{" "}
                      {selectedApplication.jointHolder.mobilePhone}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {`${selectedApplication.jointHolder.houseNumberOrName}, ${selectedApplication.jointHolder.streetName}, ${selectedApplication.jointHolder.town}, ${selectedApplication.jointHolder.region}, ${selectedApplication.jointHolder.postcode}, ${selectedApplication.jointHolder.country}`}
                    </p>
                  </div>
                </div>
              )}

            <div className="border-t pt-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Next of Kin
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p>
                  <strong>Name:</strong>{" "}
                  {selectedApplication.nextOfKinName.name}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {selectedApplication.nextOfKinName.email}
                </p>
                <p>
                  <strong>Home Phone:</strong>{" "}
                  {selectedApplication.nextOfKinName.homePhone}
                </p>
                <p>
                  <strong>Mobile Phone:</strong>{" "}
                  {selectedApplication.nextOfKinName.mobilePhone}
                </p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
              <p>
                <strong>Application ID:</strong> {selectedApplication._id}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {fDateAndTime(selectedApplication.createdAt)}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {fDateAndTime(selectedApplication.updatedAt)}
              </p>
            </div>

            <div className="flex justify-end gap-5 pt-4">
              <button
                onClick={async () => {
                  try {
                    await toast.promise(
                      api.delete(
                        `/application_form/${selectedApplication._id}`
                      ),
                      {
                        loading: "Deleting application...",
                        success: "Application deleted successfully.",
                        error:
                          "An error occurred. The application could not be deleted. Please try again later.",
                      }
                    );
                    mutate()
                    setSelectedApplication(null);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-monefi-pink rounded-lg hover:bg-pink-700 transition-colors duration-200"
              >
                Delete
              </button>

              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 text-sm font-medium text-white bg-monefi-pink rounded-lg hover:bg-pink-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
