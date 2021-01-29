import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { UserContext } from '../../context/UserContext'
import { StyledContent, Heading, LargeSpace, ThreeGrid, MediumSpace, FullSection, StyledColumns } from '../../styles/PageStyles'
import Loader from '../Loader'
import VideoThumb from '../Guide/VideoThumb'
import { dateFormat } from '../../utilities/DateFormat'
import { useAuth0 } from "../../react-auth0-spa";
import { Button, LinkButton } from '../ui'
import { MakeARapGuide } from '../Make'
import { FormBlock } from '../../styles/FormStyles'
import { Message } from '../ui/Message'
import { Card } from '../Card'
import { LessonTemplates } from '../Lesson/LessonTemplates'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_LESSONS_BY_ACCOUNT_SHORT, ENROLL_STUDENT, PUBLISH_LESSON } from '../../queries/lessons'
import { GET_CODE } from '../../queries/codes'
import { UPDATE_ACCOUNT_TYPE, PUBLISH_ACCOUNT } from '../../queries/accounts'
import { GET_ANNOTATIONS_BY_ACCOUNT } from '../../queries/annotations'

function getLessonColor(status) {
  const colors = {
    "Draft": "#F6E05E",
    "In Session": "#68D391",
    "Closed": "#DD3333",
    "Closed *": "#DD3333"
  }
  return colors[status]
}

