import React from 'react';
import type { Metadata } from 'next';
import ApplicationFormContainer from './components/ApplicationFormContainer';

export const metadata: Metadata = {
  title: 'Client Portal | Online Application Form - Monefi',
  description: 'Apply for an online investment account in minutes with our fast, secure application form.',
};

export default function NewApplicationFormPage() {
  return <ApplicationFormContainer />;
}
