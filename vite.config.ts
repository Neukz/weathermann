import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		esbuildOptions: {
			// See: https://github.com/vitejs/vite/issues/6675
			plugins: [esbuildCommonjs(['react-moment'])]
		}
	}
});
