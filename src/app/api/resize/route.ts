import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

type OutputFormat = "jpeg" | "webp" | "png" | "avif";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const format = (formData.get("format") as OutputFormat) || "webp";
    const quality = parseInt(formData.get("quality") as string) || 80;
    const maxWidth = formData.get("maxWidth")
      ? parseInt(formData.get("maxWidth") as string)
      : null;
    const maxHeight = formData.get("maxHeight")
      ? parseInt(formData.get("maxHeight") as string)
      : null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Configure resize options
    const resizeOptions: sharp.ResizeOptions = {
      withoutEnlargement: true,
      fit: "inside",
    };

    // Set max dimensions if provided
    if (maxWidth) {
      resizeOptions.width = maxWidth;
    }
    if (maxHeight) {
      resizeOptions.height = maxHeight;
    }

    // If no size limits, use default max of 1920
    if (!maxWidth && !maxHeight) {
      resizeOptions.width = 1920;
    }

    // Start with sharp and resize
    let sharpInstance = sharp(buffer).resize(resizeOptions);

    let contentType: string;
    let extension: string;

    // Clamp quality between 10-100
    const clampedQuality = Math.max(10, Math.min(100, quality));

    // Apply format-specific compression
    switch (format) {
      case "webp":
        sharpInstance = sharpInstance.webp({
          quality: clampedQuality,
          effort: 6,
        });
        contentType = "image/webp";
        extension = "webp";
        break;

      case "avif":
        // AVIF is more efficient, scale quality down slightly
        const avifQuality = Math.max(10, clampedQuality - 15);
        sharpInstance = sharpInstance.avif({
          quality: avifQuality,
          effort: 6,
        });
        contentType = "image/avif";
        extension = "avif";
        break;

      case "png":
        // PNG is lossless, use compression level based on quality
        const compressionLevel = Math.round((100 - clampedQuality) / 11);
        sharpInstance = sharpInstance.png({
          compressionLevel: Math.min(9, Math.max(0, compressionLevel)),
          palette: clampedQuality < 80,
        });
        contentType = "image/png";
        extension = "png";
        break;

      case "jpeg":
      default:
        sharpInstance = sharpInstance.jpeg({
          quality: clampedQuality,
          mozjpeg: true,
          chromaSubsampling: clampedQuality >= 90 ? "4:4:4" : "4:2:0",
        });
        contentType = "image/jpeg";
        extension = "jpg";
        break;
    }

    const processedImageBuffer = await sharpInstance.toBuffer();
    const originalName = file.name.replace(/\.[^/.]+$/, "");

    return new NextResponse(processedImageBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="optimized-${originalName}.${extension}"`,
      },
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
