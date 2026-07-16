"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import { fDateAndTime } from "@/utility/dateFormatters.ts";
import { fName } from "@/utility/fName";
import toast from "react-hot-toast";
import api from "@/services/api";
import getConfig from "@/config/configuration";

interface Application {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  accountType: "Individual" | "Joint" | "Company" | "Trust";
  referenceNumber?: string;

  // Old flat schema fields (legacy support)
  email?: string;
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
  identityVerification?: string;
  identityVerificationFile?: string;
  backIdentityVerificationFile?: string;
  proofOfAddress?: string;
  proofOfAddressFile?: string;
  backProofOfAddressFile?: string;
  purposeOfAccount?: string;
  bankAccount?: string;
  bankAccountDetails?: {
    bankName?: string;
    branchName?: string;
    accountName?: string;
    accountNumber?: string;
    sortCode?: string;
  };
  nextOfKinName?: {
    name: string;
    homePhone: string;
    mobilePhone: string;
    email: string;
  };
  company?: {
    name?: string;
    companyType?: "Public" | "Proprietary";
    companyNumber?: string;
    taxCode?: string;
    taxCodeExemption?: "Yes" | "No";
    dateOfRegistration?: string;
    natureOfBusiness?: string;
    category?: string;
    address?: string;
    streetName?: string;
    town?: string;
    region?: string;
    postcode?: string;
    country?: string;
    companyTaxInformation?: string;
    companyOwnership?: "Yes" | "No";
  };
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

