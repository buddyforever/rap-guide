import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { animals } from '../data/animals'
import { ConfirmButton, Button, Message } from './ui'
import { FormBlock, ButtonBlock } from '../styles/FormStyles'
import { MediumSpace } from '../styles/PageStyles'
import { DotWave } from '../components/ui'
import { UserContext } from '../context/UserContext'

import { useMutation } from '@apollo/react-hooks'
import { UPDATE_DISPLAY_NAME } from '../queries/accounts'

export const AnimalChooser = ({ closeModal }) => {

  const [message, setMessage] = useState(null)
  const [animal, setAnimal] = useState(null)
  const [selectedAnimal, setSelectedAnimal] = useState("")
  const [random, setRandom] = useState(null)
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [active, setActive] = useState(-1)

  /* Context */
  const { user, setUser } = useContext(UserContext)

  /* Router */
  const history = useHistory();

  /* Queries */
  const [updateDisplayname] = useMutation(UPDATE_DISPLAY_NAME)

  function handleSelectAnimal() {
    if (animals.includes(selectedAnimal)) {
      let num = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
      let displayName = selectedAnimal.replace(/\s+/g, '-').toLowerCase() + "-" + num;
      setUser({
        ...user,
        displayName
      })
      closeModal()
      updateDisplayname({
        variables: {
          email: user.email,
          displayName
        }
      }).then(response => {
        history.push("/profile")
      })
    } else {
      setMessage({
        type: 'error',
        title: 'Invalid Animal',
        text: `You must select a valid animal`
      })
    }
  }

  function chooseRandomAnimal() {
    return animals[Math.floor(Math.random() * animals.length)];
  }

  function selectRandomAnimal(e) {
    e.preventDefault()
    setFilteredAnimals([])
    setSelectedAnimal("")
    var x = 0
    var flipInterval = setInterval(() => {
      let randomAnimal = chooseRandomAnimal()
      setRandom(randomAnimal)

      if (++x === 25) {
        window.clearInterval(flipInterval)
        setSelectedAnimal(randomAnimal)
      }
    }, 50)
  }

  function checkAnimalNames(e) {
    let keyword = e.target.value.toLowerCase()
    setSelectedAnimal(keyword)
    if (!keyword.length) {
      setFilteredAnimals([]);
      return
    }
    let results = animals
      .filter(animal => {
        return animal.toLowerCase().includes(keyword.toLowerCase());
      })
      .sort((a, b) => {
        if (a.toLowerCase().indexOf(keyword.toLowerCase()) > b.toLowerCase().indexOf(keyword.toLowerCase())) {
          return 1;
        } else if (a.toLowerCase().indexOf(keyword.toLowerCase()) < b.toLowerCase().indexOf(keyword.toLowerCase())) {
          return -1;
        } else {
          if (a > b)
            return 1;
          else
            return -1;
        }
      });
    setFilteredAnimals(results.slice(0, Math.min(5, results.length)))
  }

  function autoCompleteSelect(e) {
    e = e || window.event

    if (!filteredAnimals.length) return
    if (e.keyCode === 38) {
      setActive(prevState => Math.max(0, prevState - 1))
    } else if (e.keyCode === 40) {
      setActive(prevState => Math.min(filteredAnimals.length - 1, prevState + 1))
    } else if (e.keyCode === 13) {
      e.preventDefault()
      setSelectedAnimal(document.querySelector(".animal--active").innerHTML)
      setFilteredAnimals([])
    }
  }

  function intervalFunction() {
    setAnimal(chooseRandomAnimal())
  }

  useEffect(() => {
    let int = setInterval(intervalFunction, 3000)
    return (int) => {
      clearInterval(int)
    }
  }, [])

  if (!animal) return <DotWave />
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "auto" }}>
      <FormBlock style={{ margin: 0, fontSize: '1.2em' }}>
        <h1><span className="red">Choose</span> an Animal Name</h1>
        <p style={{ marginTop: "2rem" }}>On <Link to="/">RapGuide.com</Link> we use animal names to keep your real name private until you choose otherwise. Search for an animal name or allow us to choose one for you at random!</p>
        <MediumSpace style={{ marginTop: "50px" }}>
          <label>Find an Animal</label>
          <div style={{
            display: "flex",
            alignItems: "center",
            position:
              "relative"
          }}>
            <input
              style={{ height: "4.5rem", textTransform: "capitalize" }}
              type="text"
              value={selectedAnimal}
              placeholder="Monkey..."
              onChange={checkAnimalNames}
              onKeyDown={autoCompleteSelect}
            />
            <Button onClick={selectRandomAnimal}>Randomize</Button>
            {filteredAnimals.length > 0 &&
              <StyledAutocomplete
                className="animalAutoComplete"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}>
                {filteredAnimals.map((animal, index) => (
                  <div
                    style={{ textTransform: "capitalize" }}
                    key={animal}
                    className={active === index ? 'animal--active' : null}
                    onClick={() => {
                      setFilteredAnimals([])
                      setSelectedAnimal(animal)
                    }}>
                    {animal}
                  </div>
                ))}
              </StyledAutocomplete>
            }
          </div>
        </MediumSpace>
        {!random &&
          <div>
            <label style={{ display: "block" }}>examples:</label>
            <AnimatePresence exitBeforeEnter>
              <motion.span
                key={animal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <em style={{
                  fontSize: "2.2rem",
                  fontWeight: "bold",
                  marginLeft: "2rem",
                  textTransform: "capitalize"
                }}>
                  {animal}
                </em>
              </motion.span>
            </AnimatePresence>
          </div>
        }
        {random &&
          <em style={{
            fontSize: "2.2rem",
            fontWeight: "bold",
            marginLeft: "2rem",
            textTransform: "capitalize",
            transition: "all .3s ease"
          }}
            className={selectedAnimal.length > 0 ? "big" : ""}>
            {random}
          </em>
        }
      </FormBlock>
      <ButtonBlock style={{ justifyContent: "space-around", marginTop: "2.5rem" }}>
        <ConfirmButton
          preClick={() => {
            setFilteredAnimals([])
            if (!animals.includes(selectedAnimal)) {
              setMessage({
                type: 'error',
                title: 'Invalid Animal',
                text: `You must select a valid animal`
              })
              return false
            }
            return true
          }}
          onConfirm={handleSelectAnimal}
        >
          Choose This Animal
        </ConfirmButton>
      </ButtonBlock>
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
    </motion.div >
  )
}

export default AnimalChooser

const StyledAutocomplete = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  background-color: white;
  border-left: 1px solid #CBD5E0;
  border-right: 1px solid #CBD5E0;

  & > div {
    padding: 1rem 1.5rem;
    cursor: pointer;
    border-bottom: 1px solid #CBD5E0;
    transition: background-color .3s ease;

    &:hover,
    &.animal--active {
      background-color: grey;
      color: white;
    }
  }
`