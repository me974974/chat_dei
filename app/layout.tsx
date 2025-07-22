import RootLayout from "./rootlayout"

export const metadata = {
  title: '<ℂ𝕙𝕒𝕥 𝔻𝕖𝕚/>',
  description: '<ℂ𝕙𝕒𝕥 𝔻𝕖𝕚/>',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <RootLayout>
          {children}
        </RootLayout>
      </body>
    </html>
  )
}
