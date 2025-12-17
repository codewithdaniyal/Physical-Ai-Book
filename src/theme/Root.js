import React from 'react';
import ChatBot from '@site/src/components/ChatBot';

// This wrapper makes the ChatBot appear on every page of your book
export default function Root({children}) {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
}