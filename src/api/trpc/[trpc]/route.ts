import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";


// This route dynamically chooses the appropriate handler for TRPC
// It uses a stub during static exports (e.g., GitHub Pages)

const isStaticExport = process.env.NEXT_PUBLIC_DISABLE_API === "true";

if (isStaticExport) {
  // Use the dummy handler that avoids breaking `next export`
  module.exports = require("./route-disabled");
} else {
  // Use the real TRPC API route
  module.exports = require("./route-trpc");
}

// /**
//  * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
//  * handling a HTTP request (e.g. when you make requests from Client Components).
//  */
// const createContext = async (req: NextRequest) => {
//   return createTRPCContext({
//     headers: req.headers,
//   });
// };

// const handler = (req: NextRequest) =>
//   fetchRequestHandler({
//     endpoint: "/api/trpc",
//     req,
//     router: appRouter,
//     createContext: () => createContext(req),
//     onError:
//       env.NODE_ENV === "development"
//         ? ({ path, error }) => {
//             console.error(
//               `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
//             );
//           }
//         : undefined,
//   });

// export { handler as GET, handler as POST };
