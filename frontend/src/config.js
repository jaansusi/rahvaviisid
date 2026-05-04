const runtimeConfig = typeof window !== 'undefined' ? window.__CONFIG__ ?? {} : {};

let config = {
    apiUrl: runtimeConfig.apiUrl || import.meta.env.VITE_API_URL || 'http://localhost:3000'
}

export default config;
