/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'display-lg': '77px',
        'display-md': '62px',
        'heading-1': '48px',
        'heading-1-sm': '34px',
        'heading-2': '39px',
        'heading-2-sm': '33px',
        'heading-3': '33px',
        'heading-3-sm': '28px',
        'heading-4': '28px',
        'heading-4-sm': '23px',
        'heading-5': '28px',
        subheading: '20px',
        'para-base': '14px',
        'para-lg': '16px',
        'para-xl': '18px',
        caption: '12px',
        footer: '10px'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      fontWeight: {
        thin: 100,
        'extra-light': 200,
        light: 300,
        regular: 400,
        medium: 500,
        'semi-bold': 600,
        bold: 700,
        'extra-bold': 800,
        black: 900
      },
      boxShadow: {
        xs: '0px 4px 8px 0px #00000014',
        sm: '0px 6px 12px 0px #0000001C',
        md: '0px 9px 18px 0px #00000026',
        lg: '0px 13px 37px 0px #00000036',
        xl: '0px 20px 56px 0px #0000004A'
      },
      colors: {
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A'
        },
        blue: {
          50: '#ebf4ff',
          100: '#d1e6ff',
          200: '#A6CFFF',
          300: '#77B5FF',
          400: '#459AFF',
          500: '#3460DC',
          600: '#02489B',
          700: '#00397C',
          800: '#012A59',
          900: '#001C3E'
        },
        purple: {
          50: '#E6E4FF',
          100: '#D1CDFF',
          200: '#AEA7FF',
          300: '#8B81FF',
          400: '#6053FF',
          500: '#3929FF',
          600: '#1300FF',
          700: '#0C009F',
          800: '#07005B'
        },
        green: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B'
        },
        yellow: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F'
        },
        red: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D'
        },
        charcoal: {
          50: '#5F626B',
          100: '#555962',
          200: '#4C4F59',
          300: '#424651',
          400: '#424651',
          500: '#393D48',
          600: '#2F343F',
          700: '#262A36',
          800: '#1C212E',
          900: '#131825'
        }
      }
    }
  }
}
