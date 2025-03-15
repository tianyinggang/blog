import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next"; // Import types if needed (though NextResponse is preferred)

type Data = { // Re-define Data type (optional, but good practice)
  name: string;
};

export async function GET(request: Request) { // Export async GET function
  const data: Data = { name: "John Doe - From App Route Handler" }; // Data with updated message
  return NextResponse.json(data); // Use NextResponse.json to return JSON response
}