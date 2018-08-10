import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';

class Projects extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="portfolio-page">
        <div class='portfolio-container' role="main">
          <h1 class='portfolio-title portfolio-transition-in'>Projects</h1>
          <div class='portfolio-description portfolio-transition-in'>This is a collection of the personal projects I’ve built. Most recently I’ve been interested in twitter bots and machine learning.</div>
            
          <div id='twitter-bots' class='portfolio-grouping-title portfolio-transition-in'>Twitter Bots</div>
          <div class='portfolio-grouping'>

            <ProjectCard
              title='Gender Diversity in Movies (Aug. 2017)'
              description='On a movie’s release date this bot posts a bar chart of the cast member breakdown by gender. People can also request a specific movie by @-ing the bot with the title.'
              ariaDescription='Gender Diversity in Movies'
              url='https://twitter.com/moviediversity'
              imageDescription='bar chart of gender breakdown'
              imageUrl='static/portfolio-photos/resized/dunkirk.jpg'
            />

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Wojbomb Predictor (July 2017)</div>
              <a href="https://twitter.com/wojbombdetector" target="_blank" rel="noopener" aria-label="Wojbomb Predictor">
                <div class="twitter filler-image"></div>
              </a>
              <div class="portfolio-item-text">Adrian Wojnarowski is a prominent basketball reporter known for breaking news. This bot uses Woj’s past tweets to generate a model that can predict the popularity of any of news he breaks, useful for only being updated on the truly important stuff.</div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Generated San Francisco Neighborhoods (June 2017)</div>
              <a href="https://twitter.com/somisspo" target="_blank" rel="noopener" aria-label="Generated San Francisco Neighborhoods">
                <img alt="map of labelling a fake sf neighborhood" data-src="static/portfolio-photos/resized/somisspo.jpg" />
              </a>
              <div class="portfolio-item-text">Realtors will sometimes rename less-desirable neighborhoods (such as KoNo for Koreatown Northgate) in order to attract more buyers. This bot generates a portmanteau’d new neighborhood in San Francisco and then maps its location.</div>
            </div>
          </div>

          <div id='front-end' class='portfolio-grouping-title portfolio-transition-in'>Websites</div>
          <div class='portfolio-grouping'>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Abhivyakti (March 2018)</div>
              <a href="https://abhivyakti.org" target="_blank" rel="noopener" aria-label="Abhivyakti">
                <img alt="two women talking to each other" data-src="static/portfolio-photos/resized/abhivyakti.jpg" />
              </a>
              <div class="portfolio-item-text">I designed and built the website for Abhivyakti, a Los Angeles-based Marathi theater group. The site is a JAMstack application built in Vue with Contentful as the content repository. </div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Valerie Law (Feb. 2018)</div>
              <a href="http://www.vlrrth.com" target="_blank" rel="noopener" aria-label="Valerie Law">
                <img alt="a woman standing in a greenhouse" data-src="static/portfolio-photos/resized/val.jpg" />
              </a>
              <div class="portfolio-item-text">I designed and built Valerie’s personal website, including setting up the domain and deployment pipeline.</div>
            </div>

          </div>

          <div id='other-tech' class='portfolio-grouping-title portfolio-transition-in'>Other Technology</div>
          <div class='portfolio-grouping'>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Movie Diversity CLI (Apr. 2018)</div>
              <a href="https://github.com/jmahabal/movie-diversity-cli" target="_blank" rel="noopener" aria-label="Movie Diversity CLI">
                <img alt="a bar chart made up of emojis" data-src="static/portfolio-photos/resized/coco.jpg" />
              </a>
              <div class="portfolio-item-text">I built a command-line tool that outputs the breakdown by gender of a given movie’s cast.</div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">“Don’t Call Me Iggy” Reddit Bot (Apr. 2018)</div>
              <a href="https://www.reddit.com/u/dont-call-me-iggy" target="_blank" rel="noopener" aria-label="Don’t Call Me Iggy">
                <div class="twitter filler-image"></div>
              </a>
              <div class="portfolio-item-text">Fans sometimes call Andre Iguodala “Iggy”, a name he doesn’t really care for. This bot reminds posters on Reddit that they should try to pick an alternative nickname.</div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">SMS-Based Grocery List (Oct. 2017)</div>
              <a href="https://medium.com/@jaymahabal/weekend-project-building-an-sms-based-grocery-list-using-twilio-and-firebase-435feb0b3395" target="_blank" rel="noopener" aria-label="SMS-Based Grocery List">
                <img alt="text conversation with the bot" data-src="static/portfolio-photos/resized/grocerylist.jpg" />
              </a>
              <div class="portfolio-item-text">I used Twilio and Firebase to create a grocery list application. My roommates and I can all text a phone number and work off of the same editable list.</div>
            </div>

          </div>

          <div id='cartography' class='portfolio-grouping-title portfolio-transition-in'>Cartography</div>
          <div class='portfolio-grouping'>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Emoji Map (Sept. 2016)</div>
              <a href="http://www.mahabal.io/emoji" target="_blank" rel="noopener" aria-label="Emoji Map">
                <img alt="a gridmap of emojis of the bay area" data-src="static/portfolio-photos/resized/emojimap.jpg" />
              </a>
              <div class="portfolio-item-text">We use mental maps everyday, guiding our journey across space. Locations are not just physical but also emotional. I mapped the Bay Area, condensing the vibrancy and diversity of the city into emoji form.</div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Travel Paths of CFB Teams (Jan. 2017)</div>
              <a href="/cfbmap" target="_blank" rel="noopener" aria-label="Travel Paths of CFB Teams Map">
                <img alt="a map of flight paths of cfb teams" data-src="static/portfolio-photos/resized/cfbmap.jpg" />
              </a>
              <div class="portfolio-item-text">While they don't always literally fly, the flight paths college football teams make a beautiful spiderweb over the country.</div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">California Students Stay Close to Home (Dec. 2013)</div>
              <a href="http://www.mahabal.io/static/location/jay_final_project.pdf" target="_blank" rel="noopener" aria-label="California Students Stay Close to Home Map">
                <img alt="a choropleth of california counties" data-src="static/portfolio-photos/resized/uc.jpg" />
              </a>
              <div class="portfolio-item-text">With the exception of UCLA and UC Berkeley, the home county of each University of California campus sent the majority of its UC-attending students there; students tend to stay near home.</div>
            </div>

          </div>

          <div id='data-visualization' class='portfolio-grouping-title portfolio-transition-in'>Data Visualization</div>
          <div class='portfolio-grouping'>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Examining Your Data (Feb. 2017)</div>
              <a href="http://bl.ocks.org/jmahabal/raw/8f010c62112dec083b559cb047a51048/" target="_blank" rel="noopener" aria-label="Examining Your Data Visualization">
                <img alt="a scatterplot with a trend line" data-src="static/portfolio-photos/resized/examine-data.jpg" />
              </a>
              <div class="portfolio-item-text">Sometimes your dataset can have hidden patterns. That’s one of the reasons why exploratory data visualization and analysis is necessary.</div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">The Sieve of Eratosthenes (July 2016)</div>
              <a href="http://www.mahabal.io/eras" target="_blank" rel="noopener" aria-label="The Sieve of Eratosthenes Visualization">
                <img alt="a grid of numbers, some highlighted" data-src="static/portfolio-photos/resized/erat.jpg" />
              </a>
              <div class="portfolio-item-text">One way to find primes numbers is by using an algorithm called the Sieve of Eratosthenes. It was difficult for me to understand at first, so I built this to hopefully make it easier for others.</div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">/r/NBA Survey (June 2017)</div>
              <a href="https://nba.surge.sh/" target="_blank" rel="noopener" aria-label="/r/NBA Survey Visualization">
                <img alt="a heatmap" data-src="static/portfolio-photos/resized/rnba.jpg" />
              </a>
              <div class="portfolio-item-text">I visualized correlations for the 2017 /r/NBA fan survey.</div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">NBA Margin of Victory (Feb. 2017)</div>
              <a href="https://bl.ocks.org/jmahabal/raw/cbc14c78e392cdccc96bb222697a3716/" target="_blank" rel="noopener" aria-label="NBA Margin of Victory Visualization">
                <img alt="a bar chart of the margins of victory for the gsw" data-src="static/portfolio-photos/resized/mov.jpg" />
              </a>
              <div class="portfolio-item-text">The Golden State Warriors hadn’t just been winning, they had been winning by huge margins.</div>
            </div>

          </div>

          <div id='photography' class='portfolio-grouping-title portfolio-transition-in'>Photography</div>
          <div class='portfolio-grouping'>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Iceland (Oct. 2017)</div>
              <a href="http://iceland.surge.sh" target="_blank" rel="noopener" aria-label="Iceland Blog">
                <img alt="a rift in iceland" data-src="static/portfolio-photos/resized/oxararfoss.jpg" />
              </a>
              <div class="portfolio-item-text">This is a blog post about my visit to Iceland, an amazingly beautiful country. I wrote a helper shell script that allowed me to convert Markdown to HTML, resize photos, and deploy all in one go.</div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Phono del Sol (July 2016)</div>
              <a href="http://berkeleybside.com/indie-music-and-food-festival-phono-del-sol-leaves-patrons-happy-waiting-for-next-year/" target="_blank" rel="noopener" aria-label="Phono del Sol Photos">
                <img alt="a woman singing with a guitar" data-src="static/portfolio-photos/resized/phonodelsol.jpg" />
              </a>
              <div class="portfolio-item-text">I took photos for the Berkeley B-Side, a Berkeley-based music publication, for Phono del Sol, an annual music festival held in San Francisco.</div>
            </div>

            <div class='portfolio-item portfolio-transition-in'>
              <div class="portfolio-item-title">Instagram (ongoing)</div>
              <a href="https://www.instagram.com/jmahabal/" target="_blank" rel="noopener" aria-label="Instagram">
                <img alt="sf downtown buildings" data-src="static/portfolio-photos/resized/thepalace.jpg" />
              </a>
            </div>

          </div>

          <div class="to-home">
            <Link to="/resume"><button>To Resume</button></Link>
          </div>

        </div>
      </div>
    )
  }
}

export default Projects;