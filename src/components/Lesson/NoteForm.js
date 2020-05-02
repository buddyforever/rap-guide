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
import { CREATE_NOTE, DELETE_NOTE } from '../../queries/note'

export const NoteForm = ({ refetch, note, setSelectedNote, selectedLyrics, setSelectedLyrics, lesson }) => {

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
  const [deleteNoteMutation] = useMutation(DELETE_NOTE)

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
        refetch()
      })
    } else {
      alert("UPDATE");
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

  return (
    <div>
      <h3>{editMode ? "Edit" : "Add"} {isExample ? "Example Annotation" : "Note"}</h3>
      {selectedLyrics.length > 0 &&
        <div>
          <h6 style={{ margin: "1rem 0" }}>Selected Lyrics</h6>
          {selectedLyrics.map(lyric => {
            return (
              <em style={{ display: "block", marginBottom: ".5rem" }} key={lyric.id}>{lyric.lyric}</em>
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
      <SmallSpace style={{ textAlign: "right" }}>
        <p>
          <label style={{ cursor: "pointer" }}>
            <span style={{ marginRight: "1rem" }}>Make this an example annotation </span>
            <input
              type="checkbox"
              value={isExample}
              checked={isExample}
              onChange={(e) => { setIsExample(e.target.checked) }}
            />
          </label>
        </p>
      </SmallSpace>
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
