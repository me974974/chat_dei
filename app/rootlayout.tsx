"use client";

import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import { ThemeProvider } from "next-themes"

import './globals.css'
import ActiveStatus from './components/ActiveStatus'

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html>
        <body>
          <AuthContext>
            <ThemeProvider attribute='class'>
              <ToasterContext />
              <ActiveStatus />
              {children}
            </ThemeProvider>
          </AuthContext>
        </body>
      </html>
    )
  }