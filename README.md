# z3tz3r0.github.io - Personal Portfolio

This repository hosts the source code for my personal portfolio website, deployed at [https://z3tz3r0.github.io](https://z3tz3r0.github.io). The site showcases my skills, projects, and provides a way to contact me.

## About

This is my personal portfolio website, built to showcase my skills and projects as a full-stack developer. It includes information about my background, technical skills, a portfolio of my work, and contact information. The site is built using modern web technologies and is designed to be responsive and visually appealing.

## Features

- **About Me:** Introduction and background information.
- **Skills:** Overview of technical skills and programming languages.
- **Work:** Portfolio section highlighting key projects, including a full-stack e-commerce application and other previous works.
- **Contact:** Form or information for getting in touch.
- **Responsive Design:** Optimized for various devices.
- **Smooth Animations:** Utilizes Framer Motion for engaging UI interactions.
- **Modern UI Components:** Built using Radix UI and styled with Tailwind CSS.

## Technologies Used

- **Frontend:**
  - React (with React 19)
  - TypeScript
  - Vite
  - Tailwind CSS
  - Radix UI
  - Framer Motion
  - Lucide React (for icons)
  - Simple Icons
- **Tooling:**
  - ESLint (with TypeScript and React linting rules)
  - pnpm (package manager)

## Project Structure

- `public/`: Static assets like images and the favicon.
- `src/`: Contains the main application source code.
  - `components/`: Reusable React components, including UI elements (`ui/`).
  - `containers/`: Components that wrap other components or handle layout.
  - `lib/`: Utility functions.
  - `pages/`: Top-level components representing different sections/pages of the website (Hero, About, Skills, Work, Contact, Footer, NavBar).
- `ecommerce/`: Source code or assets related to the showcased e-commerce project.
- `previous-work/`: Contains source code or assets for other previous projects showcased on the portfolio.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/z3tz3r0/z3tz3r0.github.io.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd z3tz3r0.github.io
    ```
3.  Install dependencies using pnpm:
    ```bash
    pnpm install
    ```

## Running Locally

To start the development server:

```bash
pnpm run dev
```

This will typically start the server at `http://localhost:5173`.

## Building for Production

To build the project for production:

```bash
pnpm run build
```

This will generate the production-ready files in the `dist/` directory.

## Linting

To run the linter:

```bash
pnpm run lint
```

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.
