# PrepCart v2

PrepCart is a mobile application to streamline your grocery shopping by managing your shopping list and finding discounts from local store catalogs.

## Tech Stack

- **Frontend**: React Native with Expo
- **Language**: TypeScript
- **Backend**: Firebase (Authentication, Cloud Functions, Cloud Storage)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- [Yarn](https://yarnpkg.com/) or npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A Firebase project.

### Installation & Setup

1.  **Clone & Install**:

    ```bash
    git clone https://github.com/blagoySimandov/prepcart.git
    cd prepcartv2
    npm install
    ```

2.  **Configure Firebase**:

    - Create `firebaseConfig.js` in the root with your Firebase project's configuration.
    - Add your `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) files.

3.  **Run the App**:
    ```bash
    npx expo start
    ```

## Project Structure

The project is organized into several key directories:

- `app/`: Contains all the screens and navigation logic, following the Expo Router file-based routing convention.
  - `(tabs)/`: Defines the main tab navigation for the app.
  - `auth/`: Authentication screens (Login).
- `assets/`: Static assets like images, fonts, and html files.
- `components/`: Reusable UI components used across the application.
- `constants/`: Global constants like color schemes.
- `hooks/`: Custom React hooks.
- `src/`: Core application logic, services, and type definitions.
  - `auth/`: Authentication services.
  - `catalog-search/`: Logic for the catalog search feature.
  - `discounts/`: Services for handling discounts.
  - `user/`: Services and managers for user data and shopping lists.
- `under-development/`: Features that are currently being built and are not yet integrated into the main application flow.

## Firebase CORS for PDF Viewer

The PDF viewer loads brochures directly from Firebase Storage. For this to work in the web-based PDF.js viewer, you need to configure Cross-Origin Resource Sharing (CORS) on your Firebase Storage bucket.
