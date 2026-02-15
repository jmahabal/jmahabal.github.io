import { Page, Container } from './ui/Layout'
import { HomeLink } from './ui/Navigation'
import { H1 } from './ui/Typography'

const ValCrossword = () => {
  return (
    <Page className="min-h-screen flex-col items-stretch">
      <Container className="w-full max-w-4xl">
        <div className="mb-4 flex items-center justify-between">
          <H1>🤓</H1>
          <HomeLink />
        </div>
        <iframe
          style={{ height: '70vh', width: '100%' }}
          src="https://crosshare.org/embed/EQnJC5C8lOJbG4exxbk2/NmChvfEvwraW1vnbSloocubxLhc2"
          allowFullScreen
          allowTransparency
          allow="clipboard-write *"
        />
      </Container>
    </Page>
  )
}

export default ValCrossword
