import React, { useState, useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react';

import { SmallSpace, MediumSpace } from '../../styles/PageStyles'
import { ButtonBlock } from '../../styles/FormStyles'
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'
import { UserContext } from '../../context/UserContext'
import { Message } from '../ui/Message'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_NOTE, DELETE_NOTE } from '../../queries/note'

export const NoteForm = ({ selectedLyrics, setSelectedLyrics, lesson }) => {

  /* Context */
  const { user } = useContext(UserContext)

  /* State */
  const [noteType, setNoteType] = useState("Note")
  const [note, setNote] = useState("<p></p>")
  const [message, setMessage] = useState(null)

  /* Queries */
  const [createNote] = useMutation(CREATE_NOTE)

  function cancel() {
    setSelectedLyrics([]);
  }

  function handleNoteContent(content, editor) {
    setNote(content);
  }

  function saveNote() {
    createNote({
      variables: {
        note,
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
      setMessage({
        type: "success",
        title: "Note Added!",
        text: "Your note has been successfully saved."
      })
    })
  }

  return (
    <div>
      <h3>Add {noteType}</h3>
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
          value={note}
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
              checked={noteType === "Example"}
              onChange={(e) => {
                if (e.target.checked) {
                  setNoteType("Example");
                } else {
                  setNoteType("Note");
                }
              }}
            />
          </label>
        </p>
      </SmallSpace>
      <ButtonBlock style={{ marginTop: "1rem" }}>
        <LinkButton onClick={cancel}>cancel</LinkButton>
        <Button onClick={saveNote}>Save</Button>
      </ButtonBlock>
      {message &&
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
