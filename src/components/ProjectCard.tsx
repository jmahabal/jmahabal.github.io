import styled from 'styled-components'
import { H4, P } from './ui/Typography'
import { Card } from './ui/Cards'
import { space } from 'styled-system'

interface ProjectCardProps {
  url: string
  title: string
  date: string
  ariaDescription: string
  imageUrl?: string
  imageDescription?: string
  description?: string
}

const FillerImage = styled.div`
  height: 75px;
  border: 1px black solid;
  background: repeating-linear-gradient(
    45deg,
    #95a5a6,
    #95a5a6 10px,
    #ecf0f1 10px,
    #ecf0f1 20px
  );
`

const imageUrlBuilder = (name: string) => `/portfolio/resized/${name}.jpg`

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 8px;
  align-items: flex-end;
  ${space};
`

const ProjectCard = (props: ProjectCardProps) => {
  const {
    url,
    title,
    date,
    ariaDescription,
    imageUrl,
    imageDescription,
    description,
  } = props

  return (
    <Card className="mb-3">
      <TitleContainer className="mb-3">
        <H4>{title}</H4>
        <P>{date}</P>
      </TitleContainer>
      <a
        className="portfolio-item"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaDescription}
      >
        {imageUrl ? (
          <img alt={imageDescription} src={imageUrlBuilder(imageUrl)} />
        ) : (
          <FillerImage />
        )}
      </a>
      {description && <P className="mb-3">{description}</P>}
    </Card>
  )
}

export default ProjectCard
