import React from 'react'
import { faReply, faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { StyledContent, StyledColumns, Heading, FullSection, MediumSpace } from '../../styles/PageStyles'
import { Form, FormBlock, ButtonBlock } from '../../styles/FormStyles'
import { Button } from '../ui'

export const Request = () => {
  return (
    <>
      <FullSection style={{ display: "flex", alignItems: "center", paddingBottom: "5rem" }}>
        <StyledContent>
          <StyledColumns>
            <div style={{ padding: "0 2.5rem" }}>
              <Heading>
                <h2>Contact us with any questions or comments, or to request an educator account.</h2>
              </Heading>
              <Form name="contact" method="post">
                <FormBlock style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ width: "45%" }}>
                    <label>First Name</label>
                    <input name="firstName" type="text" placeholder="First Name" />
                  </div>
                  <div style={{ width: "45%" }}>
                    <label>Last Name</label>
                    <input name="lastName" type="text" placeholder="Last Name" />
                  </div>
                </FormBlock>
                <FormBlock>
                  <label>Email</label>
                  <input name="email" type="email" placeholder="email" />
                </FormBlock>
                <FormBlock>
                  <label>Subject</label>
                  <input name="subject" type="text" placeholder="subject" />
                </FormBlock>
                <FormBlock>
                  <label>Message</label>
                  <textarea name="message" placeholder="message" />
                </FormBlock>
                <FormBlock>
                  <label>
                    <input type="checkbox" name="educatorRequest" />
                    &nbsp;Request Educator Account
                  </label>
                </FormBlock>
                <ButtonBlock>
                  <div></div>
                  <Button type="submit" iconLeft={faReply}>Send</Button>
                </ButtonBlock>
                <input type="hidden" name="form-name" defaultValue="contact" />
              </Form>
            </div>
            <div style={{ backgroundColor: "black", color: "white", padding: "0 2.5rem" }}>
              <Heading>
                <h2>Join our mailing list to hear about new features and content. You’re information will never be shared.</h2>
              </Heading>
              <MediumSpace>
                <div id="mc_embed_signup">
                  <Form action="https://bababrinkman.us2.list-manage.com/subscribe/post?u=3d9cb01bced5d5c9b35389bf5&amp;id=e807499bb2"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank"
                    noValidate>
                    <div id="mc_embed_signup_scroll">
                      <FormBlock className="mc-field-group">
                        <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span>
                        </label>
                        <input type="email" defaultValue="" name="EMAIL" className="required email" id="mce-EMAIL" required />
                      </FormBlock>
                      <FormBlock className="mc-field-group">
                        <label htmlFor="mce-FNAME">First Name </label>
                        <input type="text" defaultValue="" name="FNAME" className="" id="mce-FNAME" />
                      </FormBlock>
                      <FormBlock className="mc-field-group">
                        <label htmlFor="mce-LNAME">Last Name </label>
                        <input type="text" defaultValue="" name="LNAME" className="" id="mce-LNAME" />
                      </FormBlock>
                      <FormBlock className="mc-field-group">
                        <label htmlFor="mce-MMERGE5">Twitter Handle </label>
                        <input type="text" defaultValue="" name="MMERGE5" className="" id="mce-MMERGE5" />
                      </FormBlock>
                      <FormBlock className="mc-field-group">
                        <label htmlFor="mce-MMERGE6">Interests </label>
                        <select name="MMERGE6" className="" id="mce-MMERGE6">
                          <option defaultValue=""></option>
                          <option defaultValue="Education">Education</option>
                          <option defaultValue="Science">Science</option>
                          <option defaultValue="Literature">Literature</option>
                          <option defaultValue="Arts">Arts</option>
                          <option defaultValue="Evolution">Evolution</option>
                          <option defaultValue="Climate Change">Climate Change</option>
                          <option defaultValue="Religion">Religion</option>
                          <option defaultValue="Neuroscience">Neuroscience</option>
                          <option defaultValue="Medicine">Medicine</option>
                          <option defaultValue="Environmentalism">Environmentalism</option>
                          <option defaultValue="Psychology">Psychology</option>
                          <option defaultValue="Technology">Technology</option>
                          <option defaultValue="Critical Thinking">Critical Thinking</option>
                          <option defaultValue="Hip Hop">Hip Hop</option>
                        </select>
                      </FormBlock>
                      <div id="mce-responses" className="clear">
                        <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                        <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                      </div>
                      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true"><input type="text"
                        name="b_3d9cb01bced5d5c9b35389bf5_e807499bb2" tabIndex="-1" defaultValue="" /></div>
                      <ButtonBlock className="clear">
                        <div></div>
                        <Button iconLeft={faEnvelope} type="submit" defaultValue="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                          className="button">Sign Up</Button>
                      </ButtonBlock>
                    </div>
                  </Form>
                </div>
              </MediumSpace>
            </div>
          </StyledColumns>
        </StyledContent>
      </FullSection>
    </>
  )
}

export default Request;

