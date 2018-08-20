import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { H1, H2, H3, H6 } from './ui/Typography';
import { TwoColumn } from './ui/Grid.js';

// TODO: move to a utils folder
const toKebabCase = (word) => {
  return word.toLowerCase().split(' ').join('-');
}

const ProjectSection = ({title, children}) => (
  <div>
    <H3 id={toKebabCase(title)}>{title}</H3>
    <TwoColumn>
      {children}
    </TwoColumn>
  </div>
);

class Projects extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="portfolio-page" style={{background: "white", color: "black"}}>
        <div class='portfolio-container' role="main">
          <H1>Projects</H1>
          <H2>This is a collection of the personal projects I’ve built. Most recently I’ve been interested in twitter bots and machine learning.</H2>
          
          <ProjectSection title='Twitter Bots'>
            <ProjectCard
              title='Gender Diversity in Movies (Aug. 2017)'
              description='On a movie’s release date this bot posts a bar chart of the cast member breakdown by gender. People can also request a specific movie by @-ing the bot with the title.'
              ariaDescription='Gender Diversity in Movies'
              url='https://twitter.com/moviediversity'
              imageDescription='bar chart of gender breakdown'
              imageUrl='static/portfolio-photos/resized/dunkirk.jpg'
            />
            <ProjectCard
              title='Wojbomb Predictor (July 2017)'
              description='Adrian Wojnarowski is a prominent basketball reporter known for breaking news. This bot uses Woj’s past tweets to generate a model that can predict the popularity of any of news he breaks, useful for only being updated on the truly important stuff.'
              ariaDescription='Wojbomb Predictor'
              url='https://twitter.com/wojbombdetector'
            />
            <ProjectCard
              title='Generated San Francisco Neighborhoods (June 2017)'
              description='Realtors will sometimes rename less-desirable neighborhoods (such as KoNo for Koreatown Northgate) in order to attract more buyers. This bot generates a portmanteau’d new neighborhood in San Francisco and then maps its location.'
              ariaDescription='Generated San Francisco Neighborhoods'
              url='https://twitter.com/somisspo'
              imageDescription='map of labelling a fake sf neighborhood'
              imageUrl='static/portfolio-photos/resized/somisspo.jpg'
            />        
          </ProjectSection>

          <ProjectSection title='Websites'>
            <ProjectCard
              title='Abhivyakti (March 2018)'
              description='I designed and built the website for Abhivyakti, a Los Angeles-based Marathi theater group. The site is a JAMstack application built in Vue with Contentful as the content repository.'
              ariaDescription='Abhivyakti'
              url='https://abhivyakti.org'
              imageDescription='two women talking to each other'
              imageUrl='static/portfolio-photos/resized/abhivyakti.jpg'
            />
            <ProjectCard
              title='Valerie Law (Feb. 2018)'
              description='I designed and built Valerie’s personal website, including setting up the domain and deployment pipeline.'
              ariaDescription='Valerie Law'
              url='http://www.vlrrth.org'
              imageDescription='a woman standing in a greenhouse'
              imageUrl='static/portfolio-photos/resized/val.jpg'
            />
          </ProjectSection>

          <ProjectSection title='Other Technology'>
            <ProjectCard
              title='Movie Diversity CLI (Apr. 2018)'
              description='I built a command-line tool that outputs the breakdown by gender of a given movie’s cast.'
              ariaDescription='Movie Diversity CLI'
              url='https://github.com/jmahabal/movie-diversity-cli'
              imageDescription='a bar chart made up of emojis'
              imageUrl='static/portfolio-photos/resized/coco.jpg'
            />
            <ProjectCard
              title='“Don’t Call Me Iggy” Reddit Bot (Apr. 2018)'
              description='Fans sometimes call Andre Iguodala “Iggy”, a name he doesn’t really care for. This bot reminds posters on Reddit that they should try to pick an alternative nickname.'
              ariaDescription='Don’t Call Me Iggy'
              url='https://www.reddit.com/u/dont-call-me-iggy'
            />
            <ProjectCard
              title='SMS-Based Grocery List (Oct. 2017)'
              description='I used Twilio and Firebase to create a grocery list application. My roommates and I can all text a phone number and work off of the same editable list.'
              ariaDescription='SMS-Based Grocery List'
              url='https://medium.com/@jaymahabal/weekend-project-building-an-sms-based-grocery-list-using-twilio-and-firebase-435feb0b3395'
              imageDescription='text conversation with the bot'
              imageUrl='static/portfolio-photos/resized/grocerylist.jpg'
            />
          </ProjectSection>

          <ProjectSection title='Cartography'>
            <ProjectCard
              title='Emoji Map (Sept. 2016)'
              description='We use mental maps everyday, guiding our journey across space. Locations are not just physical but also emotional. I mapped the Bay Area, condensing the vibrancy and diversity of the city into emoji form.'
              ariaDescription='Emoji Map'
              url='http://www.mahabal.io/emoji'
              imageDescription='a gridmap of emojis of the bay area'
              imageUrl='static/portfolio-photos/resized/emojimap.jpg'
            />
            <ProjectCard
              title='Travel Paths of CFB Teams (Jan. 2017)'
              description='While they don’t always literally fly, the flight paths college football teams make a beautiful spiderweb over the country.'
              ariaDescription='Travel Paths of CFB Teams Map'
              url='http://www.mahabal.io/cfbmap'
              imageDescription='a map of flight paths of cfb teams'
              imageUrl='static/portfolio-photos/resized/cfbmap.jpg'
            />
            <ProjectCard
              title='California Students Stay Close to Home (Dec. 2013)'
              description='With the exception of UCLA and UC Berkeley, the home county of each University of California campus sent the majority of its UC-attending students there; students tend to stay near home.'
              ariaDescription='California Students Stay Close to Home Map'
              url='http://www.mahabal.io/static/location/jay_final_project.pdf'
              imageDescription='a choropleth of california counties'
              imageUrl='static/portfolio-photos/resized/uc.jpg'
            />
          </ProjectSection>

          <ProjectSection title='Data Visualization'>
            <ProjectCard
              title='Examining Your Data (Feb. 2017)'
              description='Sometimes your dataset can have hidden patterns. That’s one of the reasons why exploratory data visualization and analysis is necessary.'
              ariaDescription='Examining Your Data Visualization'
              url='http://bl.ocks.org/jmahabal/raw/8f010c62112dec083b559cb047a51048/'
              imageDescription='a scatterplot with a trend line'
              imageUrl='static/portfolio-photos/resized/examine-data.jpg'
            />
            <ProjectCard
              title='The Sieve of Eratosthenes (July 2016)'
              description='One way to find primes numbers is by using an algorithm called the Sieve of Eratosthenes. It was difficult for me to understand at first, so I built this to hopefully make it easier for others.'
              ariaDescription='The Sieve of Eratosthenes Visualization'
              url='http://www.mahabal.io/eras'
              imageDescription='a grid of numbers, some highlighted'
              imageUrl='static/portfolio-photos/resized/erat.jpg'
            />
            <ProjectCard
              title='/r/NBA Survey (June 2017)'
              description='I visualized correlations for the 2017 /r/NBA fan survey.'
              ariaDescription='/r/NBA User Survey Visualization'
              url='https://nba.surge.sh/'
              imageDescription='a heatmap'
              imageUrl='static/portfolio-photos/resized/rnba.jpg'
            />
            <ProjectCard
              title='NBA Margin of Victory (Feb. 2017)'
              description='The Golden State Warriors hadn’t just been winning, they had been winning by huge margins.'
              ariaDescription='NBA Margin of Victory Visualization'
              url='https://bl.ocks.org/jmahabal/raw/cbc14c78e392cdccc96bb222697a3716/'
              imageDescription='a bar chart of the margins of victory for the gsw'
              imageUrl='static/portfolio-photos/resized/mov.jpg'
            />
          </ProjectSection>

          <ProjectSection title='Photography'>
            <ProjectCard
              title='Iceland (Oct. 2017)'
              description='This is a blog post about my visit to Iceland, an amazingly beautiful country. I wrote a helper shell script that allowed me to convert Markdown to HTML, resize photos, and deploy all in one go.'
              ariaDescription='Iceland Blog'
              url='http://iceland.surge.sh'
              imageDescription='a rift in iceland'
              imageUrl='static/portfolio-photos/resized/oxararfoss.jpg'
            />
            <ProjectCard
              title='Phono del Sol (July 2016)'
              description='I took photos for the Berkeley B-Side, a Berkeley-based music publication, for Phono del Sol, an annual music festival held in San Francisco.'
              ariaDescription='Phono del Sol Photos'
              url='http://berkeleybside.com/indie-music-and-food-festival-phono-del-sol-leaves-patrons-happy-waiting-for-next-year/'
              imageDescription='a woman singing with a guitar'
              imageUrl='static/portfolio-photos/resized/phonodelsol.jpg'
            />
            <ProjectCard
              title='Instagram (ongoing)'
              ariaDescription='Instagram'
              url='https://www.instagram.com/jmahabal/'
              imageDescription='sf downtown buildings'
              imageUrl='static/portfolio-photos/resized/thepalaca.jpg'
            />
          </ProjectSection>

          <div class="to-home">
            <Link to="/resume"><button>To Resume</button></Link>
          </div>

        </div>
      </div>
    )
  }
}

export default Projects;