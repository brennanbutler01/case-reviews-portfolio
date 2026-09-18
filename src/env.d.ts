/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_API: string
    readonly VITE_AUTH0_DOMAIN: string
    readonly VITE_AUTH0_CLIENT_ID: string
    readonly VITE_AUTH0_AUDIENCE: string
    readonly VITE_AUTH0_CALLBACK_URL: string
    readonly VITE_AUTH0_API: string
    readonly VITE_E2E_EMAIL: string
    readonly VITE_E2E_EMAIL_PASSWORD: string
    readonly VITE_ROOT: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
