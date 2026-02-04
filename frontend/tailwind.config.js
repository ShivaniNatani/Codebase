/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                serif: ['Crimson Pro', 'serif'],
                sans: ['Space Grotesk', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                    glow: 'hsl(var(--primary-glow))',
                    deep: 'hsl(var(--primary-deep))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chapter: {
                    locked: 'hsl(var(--chapter-locked))',
                    unlocked: 'hsl(var(--chapter-unlocked))',
                    active: 'hsl(var(--chapter-active))'
                },
                terminal: {
                    green: 'hsl(var(--terminal-green))',
                    amber: 'hsl(var(--terminal-amber))',
                    red: 'hsl(var(--terminal-red))'
                }
            },
            boxShadow: {
                'blood': 'var(--shadow-blood)',
                'deep': 'var(--shadow-deep)',
                'glow': 'var(--shadow-glow)',
                'inner-dark': 'var(--shadow-inner)'
            },
            backgroundImage: {
                'gradient-blood': 'var(--gradient-blood)',
                'gradient-dark': 'var(--gradient-dark)',
                'gradient-glow': 'var(--gradient-glow)',
                'gradient-vignette': 'var(--gradient-vignette)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'pulse-red': {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' }
                },
                'flicker': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'shake': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-5px)' },
                    '75%': { transform: 'translateX(5px)' }
                },
                'reveal': {
                    '0%': { clipPath: 'inset(0 100% 0 0)' },
                    '100%': { clipPath: 'inset(0 0 0 0)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'pulse-red': 'pulse-red 2s ease-in-out infinite',
                'flicker': 'flicker 3s ease-in-out infinite',
                'float': 'float 3s ease-in-out infinite',
                'shake': 'shake 0.5s ease-in-out',
                'reveal': 'reveal 1s ease-out forwards'
            },
            transitionTimingFunction: {
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
                'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
