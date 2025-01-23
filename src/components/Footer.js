import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";


function MyFooter() {
  return (
    <>
    <footer className="mt-5 row bg-secondary">
        <div className="col-md-4">
            <ul className="list-unstyled ">
                <li><BsFacebook /></li>
                <li><BsInstagram/></li>
                <li><BsTwitter /></li>
                <li><BsYoutube /></li>
            </ul>
        </div>
        <div className="col-md-4">
            <ul className="list-unstyled">
                <li>Privacy Policy</li>
                <li>Terms of Use</li>
                <li>Contact Us</li>
            </ul>
        </div>
      </footer>
    </>
  );
}

export default MyFooter;
