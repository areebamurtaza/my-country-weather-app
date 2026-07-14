# Day 2 Learning Log: React Hooks, Route Management & External APIs



## 1. What React Hooks Are
React Hooks are special built-in JavaScript functions provided by React that allow developers to use state, handle lifecycle events, and run asynchronous actions inside functional components without writing class-based components. They make functional code highly reusable, composable, and easier to read.

### useState
* **Purpose:** Used to preserve and modify user or system state variables across component re-renders.
* **Implementation:** Practiced by creating an interactive numerical counter, storing real-time user keystrokes in a controlled form input field, and toggling loading or error visibility triggers.

### useEffect
* **Purpose:** Used to perform side effects inside client components (such as updating data dynamically from internet endpoints, manually manipulating DOM components, or starting custom clock systems).
* **Dependency Arrays:** Controls exactly when the effect fires:
  * `[]` (Empty array): Fires exactly once when the component first mounts to the screen.
  * `[variable]`: Fires on mount and fires again whenever the tracking variable alters value.
  * No array: Fires on every single render cycle (performance intensive).
* **Cleanup Functions:** An explicit function returned inside a `useEffect` block (e.g., `return () => clearInterval(id)`). Its vital role is to tear down intervals, listeners, or active subscriptions when a component unmounts to prevent memory leaks.

---

## 2. Dynamic Routing & Parameter Architecture

### useSearchParams vs. useRouter
* **useSearchParams:** A hook that gives read-only access to the current URL’s query string (e.g., extracting values out of `?search=pakistan`).
* **useRouter:** Provides programmatical navigation methods (like `router.push()`) allowing the code to modify the address bar path without triggering page refreshes.

### Route Params vs. Search Params
* **Route Params:** Embedded path variables explicitly mapped using folder layouts (e.g., `/countries/[code]` dynamically turning into `/countries/PK`). Used to define distinct resource locations.
* **Search Params:** Optional key-value variables appended onto the end of an address string (e.g., `?region=South%20Asia&income=Low%20income`). Used to maintain safe shareable filtering, search text caching, or paging arrangements without breaking the primary routing layout.

---

## 3. API Integrations & Endpoints Used

* **World Bank Country Data API:** Used to pull down extensive country matrices, geographic metadata coordinates, and administrative region labels.
  * *Endpoint:* `https://api.worldbank.org/v2/country?format=json&per_page=300`
* **World Bank Indicators API:** Used to extract precise, current demographic data (Total Population) and economic context indexes (Gross Domestic Product).
  * *Population Endpoint:* `https://api.worldbank.org/v2/country/{code}/indicator/SP.POP.TOTL?format=json&mrnev=1`
  * *GDP Endpoint:* `https://api.worldbank.org/v2/country/{code}/indicator/NY.GDP.MKTP.CD?format=json&mrnev=1`
* **Open-Meteo Weather Forecasting API:** Used to pull down up-to-the-minute atmospheric contexts mapped against coordinates provided by the country profile.
  * *Endpoint:* `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,is_day,weather_code,wind_speed_10m`

---

## 4. Roadblocks Faced & Solutions Engineered

### Problem 1: Broken Path Alias Imports (`@/components` showing red)
* **Cause:** The project used an absolute source layout (`src/`), placing items inside `src/app/components`. The original import alias templates were searching for definitions natively inside a root-level `components` folder, causing compiler exceptions.
* **Solution:** Standardized the architecture by dragging the `components` and `types` folders directly into the root level of the `src` layout. Additionally, added `"baseUrl": "."` inside `tsconfig.json` to enable absolute paths.

### Problem 2: Missing Module Declarations on Types
* **Cause:** The custom declaration file for the World Bank API responses lacked a proper file extension identifier, causing TypeScript to fail when processing the module path.
* **Solution:** Appended explicit file extensions (`types.ts`), updated path configuration rules mapping to the folder path within `tsconfig.json`, and ran a complete reload on the editor's language compilation servers.

### Problem 3: Low Contrast & Invisible Form Text Color
* **Cause:** Used invalid Tailwind layout declarations (`text-white-900`, `text-black-900`) which broke the styling engine, making values in input boxes default to illegible gray colors.
* **Solution:** Rewrote the layout classes to use valid core primitives (`text-gray-900` and `bg-white`) inside the reusable custom UI components (`Input.tsx`, `SelectFilter.tsx`) so that text remains consistently visible across the app.