export const Lessons = () => {

  /* Authentication */
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  /* Context */
  const { user, setUser } = useContext(UserContext);

  /* State */
  const [recentAnnotations, setRecentAnnotations] = useState([]);
  const [accessCode, setAccessCode] = useState("");
  const [hoveredVideo, setHoveredVideo] = useState(null)

  /* Helpers */
  const [message, setMessage] = useState(null);

  /* Queries */
  const { loading: loadingLessons, data } = useQuery(GET_LESSONS_BY_ACCOUNT_SHORT, {
    variables: {
      id: user ? user.id : null
    }
  });
  const { refetch: refetchCode } = useQuery(GET_CODE, {
    variables: {
      code: null
    }
  });
  const [updateAccountType] = useMutation(UPDATE_ACCOUNT_TYPE)
  const [enrollStudent] = useMutation(ENROLL_STUDENT)
  const [publishAccount] = useMutation(PUBLISH_ACCOUNT)
  const [publishLesson] = useMutation(PUBLISH_LESSON)

  const { loading: loadingHistory, data: dataHistory } = useQuery(GET_ANNOTATIONS_BY_ACCOUNT, {
    variables: {
      id: user ? user.id : null
    }
  });

  /* Functions */
  /* TODO - eventually it would be good to move this into a resolver */
  function confirmAccessCode() {
    // Check code type by first letter
    let lessonID = null;
    let code = accessCode;
    if (accessCode.charAt(0) === "E") {
      lessonID = accessCode.substr(1, accessCode.length);
      code = "E";
    }

    refetchCode({
      code: code
    }).then(response => {
      if (response.data.code) {
        switch (response.data.code.action.action) {
          case "EDUCATOR_VIEW_MODE":
            updateAccountType({
              variables: {
                email: user.email,
                type: response.data.code.action.type,
                isViewOnly: true
              }
            }).then(data => {
              setUser(prevState => ({
                ...user,
                type: response.data.code.action.type,
                isViewMode: true
              }))
              setMessage({
                title: "Account Upgraded",
                type: "success",
                text: "You now have educator view access."
              })
              setAccessCode("");
              /* Publish the record */
              publishAccount({
                variables: {
                  ID: user.id
                }
              })
            })
            break;
          case "UPDATE_TYPE":
            updateAccountType({
              variables: {
                email: user.email,
                type: response.data.code.action.type,
                isViewOnly: false
              }
            }).then(data => {
              setUser(prevState => ({
                ...user,
                type: response.data.code.action.type,
                isViewMode: false
              }))
              setMessage({
                title: "Account Upgraded",
                type: "success",
                text: "You now have educator access."
              })
              setAccessCode("");
              /* Publish the record */
              publishAccount({
                variables: {
                  ID: user.id
                }
              })
            })
            break;
          case "ENROLL_STUDENT":
            enrollStudent({
              variables: {
                email: user.email,
                lesson: [{
                  where: {
                    id: lessonID
                  }
                }]
              }
            }).then(response => {
              console.log(response)
              setUser(prevState => ({
                ...user,
                type: 'student'
              }))
              // get the title of the lesson that was enrolled in
              let lessons = response.data.updateAccount.lessons
              let lesson = lessons.find(lesson => lesson.id === lessonID)
              let lessonTitle = lesson.lessonTitle;
              setMessage({
                title: "Enrolled!",
                type: "success",
                text: `You have successfuly enrolled in <strong>${lessonTitle}</strong>`
              })
              setAccessCode("");
              /* Publish the record */
              publishAccount({
                variables: {
                  ID: user.id
                }
              })
              publishLesson({
                variables: {
                  ID: lessonID
                }
              })
            })
            break;
          default:
            alert("NONE")
            break;
        }

      } else {
        setMessage({
          title: "Invalid Code",
          type: "error",
          text: "You have entered an invalid access code."
        })
      }
    })
  }

  function displayAnnotationActivity(annotation) {

    let lessonTitle = annotation.lesson.lessonTitle;
    let lessonLink = `/lesson/${annotation.lesson.id}`
    let dateUpdated = annotation.updatedAt;

    // Submitted
    if (annotation.isSubmitted && !annotation.isApproved) {
      return (
        <p key={annotation.id}>
          You <strong>submitted</strong> an annotation for <Link to={lessonLink}><strong>{lessonTitle}</strong></Link> on <em>{dateFormat(dateUpdated)}</em>
        </p>
      )
    }
    // Saved
    if (!annotation.isSubmitted && !annotation.isRequestRevisions && !annotation.isApproved) {
      return (
        <p key={annotation.id}>
          You <strong>saved</strong> an annotation for <Link to={lessonLink}><strong>{lessonTitle}</strong></Link> on <em>{dateFormat(dateUpdated)}</em>
        </p>
      )
    }

    // Revisions Requested
    if (annotation.isRequestRevisions && !annotation.isApproved) {
      return (
        <p key={annotation.id}>
          Your teacher requested <strong>revisions</strong> to your annotation for <Link to={lessonLink}><strong>{lessonTitle}</strong></Link> on <em>{dateFormat(dateUpdated)}</em>
        </p>
      )
    }

    // Revisions Requested
    if (annotation.isApproved) {
      return (
        <p key={annotation.id}>
          Your teacher has <strong>APPROVED</strong> your annotation for <Link to={lessonLink}><strong>{lessonTitle}</strong></Link> on <em>{dateFormat(dateUpdated)}</em>
        </p>
      )
    }

  }

  /* Effects */
  useEffect(() => {
    if (dataHistory && dataHistory.annotations) {
      setRecentAnnotations(dataHistory.annotations);
    }
  }, [dataHistory])

  if (loading || loadingLessons || loadingHistory) return <Loader />
  if (!isAuthenticated) {
    return (
      <>
        <FullSection>
          <StyledContent>
            <StyledColumns>
              <MediumSpace>
                <Heading>
                  <h1>Lessons</h1>

                  <p>Teachers with an Educator Account can design Lessons around each of the videos on this site, and share these assignments privately with students, collecting responses via their Educator Dashboard.</p>

                  <p>Teachers can also share their completed lesson plans with other educators to adapt for their own use, and can browse previous lessons and templates.</p>
                </Heading>
              </MediumSpace>
              <MediumSpace>
                <img src="images/illustration2.svg" alt="Rap Guide | Lessons" />
              </MediumSpace>
            </StyledColumns>
          </StyledContent>
        </FullSection>
        <FullSection
          bgColor="black"
          color="white"
          space="5rem"
          style={{
            display: "flex",
            alignItems: "center"
          }}>
          <StyledContent>
            <StyledColumns>
              <div>
                <h2>Annotations</h2>
                <p>Lesson content on RapGuide.com is submitted via student annotations attached to the lyrics of songs. These annotations are content-agnostic, which means any existing music video about any topic can be used, and students can be assigned to provide any kind of response, from personal reflections to analysis of the scientific references to close-reading of the text.</p>
              </div>
              <div>
                <img style={{ maxWidth: "600px" }} src="images/sample.png" alt="Sample Annotation" />
              </div>
            </StyledColumns>
          </StyledContent>
        </FullSection>
        <FullSection
          space="5rem"
          style={{
            display: "flex",
            alignItems: "center"
          }}>
          <StyledContent>
            <h2>Access</h2>
            <p>
              Lesson content on RapGuide.com is currently only accessible to educators and students. After lessons are completed, some of the annotations may be submitted for public display on the site, subject to student and teacher consent.
            </p>

            <p><strong>Teachers</strong>, please <Link to="/" onClick={loginWithRedirect}>login</Link> and <Link to="/contact">contact us</Link> to request an Educator Account and get started.</p>

            <p><strong>Students</strong>, please share this site with your teacher to request a Rap Guide lesson in your class.</p>
          </StyledContent>
        </FullSection>
        <MakeARapGuide />
      </>
    )
  }

  if (!data) return null
  return (
    <>
      <FullSection space="0" style={{ minHeight: "auto", paddingBottom: "10rem" }}>
        <StyledContent>
          <Heading>
            <h1>My Lessons</h1>
          </Heading>
          {data.lessons.length === 0 && <p>You have not connected with any lessons yet.</p>}
          {(user.type === "student" && recentAnnotations.length > 0) &&
            <LargeSpace>
              <h3>Recent Activity</h3>
              {recentAnnotations.map(annotation => {
                return displayAnnotationActivity(annotation);
              })}
            </LargeSpace>
          }
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
                  link={`/lesson/${lesson.id}`}
                  onMouseOver={() => setHoveredVideo(lesson.id)}
                  onMouseOut={() => setHoveredVideo(null)}
                  classes={hoveredVideo ? !isHovered ? "dimmed" : "" : ""}
                  stats={[
                    {
                      label: "students",
                      value: lesson.accounts.length
                    },
                    {
                      label: "annotations",
                      value: lesson.annotations.length
                    },
                    {
                      label: "status",
                      value: lesson.lessonStatus,
                      color: getLessonColor(lesson.lessonStatus)
                    }
                  ]}
                  image={lesson.guide.videoThumb}
                  badge={{
                    label: lesson.lessonStatus,
                    color: getLessonColor(lesson.lessonStatus)
                  }}
                />
              )
            })}
          </ThreeGrid>
          {['administrator', 'educator'].includes(user.type) &&
            <LessonTemplates />
          }
        </StyledContent>
      </FullSection>
      {data.lessons.length === 0 &&
        <FullSection
          minHeight="0"
          bgColor="#DD3333"
          color="white"
          space="0.5rem">
          <StyledContent>
            <FormBlock>
              <h2 style={{ marginBottom: "1rem" }}>Connect with a Lesson</h2>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="enter access code..." />
                <Button
                  secondary
                  style={{
                    marginLeft: "1rem",
                    width: "150px",
                    height: "auto",
                    backgroundColor: "transparent",
                    color: "white",
                    border: "2px solid white"
                  }}
                  onClick={(e) => { e.preventDefault(); confirmAccessCode(e.target.value) }}
                  iconLeft={faPlus}>SUBMIT</Button>
              </div>
            </FormBlock>
          </StyledContent>
        </FullSection>
      }
      <FullSection
        bgColor="black"
        color="white"
      >
        <StyledContent>
          <StyledColumns>
            <MediumSpace>
              <Heading>
                <h1>Lessons</h1>

                <p className="paragraph-top">Teachers with an Educator Account can design Lessons around each of the videos on this site, and share these assignments privately with students, collecting responses via their Educator Dashboard.</p>

                <p className="paragraph-bottom">Teachers can also share their completed lesson plans with other educators to adapt for their own use, and can browse previous lessons and templates.</p>
              </Heading>
            </MediumSpace>
            <MediumSpace>
              <img src="images/illustration2.svg" alt="Rap Guide | Lessons" />
            </MediumSpace>
          </StyledColumns>
        </StyledContent>
      </FullSection>
      <FullSection
        space="5rem"
        style={{
          display: "flex",
          alignItems: "center"
        }}>
        <StyledContent>
          <StyledColumns>
            <div>
              <h2>Annotations</h2>
              <p>Lesson content on RapGuide.com is submitted via student annotations attached to the lyrics of songs. These annotations are content-agnostic, which means any existing music video about any topic can be used, and students can be assigned to provide any kind of response, from personal reflections to analysis of the scientific references to close-reading of the text.</p>
            </div>
            <div>
              <img style={{ maxWidth: "600px" }} src="images/sample.png" alt="Sample Annotation" />
            </div>
          </StyledColumns>
        </StyledContent>
      </FullSection>
      <MakeARapGuide />
      {data.lessons.length > 0 &&
        <FullSection
          minHeight="0"
          bgColor="#DD3333"
          color="white"
          space="0.5rem">
          <StyledContent>
            <FormBlock>
              <h2 style={{ marginBottom: "1rem" }}>Connect with a Lesson</h2>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="enter access code..." />
                <Button
                  secondary
                  style={{
                    marginLeft: "1rem",
                    width: "150px",
                    height: "auto",
                    backgroundColor: "transparent",
                    color: "white",
                    border: "2px solid white"
                  }}
                  onClick={(e) => { e.preventDefault(); confirmAccessCode(e.target.value) }}
                  iconLeft={faPlus}>SUBMIT</Button>
              </div>
            </FormBlock>
          </StyledContent>
        </FullSection>
      }
      {
        message &&
        <Message
          toast
          dismiss={() => setMessage(null)}
          type={message.type}
          title={message.title}>
          {message.text}
        </Message>
      }
    </>
  )
}

export default Lessons;

