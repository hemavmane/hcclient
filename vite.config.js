// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      verbose: true, // Log the compression process
      disable: false, // Disable compression
      threshold: 10240, // Only assets bigger than this size are processed
      algorithm: 'gzip', // Use gzip compression
      ext: '.gz', // Output file extension for gzip
    }),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress', // Use Brotli compression
      ext: '.br', // Output file extension for Brotli
    }),
  ],
});
