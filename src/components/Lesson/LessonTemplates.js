import React, { useState } from 'react'

import { ThreeGrid, Heading } from '../../styles/PageStyles'
import { Card } from '../Card'
import Loader from '../Loader'

import { useQuery } from '@apollo/react-hooks'
import { GET_LESSON_TEMPLATES } from '../../queries/lessons'

export const LessonTemplates = () => {

  const { loading, data } = useQuery(GET_LESSON_TEMPLATES)

  const [hoveredVideo, setHoveredVideo] = useState(null)

  if (loading) return <Loader />
  return (
    <>
      <Heading>
        <h1>Lesson Templates</h1>
        <p>Use an existing lesson template to get you started, make changes as needed to suit your needs. Choose a video that fits with your lesson plan.</p>
      </Heading>
      <ThreeGrid>
        {data.lessons.map(lesson => {
          const isHovered = lesson.id === hoveredVideo
          return (
            <Card
              key={lesson.id}
              title={lesson.lessonTitle}
              headingSize="2.6rem"
              topics={lesson.guide.topics}
              status="IN SESSION"
              showTags={false}
              lesson={lesson}
              link={`/template/${lesson.id}`}
              onMouseOver={() => setHoveredVideo(lesson.id)}
              onMouseOut={() => setHoveredVideo(null)}
              classes={hoveredVideo ? !isHovered ? "dimmed" : "" : ""}
              stats={[
                {
                  label: "students",
                  value: lesson.accounts.filter(account => account.type === "student").length
                },
                {
                  label: "annotations",
                  value: lesson.annotations.length
                }
              ]}
              image={lesson.guide.videoThumb}
            />
          )
        })}
      </ThreeGrid>
    </>
  )
}
