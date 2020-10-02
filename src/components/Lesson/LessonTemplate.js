import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../ui/Button'
import { StyledContent, MediumSpace, HtmlContent } from '../../styles/PageStyles'
import { TemplateStats } from '../Lesson/TemplateStats'
import Video from '../Guide/Video'

export const LessonTemplate = ({ lesson }) => {
  return (
    <StyledContent>
      <MediumSpace style={{ textAlign: "right" }}>
        <Link as="button" className="button" to={`/lesson/add/template/${lesson.id}`}>
          <Button>USE THIS TEMPLATE</Button>
        </Link>
      </MediumSpace>
      <MediumSpace>
        <h2>Lesson Details</h2>
        <p><strong>Class</strong> {lesson.className}</p>
        <p><strong>Instructor</strong> {lesson.instructorName}</p>
        <p><strong>Institution</strong> {lesson.institutionName}</p>
      </MediumSpace>
      <MediumSpace>
        <h2>Lesson Results</h2>
        <TemplateStats lesson={lesson} />
      </MediumSpace>
      <MediumSpace>
        <h2>Lesson Content</h2>
        <p>The content below represents the content that was used for this specific lesson, you will have the ability to make changes, including choosing a different video when you <Link to={`/lesson/add/template/${lesson.id}`}>use this template</Link>.</p>
        <Video guide={lesson.guide} />
        <HtmlContent>
          <div dangerouslySetInnerHTML={{ __html: lesson.lessonDescription }} />
        </HtmlContent>
      </MediumSpace>
      <MediumSpace style={{ textAlign: "right" }}>
        <Link as="button" className="button" to={`/lesson/add/template/${lesson.id}`}>
          <Button>USE THIS TEMPLATE</Button>
        </Link>
      </MediumSpace>
    </StyledContent>
  )
}
