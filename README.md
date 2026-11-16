# Nashville Kennels frontend

Requires Node.js 22.12+ on the 22.x, 24.x, or newer supported even-numbered release lines. Install dependencies with `npm ci`.

- `npm start`: development server at http://localhost:3000.
- `npm test`: run regression tests once. Use `npm test -- --watch` for watch mode.
- `npm run build`: production output in `build/`, without linting.
- `npm run preview`: preview the production build locally.

The backend must run separately at http://localhost:8088 for application data.

Production hosting must serve `index.html` for client-side routes. For subdirectory hosting, build with `npm run build -- --base=/your-path/` and configure the router's basename separately.

Vite replaces Create React App; React and React Router versions are unchanged. The old certificate dependency chain, including `node-forge`, is no longer needed.
