import React, { useState, useContext, useEffect } from 'react'
import { faReply, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'

import { UserContext } from '../../context/UserContext'
import { StyledContent, Heading, FullSection, MediumSpace } from '../../styles/PageStyles'
import { Form, FormBlock, ButtonBlock } from '../../styles/FormStyles'
import { Button } from '../ui'

const values = [1, 2, 3, 4, 5]

export const Feedback = () => {

  /* Context */
  const { user, setUser } = useContext(UserContext);

  /* State */
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    console.log(user)
    if (user) {
      setFirstName(user.nameFirst)
      setLastName(user.nameLast)
      setEmail(user.email)
    }
  }, [user])

  return (
    <>
      <FullSection style={{ display: "flex", alignItems: "center", paddingBottom: "5rem" }}>
        <StyledContent>
          <Heading>
            <h2>Thank you for being one of the first early users of RapGuide.com, a new online platform for teaching and learning with rap videos. Please take a moment to give us some feedback so we can improve the experience of our users.</h2>
          </Heading>
          <Form name="feedback" method="post" data-netlify="true">
            <FormBlock style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%" }}>
                <label>First Name</label>
                <input name="firstName" type="text" placeholder="First Name" defaultValue={firstName} />
              </div>
              <div style={{ width: "45%" }}>
                <label>Last Name</label>
                <input name="lastName" type="text" placeholder="Last Name" defaultValue={lastName} />
              </div>
            </FormBlock>
            <FormBlock>
              <label>Email</label>
              <input name="email" type="email" placeholder="email" defaultValue={email} />
              <span>please use the same e-mail address that you used to sign up.</span>
            </FormBlock>
            <FormBlock>
              <label>How would you rate your experience using RapGuide.com?</label>
              <p className="rating-group">
                <span>
                  <input name="experience" type="radio" value="1" /><span>1</span>
                </span>
                <span>
                  <input name="experience" type="radio" value="2" /><span>2</span>
                </span>
                <span>
                  <input name="experience" type="radio" value="3" /><span>3</span>
                </span>
                <span>
                  <input name="experience" type="radio" value="4" /><span>4</span>
                </span>
                <span>
                  <input name="experience" type="radio" value="5" /><span>5</span>
                </span>
              </p>
            </FormBlock>
            <FormBlock>
              <label>What was your favorite part of the experience?</label>
              <textarea name="favorite"></textarea>
            </FormBlock>
            <FormBlock>
              <label>What were some areas that need improvement?</label>
              <textarea name="improvment"></textarea>
            </FormBlock>
            <FormBlock>
              <label>How interested would you be in using this platform in future classes?</label>
              <p className="rating-group">
                <span>
                  <input name="useagain" type="radio" value="1" /><span>1</span>
                </span>
                <span>
                  <input name="useagain" type="radio" value="2" /><span>2</span>
                </span>
                <span>
                  <input name="useagain" type="radio" value="3" /><span>3</span>
                </span>
                <span>
                  <input name="useagain" type="radio" value="4" /><span>4</span>
                </span>
                <span>
                  <input name="useagain" type="radio" value="5" /><span>5</span>
                </span>
              </p>
            </FormBlock>
            <FormBlock>
              <label>How interested would be in writing and filming your own original raps about educational material?</label>
              <p className="rating-group">
                <span>
                  <input name="writeyourown" type="radio" value="1" /><span>1</span>
                </span>
                <span>
                  <input name="writeyourown" type="radio" value="2" /><span>2</span>
                </span>
                <span>
                  <input name="writeyourown" type="radio" value="3" /><span>3</span>
                </span>
                <span>
                  <input name="writeyourown" type="radio" value="4" /><span>4</span>
                </span>
                <span>
                  <input name="writeyourown" type="radio" value="5" /><span>5</span>
                </span>
              </p>
            </FormBlock>
            <FormBlock>
              <label>Feel free to share any additional feedback or thoughts about the platform.</label>
              <textarea name="additional"></textarea>
            </FormBlock>
            <ButtonBlock>
              <div></div>
              <Button type="submit" iconLeft={faReply}>Send</Button>
            </ButtonBlock>
            <input type="hidden" name="form-name" defaultValue="feedback" />
          </Form>
        </StyledContent>
      </FullSection>
    </>
  )
}

export default Feedback;

