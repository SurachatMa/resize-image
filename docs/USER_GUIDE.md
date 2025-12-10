# User Guide

Welcome to the Image Optimizer User Guide. This document details how to use the advanced features of the application to get the best results for your images.

## Table of Contents

1. [Supported Formats](#1-supported-formats)
2. [Compression Quality](#2-compression-quality)
3. [Resize Modes](#3-resize-modes)

---

## 1. Supported Formats

You can convert your images to any of the following modern formats:

| Format   | Best For                  | Description                                                                                           |
| :------- | :------------------------ | :---------------------------------------------------------------------------------------------------- |
| **WebP** | **General Use**           | Google's modern format. Excellent balance of quality and file size. Supported by all modern browsers. |
| **AVIF** | **Maximum Compression**   | The next-gen format. Offers the smallest file sizes but takes slightly longer to process.             |
| **JPEG** | **Compatibility**         | Best for photographs when you need to support very old software. No transparency support.             |
| **PNG**  | **Graphics/Transparency** | Lossless compression. Best for screenshots, logos, or images with transparent backgrounds.            |

---

## 2. Compression Quality

The "Quality" slider (10-100%) controls how much data is discarded to save space.

- **High (80-90%)**: Virtually indistinguishable from the original.
- **Medium (60-75%)**: Best balance for websites. Good quality, small file size.
- **Low (40-50%)**: Visible artifacts may appear, but file size is tiny.

> 💡 **Tip**: For most web use cases, **80% WebP** is the sweet spot.

---

## 3. Resize Modes

When you specify **Custom Dimensions** (e.g., 480 x 480), you can choose how the image fits into that box.

### 📐 Fit (พอดี) - _Default_

Maintains the original aspect ratio. The image will be resized to fit **inside** the box without being cropped or distorted.

- **Result**: One dimension will match your target, the other might be smaller.

### ✂️ Cover (ตัดส่วน)

Fills the entire box by **cropping** the excess parts of the image.

- **Use Case**: Avatars, Thumbnails, Product grids where all images must be the same size.
- **Behavior**: Concentrates on the center of the image.

### ↔️ Fill (ยืด)

Fills the entire box by **stretching** the image.

- **Use Case**: Rarely used, unless you intentionally want to distort the image to fit specific dimensions.
- **Warning**: Aspect ratio is NOT preserved.
