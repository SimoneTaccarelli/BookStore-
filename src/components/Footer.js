import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { Row } from 'react-bootstrap';


function MyFooter() {
  return (
    <>
      <footer className="mt-5 row bg-secondary">
        <Row className='mt-3'>
          <div className=' d-flex justify-content-center align-items-center'>
            <BsFacebook className='mx-2' />
            <BsInstagram className='mx-2' />
            <BsTwitter className='mx-2' />
            <BsYoutube className='mx-2' />
          </div>
        </Row>
        <Row className='mt-3'>
          <div className="d-flex justify-content-center align-items-center">
            <p className='mx-2'>Privacy Policy</p>
            <p className='mx-2'>Terms of Use</p>
            <p className='mx-2'>Contact Us</p>
          </div>
        </Row>
      </footer>
    </>
  );
}

export default MyFooter;
