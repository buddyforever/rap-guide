import React from 'react'
import { faReply } from '@fortawesome/free-solid-svg-icons'

import { StyledContent, Heading, FullSection, MediumSpace } from '../../styles/PageStyles'
import { Form, FormBlock, ButtonBlock } from '../../styles/FormStyles'
import { Button } from '../ui'

export const Request = () => {
  return (
    <>
      <FullSection style={{ display: "flex", alignItems: "center" }}>
        <StyledContent>
          <Heading>
            <h2>Contact us with any questions or comments, or to request an educator account.</h2>
          </Heading>
          <Form name="contact" method="post">
            <FormBlock style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%" }}>
                <label>First Name</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div style={{ width: "45%" }}>
                <label>Last Name</label>
                <input type="text" placeholder="Last Name" />
              </div>
            </FormBlock>
            <FormBlock>
              <label>Email</label>
              <input type="email" placeholder="email" />
            </FormBlock>
            <FormBlock>
              <label>Subject</label>
              <input type="text" placeholder="subject" />
            </FormBlock>
            <FormBlock>
              <label>Message</label>
              <textarea placeholder="message" />
            </FormBlock>
            <ButtonBlock>
              <div></div>
              <Button type="submit" iconLeft={faReply}>Send</Button>
            </ButtonBlock>
            <input type="hidden" name="form-name" value="contact" />
          </Form>
        </StyledContent>
      </FullSection>

      <FullSection style={{ display: "flex", alignItems: "center" }}>
        <StyledContent>
          <Heading>
            <h2>Join our mailing list to hear about new features and content. You’re information will never be shared.</h2>
          </Heading>
          <MediumSpace>
            <div id="mc_embed_signup">
              <form action="https://bababrinkman.us2.list-manage.com/subscribe/post?u=3d9cb01bced5d5c9b35389bf5&amp;id=e807499bb2"
                method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank"
                novalidate>
                <div id="mc_embed_signup_scroll">
                  <h2>Subscribe</h2>
                  <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
                  <div class="mc-field-group">
                    <label for="mce-EMAIL">Email Address <span class="asterisk">*</span>
                    </label>
                    <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" />
                  </div>
                  <div class="mc-field-group">
                    <label for="mce-FNAME">First Name </label>
                    <input type="text" value="" name="FNAME" class="" id="mce-FNAME" />
                  </div>
                  <div class="mc-field-group">
                    <label for="mce-LNAME">Last Name </label>
                    <input type="text" value="" name="LNAME" class="" id="mce-LNAME" />
                  </div>
                  <div class="mc-field-group">
                    <label for="mce-MMERGE5">Twitter Handle </label>
                    <input type="text" value="" name="MMERGE5" class="" id="mce-MMERGE5" />
                  </div>
                  <div class="mc-field-group">
                    <label for="mce-MMERGE6">Interests </label>
                    <select name="MMERGE6" class="" id="mce-MMERGE6">
                      <option value=""></option>
                      <option value="Education">Education</option>
                      <option value="Science">Science</option>
                      <option value="Literature">Literature</option>
                      <option value="Arts">Arts</option>
                      <option value="Evolution">Evolution</option>
                      <option value="Climate Change">Climate Change</option>
                      <option value="Religion">Religion</option>
                      <option value="Neuroscience">Neuroscience</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Environmentalism">Environmentalism</option>
                      <option value="Psychology">Psychology</option>
                      <option value="Technology">Technology</option>
                      <option value="Critical Thinking">Critical Thinking</option>
                      <option value="Hip Hop">Hip Hop</option>
                    </select>
                  </div>
                  <div id="mce-responses" class="clear">
                    <div class="response" id="mce-error-response" style={{ display: 'none' }}></div>
                    <div class="response" id="mce-success-response" style={{ display: 'none' }}></div>
                  </div>
                  <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true"><input type="text"
                    name="b_3d9cb01bced5d5c9b35389bf5_e807499bb2" tabindex="-1" value="" /></div>
                  <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                    class="button" /></div>
                </div>
              </form>
            </div>
          </MediumSpace>
        </StyledContent>
      </FullSection>
    </>
  )
}

export default Request;

