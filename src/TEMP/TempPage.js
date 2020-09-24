import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { StyledContent, Heading } from '../styles/PageStyles'
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
  console.log(data)
  return (
    <StyledContent>
      <Heading>
        <h1>Lesson Templates</h1>
        <Grid>
          {data.lessons.map(lesson => (
            <Card
              key={lesson.id}
              title={lesson.guide.videoTitle}
              topics={lesson.guide.topics}
              status="IN SESSION"
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
              image={lesson.guide.videoUrl}
            />
          ))}
        </Grid>
      </Heading>
    </StyledContent>
  )
}

export default TempPage;
