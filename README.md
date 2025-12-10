# 🖼️ Image Optimizer

A modern, fast, and privacy-focused image compression and resizing web application built with Next.js 15 and Sharp.

## ✨ Features

- **High-Performance Processing**: Powered by [Sharp](https://sharp.pixelplumbing.com/), one of the fastest image processing modules for Node.js.
- **Modern Formats**: Support for **WebP**, **AVIF**, **PNG**, and **JPEG** output.
- **Smart Compression**: Adjust quality to balance file size and clarity.
- **Flexible Resizing**:
  - **Presets**: Access common standard sizes (4K, Full HD, HD, etc.) instantly.
  - **Custom Dimensions**: Define exact width and height.
  - **Resize Modes**:
    - **Fit (พอดี)**: Maintains aspect ratio within bounds.
    - **Cover (ตัดส่วน)**: Crops image to fill the exact dimensions (center-weighted).
    - **Fill (ยืด)**: Stretches image to fill dimensions.
- **Clean UI**: Beautiful, responsive interface with Dark Mode support.
- **Privacy First**: Files are processed in-memory and not stored on the server.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1.  Clone the repository:

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Run the development server:

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📖 Documentation

For detailed usage instructions, specifically regarding **Resize Modes** and **Formats**, please refer to the [User Guide](docs/USER_GUIDE.md).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
