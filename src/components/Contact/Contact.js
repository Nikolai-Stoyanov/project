import React from 'react';
import './Contact.css'


function Contact() {

  return (
    <div className='Contact'>
      <h1>Contact</h1>
      <section className='left-section'>
        <h3>Information</h3>
        <p>If any of the above mentioned terms and conditions of the "Dog Food" are in the pipeline, 
          please do not hesitate to contact us. Here's what I think we'll answer as soon as possible.
          </p>
        <p><span>tel: </span>  0888997721</p>
        <p><span>email: </span> info@dogfood.bg</p>
        <p><span>Work time: </span></p>
        <p>
        <span>Every day</span>
    <br />
    <span>9:00 - 19:00</span>
  </p>
      </section>
      <section className='right-section'>
        <h3>Send a message</h3>
        <form>
          <label>
            <span>Name:</span>
            <input></input>
          </label>
          <label>
          <span>Email:</span>
            <input></input>
          </label>
          <label>
          <span>Tel:</span>
            <input></input>
          </label>
          <label>
          <span>Message:</span>
            <textarea></textarea>
          </label>
          <button className='btn'>Send</button>
        </form>
      </section>
    </div>


  );
}

export default Contact;