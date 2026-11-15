# Source Documentation

## Project

**Mind Connect** is a browser-based therapy-care scheduling prototype. It provides a user interface for finding care providers, filtering providers, saving providers, selecting appointment slots, viewing resources, accessing support screens, and managing a demo account.

- **Repository:** https://github.com/EdgarVazquezGonzalezHtx/Automated-Therapy-Scheduler
- **Main entry point:** `index.html`
- **Application logic:** `script.js`
- **Styles:** `style.css`

## External dependencies and resources

The project has no required third-party JavaScript libraries, frameworks, package dependencies, SDKs, or backend services. It is implemented with standard HTML, CSS, and browser-native JavaScript.

| Dependency / resource | URL | Purpose and use |
|---|---|---|
| Google Fonts – Inter | https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap | Loads the Inter typeface in weights 400, 500, 600, and 700 for the interface. The font is referenced by a stylesheet link in the `<head>` of `index.html`. |
| Google Fonts stylesheet host | https://fonts.googleapis.com | Hosts the Inter CSS stylesheet requested by the page. |
| Google Fonts font-file host | https://fonts.gstatic.com | Hosts the font files referenced by the Google Fonts stylesheet. The page preconnects to this host to help the font load efficiently. |

Google Fonts is a presentation enhancement, not a functional requirement. If the browser is offline or cannot reach Google Fonts, the application can still run using the fallback fonts defined in `style.css`.

## Built-in browser technologies

These are browser features rather than separately installed dependencies.

| Technology | How it is used |
|---|---|
| HTML5 | Defines the page structure, navigation, forms, dialogs, and content regions in `index.html`. |
| CSS3 | Controls layout, responsive presentation, colors, typography, and component styling in `style.css`. |
| Vanilla JavaScript (ES6+) | Implements navigation, provider search and filtering, appointment flow, resources, support interactions, and account behavior in `script.js`. |
| DOM APIs | Reads and updates page elements, handles user input and button events, and renders interactive screens. |
| Web Storage API (`localStorage`) | Saves prototype state in the browser under the key `mc-state`, including user-entered settings and demo visit/provider information. The Account screen includes a reset option that clears this saved state. |

## Data and service notes

- The application stores its prototype state in the browser's local storage. This is local to the browser profile and device; it is not a cloud database.
- Provider information is included in the project rather than retrieved from a live provider-search API.
- Search filters, appointment availability, and booking confirmations are prototype behavior. They do not contact a clinic or create a real appointment.
- Support chat and related support actions are simulated in the interface; they do not connect to a live support service.
- No API keys, authentication credentials, environment variables, or SDK setup are required to run the current prototype.

## Installation and execution

1. Download or clone the repository:
   `git clone https://github.com/EdgarVazquezGonzalezHtx/Automated-Therapy-Scheduler.git`
2. Open the project folder.
3. Open `index.html` in a modern web browser.

No Node.js installation, package manager, build command, local server, or dependency installation is required for the current implementation. JavaScript and local storage must be enabled in the browser.

## Source files

- `index.html` – Main page structure and script/style references.
- `style.css` – Visual design and responsive styling.
- `script.js` – Interactive application behavior and local demo-state handling.
- `README.md` – Project overview and usage documentation.

## Repository

For the complete source code and project history, visit:

https://github.com/EdgarVazquezGonzalezHtx/Automated-Therapy-Scheduler
