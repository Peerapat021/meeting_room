// src/app/layout.tsx

import Navbar from "@/app/components/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
         <Navbar />
        {children}
      </body>
    </html>
  );
}

// "use client";


// import { SessionProvider } from "next-auth/react";
// import Navbar from "@/app/components/navbar"

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="th">
//       <body>

//         <SessionProvider>
//           {children}
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }
