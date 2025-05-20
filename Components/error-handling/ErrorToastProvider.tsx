"use client";

import React from 'react';
import { ErrorToastContainer } from './ErrorToast';

/**
 * A client component that provides the error toast container
 * This is needed because the error toast container uses hooks and must be a client component
 */
export function ErrorToastProvider() {
  return <ErrorToastContainer />;
}