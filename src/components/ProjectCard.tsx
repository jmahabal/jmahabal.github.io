import { cn } from '../utils/cn'
import { H4, P } from './ui/Typography'

interface ProjectCardProps {
  url: string
  title: string
  date: string
  ariaDescription: string
  imageUrl?: string
  imageDescription?: string
  description?: string
}

const imageUrlBuilder = (name: string) => `/portfolio/resized/${name}.jpg`

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
    <div className="mb-3">
      <div className={cn('grid grid-cols-[1fr_auto] gap-x-2 items-end mb-3')}>
        <H4>{title}</H4>
        <P>{date}</P>
      </div>
      <a
        className="my-4 h-[75px] flex w-full"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaDescription}
      >
        {imageUrl ? (
          <img
            alt={imageDescription}
            src={imageUrlBuilder(imageUrl)}
            className="w-full h-full object-cover border border-black"
          />
        ) : (
          <div
            className={cn('h-[75px] w-full border border-black')}
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #95a5a6, #95a5a6 10px, #ecf0f1 10px, #ecf0f1 20px)',
            }}
          />
        )}
      </a>
      {description && <P className="mb-3">{description}</P>}
    </div>
  )
}

export default ProjectCard
