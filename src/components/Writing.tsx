import { useEffect, useState } from 'react'

import ProjectCard from './ProjectCard'
import { H1 } from './ui/Typography'
import { Page, TwoColumn, Container } from './ui/Layout'
import { HomeLink } from './ui/Navigation'
import {
  getAllPosts,
  formatDate,
  type WritingPost,
} from '../utils/markdownLoader'

const Writing = () => {
  const [posts, setPosts] = useState<WritingPost[]>([])

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts()
        setPosts(allPosts)
      } catch (error) {
        console.error('Error loading posts:', error)
      }
    }

    loadPosts()
  }, [])

  // External writing posts
  const externalPosts = [
    {
      title: 'Growing a UX Writing Practice',
      date: 'Jan. 2022',
      description:
        'You can push forward your culture without waiting for someone to be responsible full-time. These are some of the strategies that worked for us at Lattice!',
      url: 'https://tech.lattice.com/article/growing-a-ux-writing-practice',
      imageUrl: 'uxwriting',
      imageDescription:
        'stock illustration of a figure holding a massive pencil',
      isExternal: true,
    },
  ]

  // Combine external and internal posts
  const allWriting = [
    ...externalPosts,
    ...posts.map((post) => ({
      title: post.title,
      date: formatDate(post.date),
      description: post.description,
      imageUrl: post.imageUrl,
      imageDescription: post.imageDescription,
      url: `/writing/${post.slug}`,
      isExternal: false,
    })),
  ].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime() // newest first
  })

  return (
    <Page>
      <Container>
        <H1 className="mb-6">Writing</H1>

        <TwoColumn>
          {allWriting.map((post, index) => (
            <ProjectCard
              key={index}
              title={post.title}
              date={post.date}
              description={post.description}
              ariaDescription={post.title}
              url={post.url}
              imageUrl={post.imageUrl}
              imageDescription={post.imageDescription}
              isInternal={!post.isExternal}
            />
          ))}
        </TwoColumn>

        <div className="mt-12">
          <HomeLink />
        </div>
      </Container>
    </Page>
  )
}

export default Writing
