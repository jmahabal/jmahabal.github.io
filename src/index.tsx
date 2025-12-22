import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// TODO: These should be... pages?
import Home from './components/Home'
import Resume from './components/Resume'
import Projects from './components/Projects'
import Talks from './components/Talks'
import Writing from './components/Writing'

import WritingPost from './components/WritingPost'
import './index.css'
import MTALanguage from './components/MTALanguage'
import JourneyVisualization from './journey/JourneyVisualization'
import FamilyPage from './family/FamilyPage'

// for images
// https://stackoverflow.com/questions/29421409/how-to-load-all-files-in-a-directory-using-webpack-without-require-statements
// function requireAll(r) {
//   r.keys().forEach(r)
// }

// requireAll(
//   require.context('./public/portfolio/resized/', true, /\.(jpg|png|gif)$/),
// )

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/resume', element: <Resume /> },
  { path: '/majority-minority', element: <MTALanguage /> },
  { path: '/projects', element: <Projects /> },
  { path: '/talks', element: <Talks /> },
  { path: '/writing', element: <Writing /> },
  { path: '/writing/:slug', element: <WritingPost /> },
  { path: '/journey', element: <JourneyVisualization /> },
  { path: '/family', element: <FamilyPage /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
