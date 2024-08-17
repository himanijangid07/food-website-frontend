import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faMapMarkerAlt, faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-dark text-base-content p-10">
  <nav>
    <h1 className="pb-5 text-green text-2xl font-lora">Foody</h1>
    <div className='flex gap-5'>
    <a className="link link-hover">
      <FontAwesomeIcon icon={faFacebook} size='xl'/>
    </a>
    <a className="link link-hover">
      <FontAwesomeIcon icon={faInstagram} size='xl'/>
    </a>
    <a className="link link-hover">
      <FontAwesomeIcon icon={faYoutube} size='xl'/>
    </a>
    <a className="link link-hover">
      <FontAwesomeIcon icon={faLinkedin} size='xl'/>
    </a>
    </div>
  </nav>
  <nav>
    <h6 className="footer-title">Address</h6>
    <a className="link link-hover">
      <FontAwesomeIcon icon={faMapMarkerAlt} className='mr-3'/>
      123 Street, New York, USA
    </a>
    <a className="link link-hover">
      <FontAwesomeIcon icon={faPhone} className='mr-3'/>
      +012 345 67890
    </a>
    <a className="link link-hover">
      <FontAwesomeIcon icon={faEnvelope} className='mr-3'/>
      info@foody.com
    </a>
  </nav>
  <nav>
    <h6 className="footer-title">Quick Links</h6>
    <a className="link link-hover"><FontAwesomeIcon icon={faArrowRight}/> About Us</a>
    <a className="link link-hover"><FontAwesomeIcon icon={faArrowRight}/> Contact Us</a>
    <a className="link link-hover"><FontAwesomeIcon icon={faArrowRight}/> Our Services</a>
    <a className="link link-hover"><FontAwesomeIcon icon={faArrowRight}/> Terms & Conditions</a>
    <a className="link link-hover"><FontAwesomeIcon icon={faArrowRight}/> Support</a>
  </nav>
  <form>
    <h6 className="footer-title">Newsletter</h6>
    <fieldset className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label>
      <div className="join">
        <input
          type="text"
          placeholder="username@site.com"
          className="input input-bordered join-item" />
        <button className="btn btn-primary join-item">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
    <div className="footer bg-dark text-neutral-content items-center p-4">
    <aside className="grid-flow-col items-center">
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a>
      Designed by Himani Jangid
    </a>
  </nav>
    </div>
    </div>
  )
}

export default Footer
