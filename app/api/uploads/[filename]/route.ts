import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  
  const filePath = path.join(process.cwd(), "public", "uploads", filename);

  if (!fs.existsSync(filePath)) {
    console.error("File not found at path:", filePath);
    return new NextResponse("File not found", { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);

    const ext = path.extname(filename).toLowerCase();
    let contentType = "image/jpeg";
    if (ext === ".png") contentType = "image/png";
    if (ext === ".webp") contentType = "image/webp";
    if (ext === ".gif") contentType = "image/gif";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error reading file:", error);
    return new NextResponse("Error loading image", { status: 500 });
  }
}