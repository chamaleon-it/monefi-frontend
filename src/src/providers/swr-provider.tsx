'use client';

import api from '@/services/api';
import React from 'react';
import { SWRConfig } from 'swr';


type SWRProviderProps = {
  children: React.ReactNode;
};

const fetcher = async (url: string) => {
  const response = await api.get(url);
  return response?.data;
};

export const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (err, key) => {
          console.error(`SWR Error on ${key}:`, err);
        },
        revalidateOnFocus: true,
        dedupingInterval: 1000 * 60, // 1 minute
        shouldRetryOnError: true,
      }}
    >
      {children}
    </SWRConfig>
  );
};