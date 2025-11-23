# Kumar Kosmetics E-Commerce

A premium e-commerce platform for Kumar Kosmetics, built with modern web technologies to provide a seamless and elegant shopping experience.

## Features

- **Product Catalog**: Browse a wide range of premium cosmetic products.
- **Product Details**: Detailed views for each product with descriptions and pricing.
- **Shopping Cart**: Fully functional cart to manage selected items.
- **Checkout Process**: Streamlined checkout flow.
- **User Authentication**: Secure Login, Signup, and Forgot Password functionality.
- **Skin Analyzer**: Interactive tool to help users find products suitable for their skin type.
- **Admin Dashboard**: Interface for managing the store.
- **Responsive Design**: Optimized for all devices, ensuring a great experience on mobile and desktop.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd kumar-kosmetics-e-commerce
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── app/                # (Legacy/Refactored)
├── components/         # Reusable UI components
│   ├── cart/           # Cart related components
│   ├── layout/         # Layout components (Header, Footer)
│   └── ...
├── pages/              # Application pages (Home, About, Products, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.jsx             # Main application component with routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## License

[MIT](LICENSE)
