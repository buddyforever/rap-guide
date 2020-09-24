import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { StyledContent, Heading, MediumSpace } from '../styles/PageStyles'
import { UserContext } from '../context/UserContext'
import Loader from '../components/Loader'
import { Grid } from '../components/Grid'
import { Card } from '../components/Card'

import { useQuery } from '@apollo/react-hooks'
import { GET_LESSONS_BY_ACCOUNT_SHORT } from '../queries/lessons'

const TempPage = () => {

  /* Context */
  const { user } = useContext(UserContext);

  /* Queries */
  const { loading, data } = useQuery(GET_LESSONS_BY_ACCOUNT_SHORT, {
    variables: {
      id: user ? user.id : null
    }
  });

  if (loading || !data) return <Loader />
  return (
    <StyledContent>
      <Heading>
        <h1>Lesson Templates</h1>
        <MediumSpace>
          <Grid>
            {data.lessons.map(lesson => (
              <Card
                key={lesson.id}
                title={lesson.guide.videoTitle}
                topics={lesson.guide.topics}
                status="IN SESSION"
                link={`/lesson/${lesson.id}`}
                stats={[
                  {
                    label: "students",
                    value: 30
                  },
                  {
                    label: "annotations",
                    value: 295
                  },
                  {
                    label: "lessons",
                    value: 3
                  }
                ]}
                image={lesson.guide.videoThumb}
              />
            ))}
          </Grid>
        </MediumSpace>
      </Heading>
    </StyledContent>
  )
}

export default TempPage;
