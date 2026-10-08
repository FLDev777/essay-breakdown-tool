// Shared Tailwind CSS configuration for both index.html and breakdown.html
// Load this via <script src="tailwind-config.js"></script> BEFORE the Tailwind CDN script

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'serif': ['Playfair Display','serif'],
                'sans': ['Inter','ui-sans-serif','system-ui','Segoe UI','Roboto','Arial']
            },
            colors: {
                'sage': '#9CAF88',
                'terracotta': '#D4A574',
                'cream': '#F5F1E8',
                'charcoal': '#2D2D2D',
                'stone': '#8B8680',
                'ink': '#0B1220',
                'midnight': '#0F1B2D',
                'slate': '#1C2840',
                'mist': '#AAB7CF',
                'ice': '#E6ECF7'
            }
        }
    }
};
