export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'ramki-bg': '#ffffff',
        'ramki-bg-warm': '#fafaf8',
        'ramki-text': '#0f0f0f',
        'ramki-text-secondary': '#1a1a1a',
        'ramki-gray': '#555555',
        'ramki-gray-light': '#777777',
        'ramki-link': '#222222',
        'ramki-hover': '#000000',
        'ramki-accent': '#4a4a4a',
        'ramki-accent-light': '#6b6b6b',
        'ramki-border': '#e5e5e5',
        'ramki-border-dark': '#d0d0d0',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        'prose': '65ch',
        'content': '1200px',
        'narrow': '900px',
      },
      lineHeight: {
        'tight': '1.15',
        'snug': '1.35',
        'relaxed': '1.65',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.02em',
      },
    },
  },
  plugins: [],
};
