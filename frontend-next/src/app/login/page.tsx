// app/page.tsx
"use client";

import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import * as Dialog from "@radix-ui/react-dialog";

export default function VerificationPage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 space-y-4">
      <h1 className="text-2xl font-bold">Worldcoin Verification</h1>
      
      <div>
      <Dialog.Root></Dialog.Root>
        <IDKitWidget
          app_id="app_staging_169e21f6afc84b304749830067809632"
          action="verify-user"
          onSuccess={(result) => console.log(result)}
          credential_types={['orb', 'phone']}
          autoClose
        >
          {({ open }) => (
            <button 
              onClick={open}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Verify with World ID
            </button>
          )}
        </IDKitWidget>
      </div>
    </main>
  );
}