import React, { useState, useContext, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';

import { SmallSpace, MediumSpace } from '../../styles/PageStyles'
import { ButtonBlock } from '../../styles/FormStyles'
import { Button } from '../ui/Button'
import { ConfirmButton } from '../ui/ConfirmButton'
import { LinkButton } from '../ui/LinkButton'
import { UserContext } from '../../context/UserContext'
import { Message } from '../ui/Message'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE, PUBLISH_NOTE } from '../../queries/note'
import { PUBLISH_ACCOUNT } from '../../queries/accounts'
import { PUBLISH_LESSON } from '../../queries/lessons'

export const NoteForm = ({
  refetch,
  note,
  setSelectedNote,
  selectedLyrics,
  setSelectedLyrics,
  lesson,
  hasExample
}) => {

  /* Context */
  const { user } = useContext(UserContext)

  /* State */
  const [editMode, setEditMode] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [content, setContent] = useState("<p></p>")
  const [message, setMessage] = useState(null)
  const [isExample, setIsExample] = useState(false)

  /* Queries */
  const [createNoteMutation] = useMutation(CREATE_NOTE)
  const [updateNoteMutation] = useMutation(UPDATE_NOTE)
  const [deleteNoteMutation] = useMutation(DELETE_NOTE)
  const [publishNote] = useMutation(PUBLISH_NOTE)
  const [publishLesson] = useMutation(PUBLISH_LESSON)
  const [publishAccount] = useMutation(PUBLISH_ACCOUNT)

  function cancel() {
    setSelectedLyrics([]);
  }

  function handleNoteContent(content, editor) {
    setContent(content);
  }

  function saveNote() {
    if (!note) {
      createNoteMutation({
        variables: {
          note: content,
          isExample,
          account: {
            id: user.id
          },
          lyrics: selectedLyrics.map(lyric => {
            return {
              id: lyric.id
            }
          }),
          lesson: lesson.id
        }
      }).then(response => {
        setSelectedNote(response.data.createNote)
        setEditMode(true)
        setMessage({
          type: "success",
          title: "Note Saved!",
          text: "Your note has been successfully saved."
        })
        publishNote({
          variables: {
            ID: response.data.createNote.id
          }
        })
        publishLesson({
          variables: {
            ID: lesson.id
          }
        })
        publishAccount({
          variables: {
            ID: user.id
          }
        })
        refetch()
      })
    } else {
      updateNoteMutation({
        variables: {
          id: note.id,
          note: content,
          isExample
        }
      }).then(response => {
        setSelectedNote(response.data.updateNote)
        setMessage({
          type: "success",
          title: "Note Saved!",
          text: "Your note has been successfully saved."
        })
        publishNote({
          variables: {
            ID: response.data.updateNote.id
          }
        })
        publishLesson({
          variables: {
            ID: lesson.id
          }
        })
        publishAccount({
          variables: {
            ID: user.id
          }
        })
        refetch()
      })
    }
  }

  function deleteNote() {
    deleteNoteMutation({
      variables: {
        id: note.id
      }
    }).then(response => {
      setSelectedLyrics([])
      setSelectedNote(null)
      setEditMode(false)
      publishNote({
        variables: {
          ID: response.data.deleteNote.id
        }
      })
      publishLesson({
        variables: {
          ID: lesson.id
        }
      })
      publishAccount({
        variables: {
          ID: user.id
        }
      })
      refetch()
    })
  }

  useEffect(() => {
    if (!note || !note.lyrics) {
      setEditMode(false)
      setContent("<p></p>")
      setIsExample(false)
      return
    }
    setSelectedLyrics(note.lyrics.sort((a, b) => {
      return a.order > b.order ? 1 : b.order > a.order ? -1 : 0
    }));
    setEditMode(true);
    setContent(note.note);
    setIsExample(note.isExample)
  }, [note])

  let prevOrder = null;

  return (
    <div>
      <h3>{editMode ? "Edit" : "Add"} {isExample ? "Example Annotation" : "Note"}</h3>
      {selectedLyrics.length > 0 &&
        <div>
          <h6 style={{ margin: "1rem 0" }}>Selected Lyrics</h6>
          {selectedLyrics.map(lyric => {
            let brokenLyrics = false;
            if (prevOrder !== null && lyric.order !== prevOrder + 1) {
              brokenLyrics = true;
            }
            prevOrder = lyric.order;
            return (
              <em
                key={lyric.id}
                style={{ display: "block", marginBottom: ".5rem" }}
              >
                {brokenLyrics && <div>...</div>}
                {lyric.lyric}
              </em>
            )
          })}
        </div>
      }
      <MediumSpace>
        <Editor
          style={{ width: "100%" }}
          initialValue="<p></p>"
          value={content}
          apiKey="6fh30tpray4z96bvzqga3vqcj57v5hvg2infqk924uvnxr13"
          init={{
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | link | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={handleNoteContent}
        />
      </MediumSpace>
      {(!hasExample || isExample) &&
        <SmallSpace style={{ textAlign: "right" }}>
          <p>
            <label style={{ cursor: "pointer" }}>
              <span
                style={{ marginRight: "1rem" }}
              >Make this an example annotation </span>
              <input
                type="checkbox"
                value={isExample}
                checked={isExample}
                onChange={(e) => { setIsExample(e.target.checked) }}
              />
            </label>
          </p>
        </SmallSpace>
      }
      <ButtonBlock style={{ marginTop: "1rem" }}>
        <LinkButton onClick={cancel}>cancel</LinkButton>
        <div>
          {editMode &&
            <ConfirmButton
              style={{ marginRight: "1rem" }}
              secondary
              onClick={(checked) => setIsDelete(checked)}
              onConfirm={deleteNote}>Delete</ConfirmButton>
          }
          {!isDelete &&
            <Button onClick={saveNote}>Save</Button>
          }
        </div>
      </ButtonBlock>
      {
        message &&
        <Message
          toast
          style={{ marginTop: "1rem" }}
          dismiss={() => setMessage(null)}
          type={message.type}
          title={message.title}>
          {message.text}
        </Message>
      }
    </div >
  )
}

export default NoteForm
