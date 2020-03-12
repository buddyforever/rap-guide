import React, { useEffect, useState } from 'react'
import { StyledContent, Heading, FourGrid } from '../../styles/PageStyles'
import VideoThumb from '../Guide/VideoThumb'
import { getLocalStorage } from '../../utilities/LocalStorage'

export const Home = () => {

  const [guides, setGuides] = useState([]);

  useEffect(() => {
    // TODO Get actual data
    setGuides(JSON.parse(getLocalStorage("guides")));
  }, [])

  return (
    <StyledContent>
      <Heading>
        <h1>RAP GUIDES</h1>
      </Heading>
      <FourGrid>
        {guides && guides.map(guide => {
          return (<VideoThumb
            key={guide.id}
            id={guide.videoId}
            title={guide.title}
            thumbnail={guide.thumbnail}
            topics={guide.topics} />)
        })}
      </FourGrid>
    </StyledContent>
  )
}

export default Home;