  // New schema fields
  personalDetails?: {
    title: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth: string;
    occupation: string;
    role?: string;
  };
  residentialAddress?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postcode: string;
    country: string;
  };
  contactDetails?: {
    homePhoneCode?: string;
    homePhone?: string;
    mobilePhoneCode: string;
    mobilePhone: string;
    emailAddress: string;
  };
  documents?: {
    identityVerificationFile?: string | null;
    identityVerificationEmailLater?: boolean;
    proofOfAddressFile?: string | null;
    proofOfAddressEmailLater?: boolean;
    certificateOfIncorporationFile?: string | null;
    certificateOfIncorporationEmailLater?: boolean;
    proofOfRegisteredAddressFile?: string | null;
    proofOfRegisteredAddressEmailLater?: boolean;
    trustDeedFile?: string | null;
    trustDeedEmailLater?: boolean;
  };
  additionalQuestions?: {
    financialAdviser: string;
    employmentStatus: string;
    occupation: string;
    employerName: string;
    industrySector: string;
    annualIncomeRange: string;
    netWorth: string;
    liquidAssets: string;
    expectedInvestmentAmount: string;
    sourceOfFunds: string;
    pep: string;
    pepFamily: string;
  };
  settlementDetails?: {
    beneficiaryAccountName: string;
    nameOfBank: string;
    accountNumber: string;
    sortCode: string;
  };
  agreedToTerms?: boolean;
  companyDetails?: {
    companyName: string;
    registrationNumber: string;
    vatNumber?: string;
    dateOfIncorporation: string;
    natureOfBusiness: string;
    registeredAddress: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      postcode: string;
      country: string;
    };
    companyClassification: string;
    taxClassification: string;
    officers: {
      title: string;
      firstName: string;
      middleName?: string;
      lastName: string;
      dateOfBirth: string;
      occupation: string;
      role?: string;
    }[];
    owns25Percent: string;
  };
  jointDetails?: {
    personalDetails: {
      title: string;
      firstName: string;
      middleName?: string;
      lastName: string;
      dateOfBirth: string;
      occupation: string;
      role?: string;
    };
    residentialAddress: {
      addressLine1: string;
      addressLine2?: string;
      city: string;
      postcode: string;
      country: string;
    };
    contactDetails: {
      homePhoneCode?: string;
      homePhone?: string;
      mobilePhoneCode: string;
      mobilePhone: string;
      emailAddress: string;
    };
    documents: {
      identityVerificationFile?: string | null;
      identityVerificationEmailLater?: boolean;
      proofOfAddressFile?: string | null;
      proofOfAddressEmailLater?: boolean;
    };
  };
  trustDetails?: {
    trusteeType: string;
    trustName: string;
    trustType: string;
    vatNumber?: string;
    taxReference: string;
    countryEstablished: string;
    natureOfTrust: string;
    taxClassification: string;
    hasGIIN: string;
    giinValue?: string;
  };
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

  const { data, isLoading, mutate } = useSWR<ApplicationsApiResponse>(apiUrl);

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

  const getCleanFileName = (path: string | null | undefined) => {
    if (!path) return '';
    return path.substring(path.lastIndexOf('/') + 1);
  };

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
        <h1 className="text-2xl font-bold text-bakerjonesholdings-black">Applications</h1>
        <select
          value={filter.limit}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bakerjonesholdings-pink"
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
              <tr className="border-b text-left text-sm font-medium text-bakerjonesholdings-black bg-bakerjonesholdings-off-pink">
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
                  {applications.map((application, i) => {
                    const name = application.personalDetails
                      ? `${application.personalDetails.title || ''} ${application.personalDetails.firstName || ''} ${application.personalDetails.lastName || ''}`.trim()
                      : `${application.title || ''} ${application.firstName || ''} ${application.lastName || ''}`.trim();
                    const email = application.contactDetails?.emailAddress || application.email || '—';

                    return (
                      <tr
                        key={application._id}
                        className="border-b bg-bakerjonesholdings-off-pink"
                      >
                        <td className="py-3 px-4 text-sm">
                          {(filter.page - 1) * filter.limit + i + 1}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-800">
                          <div className="flex flex-col">
                            <p className="font-bold">{fName(name || '—')}</p>
                            <p className="text-sm">{email}</p>
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
                    );
                  })}
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
          <p className="text-sm text-bakerjonesholdings-black">
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
                    ? "bg-bakerjonesholdings-pink text-white"
                    : "text-bakerjonesholdings-black hover:bg-gray-100"
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
        <div className="fixed inset-0 bg-black/35 bg-opacity-50 flex items-center justify-center z-50" data-lenis-prevent>
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 shadow-xl overflow-y-auto max-h-[90vh] space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Application Details - <span className="font-mono text-base bg-slate-100 px-2 py-0.5 rounded">{selectedApplication.referenceNumber || '—'}</span>
              </h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-500 hover:text-black text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <p>
                <strong>Email Address:</strong> {selectedApplication.contactDetails?.emailAddress || selectedApplication.email || '—'}
              </p>
              <p>
                <strong>Account Type:</strong> {selectedApplication.accountType}
              </p>
              <p>
                <strong>Title:</strong> {selectedApplication.personalDetails?.title || selectedApplication.title || '—'}
              </p>
              <p>
                <strong>First Name:</strong> {selectedApplication.personalDetails?.firstName || selectedApplication.firstName || '—'}
              </p>
              {(selectedApplication.personalDetails?.middleName) && (
                <p>
                  <strong>Middle Name:</strong> {selectedApplication.personalDetails?.middleName}
                </p>
              )}
              <p>
                <strong>Last Name:</strong> {selectedApplication.personalDetails?.lastName || selectedApplication.lastName || '—'}
              </p>
              <p>
                <strong>Date of Birth:</strong> {selectedApplication.personalDetails?.dateOfBirth || selectedApplication.dateOfBirth || '—'}
              </p>
              <p>
                <strong>Occupation:</strong> {selectedApplication.personalDetails?.occupation || selectedApplication.occupation || '—'}
              </p>
              {selectedApplication.personalDetails?.role && (
                <p>
                  <strong>Role / Capacity:</strong> {selectedApplication.personalDetails?.role}
                </p>
              )}
              <p>
                <strong>Home Phone:</strong> {selectedApplication.contactDetails ? (selectedApplication.contactDetails.homePhone ? `${selectedApplication.contactDetails.homePhoneCode || ''} ${selectedApplication.contactDetails.homePhone}` : '—') : (selectedApplication.homePhone || '—')}
              </p>
              <p>
                <strong>Mobile Phone:</strong> {selectedApplication.contactDetails ? (selectedApplication.contactDetails.mobilePhone ? `${selectedApplication.contactDetails.mobilePhoneCode || ''} ${selectedApplication.contactDetails.mobilePhone}` : '—') : (selectedApplication.mobilePhone || '—')}
              </p>
              <p>
                <strong>Residential Address:</strong>{" "}
                {selectedApplication.residentialAddress ? (
                  `${selectedApplication.residentialAddress.addressLine1}, ${selectedApplication.residentialAddress.addressLine2 || ''}, ${selectedApplication.residentialAddress.city}, ${selectedApplication.residentialAddress.postcode}, ${selectedApplication.residentialAddress.country}`.replace(/, ,/g, ',').trim()
                ) : (
                  `${selectedApplication.houseNumberOrName || ''} ${selectedApplication.streetName || ''}, ${selectedApplication.town || ''}, ${selectedApplication.region || ''}, ${selectedApplication.postcode || ''}, ${selectedApplication.country || ''}`.replace(/^[ ,]+|[ ,]+$/g, '').replace(/, ,/g, ',').trim() || '—'
                )}
              </p>
            </div>

            {/* Document Verification Files */}
            <div className="border-t pt-4 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Verification Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-600 mb-1">Identity Verification:</p>
                  {(() => {
                    const idFile = selectedApplication.documents?.identityVerificationFile || selectedApplication.identityVerificationFile;
                    const idEmailLater = selectedApplication.documents?.identityVerificationEmailLater || selectedApplication.identityVerification === 'Email Identification';
                    if (idFile) {
                      return (
                        <a
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 underline font-medium"
                          href={getConfig().backendURL + idFile}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View ID ({getCleanFileName(idFile)})
                        </a>
                      );
                    } else if (idEmailLater) {
                      return <span className="text-amber-600 font-medium">Will email later</span>;
                    } else {
                      return <span className="text-red-500">Not provided</span>;
                    }
                  })()}
                </div>

                <div>
                  <p className="font-semibold text-gray-600 mb-1">Proof of Address:</p>
                  {(() => {
                    const proofFile = selectedApplication.documents?.proofOfAddressFile || selectedApplication.proofOfAddressFile;
                    const proofEmailLater = selectedApplication.documents?.proofOfAddressEmailLater || selectedApplication.proofOfAddress === 'Email Proof of Address';
                    if (proofFile) {
                      return (
                        <a
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 underline font-medium"
                          href={getConfig().backendURL + proofFile}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Proof ({getCleanFileName(proofFile)})
                        </a>
                      );
                    } else if (proofEmailLater) {
                      return <span className="text-amber-600 font-medium">Will email later</span>;
                    } else {
                      return <span className="text-red-500">Not provided</span>;
                    }
                  })()}
                </div>

                {selectedApplication.accountType === 'Company' && (
                  <>
                    <div>
                      <p className="font-semibold text-gray-600 mb-1">Certificate of Incorporation:</p>
                      {selectedApplication.documents?.certificateOfIncorporationFile ? (
                        <a
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 underline font-medium"
                          href={getConfig().backendURL + selectedApplication.documents.certificateOfIncorporationFile}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Certificate ({getCleanFileName(selectedApplication.documents.certificateOfIncorporationFile)})
                        </a>
                      ) : selectedApplication.documents?.certificateOfIncorporationEmailLater ? (
                        <span className="text-amber-600 font-medium">Will email later</span>
                      ) : (
                        <span className="text-red-500">Not provided</span>
                      )}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-600 mb-1">Proof of Registered Address:</p>
                      {selectedApplication.documents?.proofOfRegisteredAddressFile ? (
                        <a
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 underline font-medium"
                          href={getConfig().backendURL + selectedApplication.documents.proofOfRegisteredAddressFile}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Proof of Address ({getCleanFileName(selectedApplication.documents.proofOfRegisteredAddressFile)})
                        </a>
                      ) : selectedApplication.documents?.proofOfRegisteredAddressEmailLater ? (
                        <span className="text-amber-600 font-medium">Will email later</span>
                      ) : (
                        <span className="text-red-500">Not provided</span>
                      )}
                    </div>
                  </>
                )}

                {selectedApplication.accountType === 'Trust' && (
                  <div>
                    <p className="font-semibold text-gray-600 mb-1">Trust Deed:</p>
                    {selectedApplication.documents?.trustDeedFile ? (
                      <a
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 underline font-medium"
                        href={getConfig().backendURL + selectedApplication.documents.trustDeedFile}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Trust Deed ({getCleanFileName(selectedApplication.documents.trustDeedFile)})
                      </a>
                    ) : selectedApplication.documents?.trustDeedEmailLater ? (
                      <span className="text-amber-600 font-medium">Will email later</span>
                    ) : (
                      <span className="text-red-500">Not provided</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Questions */}
            <div className="border-t pt-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><strong>Financial Adviser:</strong> {selectedApplication.additionalQuestions?.financialAdviser || '—'}</p>
                <p><strong>Employment Status:</strong> {selectedApplication.additionalQuestions?.employmentStatus || '—'}</p>
                <p><strong>Occupation:</strong> {selectedApplication.additionalQuestions?.occupation || selectedApplication.occupation || '—'}</p>
                <p><strong>Employer Name:</strong> {selectedApplication.additionalQuestions?.employerName || '—'}</p>
                <p><strong>Industry / Sector:</strong> {selectedApplication.additionalQuestions?.industrySector || '—'}</p>
                <p><strong>Annual Income:</strong> {selectedApplication.additionalQuestions?.annualIncomeRange || '—'}</p>
                <p><strong>Net Worth:</strong> {selectedApplication.additionalQuestions?.netWorth || '—'}</p>
                <p><strong>Liquid Assets:</strong> {selectedApplication.additionalQuestions?.liquidAssets || '—'}</p>
                <p><strong>Expected Investment:</strong> {selectedApplication.additionalQuestions?.expectedInvestmentAmount || '—'}</p>
                <p><strong>Source of Funds:</strong> {selectedApplication.additionalQuestions?.sourceOfFunds || '—'}</p>
                <p><strong>PEP (Politically Exposed):</strong> {selectedApplication.additionalQuestions?.pep || '—'}</p>
                <p><strong>PEP Family:</strong> {selectedApplication.additionalQuestions?.pepFamily || '—'}</p>
              </div>
            </div>

            {/* Settlement */}
            <div className="border-t pt-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">Settlement Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><strong>Beneficiary Account Name:</strong> {selectedApplication.settlementDetails?.beneficiaryAccountName || selectedApplication.bankAccountDetails?.accountName || '—'}</p>
                <p><strong>Bank Name:</strong> {selectedApplication.settlementDetails?.nameOfBank || selectedApplication.bankAccountDetails?.bankName || '—'}</p>
                <p><strong>Account Number:</strong> {selectedApplication.settlementDetails?.accountNumber || selectedApplication.bankAccountDetails?.accountNumber || '—'}</p>
                <p><strong>Sort Code:</strong> {selectedApplication.settlementDetails?.sortCode || selectedApplication.bankAccountDetails?.sortCode || '—'}</p>
              </div>
            </div>

            {/* Joint Details */}
            {selectedApplication.accountType === "Joint" && (selectedApplication.jointDetails || selectedApplication.jointHolder) && (
              <div className="border-t pt-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Joint Applicant Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <p><strong>Name:</strong> {selectedApplication.jointDetails ? (
                    `${selectedApplication.jointDetails.personalDetails.title} ${selectedApplication.jointDetails.personalDetails.firstName} ${selectedApplication.jointDetails.personalDetails.lastName}`
                  ) : (
                    `${selectedApplication.jointHolder?.title || ''} ${selectedApplication.jointHolder?.firstName || ''} ${selectedApplication.jointHolder?.lastName || ''}`.trim() || '—'
                  )}</p>
                  <p><strong>Date of Birth:</strong> {selectedApplication.jointDetails?.personalDetails.dateOfBirth || selectedApplication.jointHolder?.dateOfBirth || '—'}</p>
                  <p><strong>Occupation:</strong> {selectedApplication.jointDetails?.personalDetails.occupation || selectedApplication.jointHolder?.occupation || '—'}</p>
                  <p><strong>Email Address:</strong> {selectedApplication.jointDetails?.contactDetails.emailAddress || '—'}</p>
                  <p><strong>Mobile:</strong> {selectedApplication.jointDetails ? (
                    `${selectedApplication.jointDetails.contactDetails.mobilePhoneCode || ''} ${selectedApplication.jointDetails.contactDetails.mobilePhone}`
                  ) : (
                    selectedApplication.jointHolder?.mobilePhone || '—'
                  )}</p>
                  <p><strong>Address:</strong> {selectedApplication.jointDetails?.residentialAddress ? (
                    `${selectedApplication.jointDetails.residentialAddress.addressLine1}, ${selectedApplication.jointDetails.residentialAddress.addressLine2 || ''}, ${selectedApplication.jointDetails.residentialAddress.city}, ${selectedApplication.jointDetails.residentialAddress.postcode}, ${selectedApplication.jointDetails.residentialAddress.country}`.replace(/, ,/g, ',').trim()
                  ) : (
                    selectedApplication.jointHolder ? (
                      `${selectedApplication.jointHolder.houseNumberOrName || ''} ${selectedApplication.jointHolder.streetName || ''}, ${selectedApplication.jointHolder.town || ''}, ${selectedApplication.jointHolder.region || ''}, ${selectedApplication.jointHolder.postcode || ''}, ${selectedApplication.jointHolder.country || ''}`.replace(/^[ ,]+|[ ,]+$/g, '').replace(/, ,/g, ',').trim()
                    ) : '—'
                  )}</p>
                </div>
              </div>
            )}

            {/* Company Details */}
            {selectedApplication.accountType === "Company" && (selectedApplication.companyDetails || selectedApplication.company) && (
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <p><strong>Company Name:</strong> {selectedApplication.companyDetails?.companyName || selectedApplication.company?.name || '—'}</p>
                  <p><strong>Registration Number:</strong> {selectedApplication.companyDetails?.registrationNumber || selectedApplication.company?.companyNumber || '—'}</p>
                  {((selectedApplication.companyDetails?.vatNumber || selectedApplication.company?.taxCode)) && (
                    <p><strong>VAT Number:</strong> {selectedApplication.companyDetails?.vatNumber || selectedApplication.company?.taxCode}</p>
                  )}
                  <p><strong>Date of Incorporation:</strong> {selectedApplication.companyDetails?.dateOfIncorporation || selectedApplication.company?.dateOfRegistration || '—'}</p>
                  <p><strong>Nature of Business:</strong> {selectedApplication.companyDetails?.natureOfBusiness || selectedApplication.company?.natureOfBusiness || '—'}</p>
                  <p><strong>Address:</strong> {selectedApplication.companyDetails?.registeredAddress ? (
                    `${selectedApplication.companyDetails.registeredAddress.addressLine1}, ${selectedApplication.companyDetails.registeredAddress.addressLine2 || ''}, ${selectedApplication.companyDetails.registeredAddress.city}, ${selectedApplication.companyDetails.registeredAddress.postcode}, ${selectedApplication.companyDetails.registeredAddress.country}`.replace(/, ,/g, ',').trim()
                  ) : (
                    selectedApplication.company ? (
                      `${selectedApplication.company.address || ''} ${selectedApplication.company.streetName || ''}, ${selectedApplication.company.town || ''}, ${selectedApplication.company.region || ''}, ${selectedApplication.company.postcode || ''}, ${selectedApplication.company.country || ''}`.replace(/^[ ,]+|[ ,]+$/g, '').replace(/, ,/g, ',').trim()
                    ) : '—'
                  )}</p>
                  <p><strong>Classification:</strong> {selectedApplication.companyDetails?.companyClassification || selectedApplication.company?.companyType || '—'}</p>
                  <p><strong>Tax Classification:</strong> {selectedApplication.companyDetails?.taxClassification || selectedApplication.company?.companyTaxInformation || '—'}</p>
                  <p><strong>Owns 25% or more shares?</strong> {selectedApplication.companyDetails?.owns25Percent || selectedApplication.company?.companyOwnership || '—'}</p>
                </div>

                {selectedApplication.companyDetails?.officers && selectedApplication.companyDetails.officers.length > 0 && (
                  <div className="pt-2">
                    <p className="font-semibold text-gray-700 text-sm mb-2">Officers &amp; Directors:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedApplication.companyDetails.officers.map((officer, index) => (
                        <div key={index} className="p-3 bg-slate-50 rounded-lg text-xs">
                          <p className="font-semibold text-gray-600 mb-1">Officer #{index + 1}</p>
                          <p><strong>Name:</strong> {`${officer.title} ${officer.firstName} ${officer.lastName}`}</p>
                          <p><strong>DOB:</strong> {officer.dateOfBirth}</p>
                          <p><strong>Occupation:</strong> {officer.occupation}</p>
                          {officer.role && <p><strong>Role:</strong> {officer.role}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Trust Details */}
            {selectedApplication.accountType === "Trust" && selectedApplication.trustDetails && (
              <div className="border-t pt-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Trust Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <p><strong>Trustee Type:</strong> {selectedApplication.trustDetails.trusteeType}</p>
                  <p><strong>Trust Name:</strong> {selectedApplication.trustDetails.trustName}</p>
                  <p><strong>Trust Type:</strong> {selectedApplication.trustDetails.trustType}</p>
                  {selectedApplication.trustDetails.vatNumber && (
                    <p><strong>VAT Number:</strong> {selectedApplication.trustDetails.vatNumber}</p>
                  )}
                  <p><strong>UTR / Tax Reference:</strong> {selectedApplication.trustDetails.taxReference}</p>
                  <p><strong>Country Established:</strong> {selectedApplication.trustDetails.countryEstablished}</p>
                  <p><strong>Nature / Purpose of Trust:</strong> {selectedApplication.trustDetails.natureOfTrust}</p>
                  <p><strong>Tax Classification:</strong> {selectedApplication.trustDetails.taxClassification}</p>
                  <p><strong>Has GIIN?</strong> {selectedApplication.trustDetails.hasGIIN}</p>
                  {selectedApplication.trustDetails.giinValue && (
                    <p><strong>GIIN Code:</strong> {selectedApplication.trustDetails.giinValue}</p>
                  )}
                </div>
              </div>
            )}

            <div className="border-t pt-4 space-y-2 text-sm text-bakerjonesholdings-black">
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
                    mutate();
                    setSelectedApplication(null);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-bakerjonesholdings-pink rounded-lg hover:bg-pink-700 transition-colors duration-200 cursor-pointer"
              >
                Delete
              </button>

              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 text-sm font-medium text-white bg-bakerjonesholdings-pink rounded-lg hover:bg-pink-700 transition-colors duration-200 cursor-pointer"
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
