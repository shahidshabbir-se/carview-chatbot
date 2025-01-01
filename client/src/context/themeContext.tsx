import React, {
  useEffect,
  createContext,
  useState,
  useContext,
  ReactNode
} from 'react'
import { ConfigProvider, theme } from 'antd'

interface Layout {
  navbar: boolean
  header: boolean
}

interface ThemeContextProps {
  isDarkMode: boolean
  toggleTheme: () => void
  setLayout: React.Dispatch<React.SetStateAction<Layout>>
  layout: Layout
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localStorage.getItem('theme') === 'dark' || false
  )
  const [layout, setLayout] = useState<Layout>({
    navbar: false,
    header: false
  })

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const antThemeConfig = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      borderRadius: 8,
      colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
      colorText: isDarkMode ? '#f0f0f0' : '#000000'
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    if (!isDarkMode) {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    }
  }, [isDarkMode])

  function checkPath(path: string) {
    const pathname = window.location.pathname
    return pathname === '/' || pathname.includes(path)
  }

  function changeLayout() {
    if (
      checkPath('auth') ||
      checkPath('video') ||
      checkPath('social-meeting') ||
      checkPath('employee')
    ) {
      setLayout({
        header: false,
        navbar: false
      })
    } else {
      setLayout({
        navbar: true,
        header: true
      })
    }
  }

  useEffect(() => {
    changeLayout()
    const root = document.getElementById('root')
    root?.addEventListener('ROUTER_CHANGED', changeLayout)
    return () => root?.removeEventListener('ROUTER_CHANGED', changeLayout)
  }, [])

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, setLayout, layout }}
    >
      <ConfigProvider theme={antThemeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
