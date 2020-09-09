import React, { useContext, useState, useEffect, useRef } from 'react'
import { useStateWithName } from '../Hooks/useStateWithName'

import { UserContext } from '../../context/UserContext'
import NoteForm from '../Lesson/NoteForm'
import { Heading, MediumSpace, LargeSpace, StyledContent, HtmlContent, StyledColumns } from '../../styles/PageStyles'
import Lyrics from '../Lyric/Lyrics'
import Loader from '../Loader'
import styled from 'styled-components'
import { LinkButton } from '../ui/LinkButton'
import { Message } from '../ui/Message'

import { useMutation } from '@apollo/react-hooks'
import { ASSIGN_LYRIC, UNASSIGN_LYRIC } from '../../queries/lyric'

const LessonLyricsForm = ({ lesson, refetch }) => {

  /* Refs */
  const ref = useRef();

  /* Context */
  const { user } = useContext(UserContext)

  /* State */
  const [lyrics, setLyrics] = useState(null);
  const [top, setTop] = useState(120);
  const [offset, setOffset] = useState(120);
  const [selectedLyrics, setSelectedLyrics] = useStateWithName([], "SelectedLyrics");
  const [assignedLyrics, setAssignedLyrics] = useStateWithName([], "AssignedLyrics");
  const [selectedNote, setSelectedNote] = useStateWithName(null, "SelectedNote");
  const [message, setMessage] = useState(null);

  /* Queries */
  const [assignLyricMutation] = useMutation(ASSIGN_LYRIC);
  const [unAssignLyricMutation] = useMutation(UNASSIGN_LYRIC);

  /* NOTE - When viewing the annotation I can now simple update selectedLyrics with
  any lyrics that are associated with the specific annotation */
  function handleLyricClick(lyric, lyricsTop, lyricsHeight, arrowTop, maxY) {
    // Select or deselect the lyric
    /*    if (!selectedLyrics.find(selectedLyric => selectedLyric.id === lyric.id) && selectedLyrics.length === 4) {
          setMessage({
            type: "warning",
            title: "Too many lines",
            text: "Please select a maximum of 4 lines"
          })
          return // Only allow up to 4 lines selected
        }*/
    if (!selectedLyrics.find(selectedLyric => selectedLyric.id === lyric.id)) {
      selectLyric(lyric)
    } else {
      // Deselect all if there is a note
      if (selectedNote) {
        deSelectAllLyrics();
      } else {
        deSelectLyric(lyric);
      }
    }
    let contentHeight = ref.current.getBoundingClientRect().height;
    setTop(arrowTop);

    /*  If the content is shorter than the
        available space then center it */
    if (contentHeight / 2 < maxY && (arrowTop + contentHeight) < lyricsHeight) {
      let diff = (arrowTop - (contentHeight / 2))
      setOffset(diff > 0 ? diff + 10 : 0) // + 10px for half the height of the arrow
    } else if ((arrowTop + contentHeight) > lyricsHeight) {
      setOffset(lyricsHeight - contentHeight)
    } else {
      let newTop = arrowTop - maxY;
      setOffset(newTop > 0 ? newTop : 0)
    }
  }

  function handleToggleChecked(lyric, checked) {
    if (checked) {
      assignLyric(lyric)
    } else {
      unAssignLyric(lyric)
    }
  }

  function assignLyric(lyric) {
    if (assignedLyrics.find(assignedLyric => assignedLyric.id === lyric.id)) return

    assignLyricMutation({
      variables: {
        lessonId: lesson.id,
        lyricId: lyric.id
      }
    }).then(response => {
      setAssignedLyrics(prevState => ([
        ...prevState,
        lyric
      ]));
    })
  }

  function unAssignLyric(lyric) {
    unAssignLyricMutation({
      variables: {
        lessonId: lesson.id,
        lyricId: lyric.id
      }
    }).then(response => {
      if (assignedLyrics.length === 0) {
        setAssignedLyrics([]);
      } else {
        setAssignedLyrics(prevState => {
          return prevState.filter(assignedLyric => assignedLyric.id !== lyric.id)
        });
        deSelectLyric(lyric);
      }
    })
  }

  function deSelectAllLyrics() {
    setSelectedNote(null);
    setSelectedLyrics([]);
    return
  }

  function selectLyric(lyric) {
    if (lyric.notes && lyric.notes.length) {
      setSelectedNote(lyric.notes[0])
      setSelectedLyrics(lyric.notes[0].lyrics)
      return
    }
    if (selectedNote
      && selectedNote.lyrics
      && !selectedNote.lyrics.find(selectedLyric => selectedLyric.id === lyric.id)
    ) {
      setSelectedNote(null)
      setSelectedLyrics([lyric])
      return
    }
    selectedLyrics.push(lyric);
    let sortedLyrics = selectedLyrics.sort((a, b) => {
      return a.order > b.order ? 1 : b.order > a.order ? -1 : 0
    })
    assignLyric(lyric);
    setSelectedNote(null);
    setSelectedLyrics(sortedLyrics);
  }

  function deSelectLyric(lyric) {
    let sortedLyrics = selectedLyrics.filter(selectedLyric => selectedLyric.id !== lyric.id)
    sortedLyrics = sortedLyrics.sort((a, b) => {
      return a.order > b.order ? 1 : b.order > a.order ? -1 : 0
    })
    setSelectedLyrics(sortedLyrics);
  }

  function assignAllLyrics() {
    lesson.guide.lyrics.map(lyric => assignLyric(lyric))
    refetch()
  }

  function assignNoLyrics() {
    lesson.guide.lyrics.map(lyric => unAssignLyric(lyric));
    refetch();
  }

  function combineLyrics() {
    /* Combine Guide Lyrics with Lesson Lyrics */
    var combinedLyrics = lesson.guide.lyrics.map(l1 => {
      return Object.assign({}, l1, lesson.lyrics.filter(l2 => l1.id === l2.id)[0])
    });

    setAssignedLyrics(lesson.lyrics);
    setLyrics(combinedLyrics);
  }

  useEffect(() => {
    combineLyrics();
  }, [lesson])

  if (!lyrics) return <Loader />
  return (
    <>
      <Heading>
        <h2>Assign Lyrics</h2>
        <MediumSpace>
          <h2>{lesson.lessonTitle}</h2>
          <h3>A lesson plan for <a href={`https://www.youtube.com/watch?v=${lesson.guide.videoId}`} target="_blank">{lesson.guide.videoTitle}</a></h3>
        </MediumSpace>
      </Heading>

      <LargeSpace>
        <p>Select lyrics to make them annotatable for this lesson. You can add notes to the lyrics that will be displayed to the students. You can also create an example annotation to further illustrate your expectations.</p>
      </LargeSpace>

      <MediumSpace>
        <LinkButton onClick={assignAllLyrics}>Assign All</LinkButton>
        <LinkButton onClick={assignNoLyrics}>Assign None</LinkButton>
      </MediumSpace>

      <StyledColumns>
        <Lyrics
          isSelectable={true}
          lyrics={lyrics}
          assignedLyrics={assignedLyrics}
          selectedLyrics={selectedLyrics}
          refetch={refetch}
          toggleChecked={handleToggleChecked}
          onClick={handleLyricClick} />
        <StyledMovingColumn
          arrowTop={top}
          contentTop={offset}
          className={selectedLyrics.length ? "" : "hidden"}>
          <div className="arrow"></div>
          <div className="content" ref={ref}>
            <NoteForm
              refetch={refetch}
              note={selectedNote}
              setSelectedNote={setSelectedNote}
              selectedLyrics={selectedLyrics}
              setSelectedLyrics={setSelectedLyrics}
              lesson={lesson} />
          </div>
        </StyledMovingColumn>
      </StyledColumns>
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

export default LessonLyricsForm

const StyledMovingColumn = styled.div`
  position: relative;
  opacity: 1;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .arrow {
    position: absolute;
    display: block;
    width: 2rem;
    height: 2rem;
    border-left: 3px solid #DD3333;
    border-top: 3px solid #DD3333;
    background-color: #FFFFFF;
    transform: rotate(-45deg);
    transition: all .3s ease;
    left: -0.9rem;
    z-index: 10;

    top: ${props => props.arrowTop}px;
  }

  .content {
    position: absolute;
    padding-left: 2rem;
    border-left: 3px solid #DD3333;
    transition: all .3s ease;
    z-index: 5;
    min-height: 7rem;
    top: ${props => props.contentTop}px;
  }
`