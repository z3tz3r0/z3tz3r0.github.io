import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// oxlint-disable-next-line import/no-default-export -- Vite requires default export
export default defineConfig({
    base: "/",
    plugins: [react(), tailwindcss()],
    resolve: {
        tsconfigPaths: true,
    },
});
