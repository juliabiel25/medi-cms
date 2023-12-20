import { Link } from "react-router-dom";

const Header = () => {
  return (
         <header>
          <div className="container">
               <div className="row">

                    <div className="col-md-4 col-sm-5">
                         <a href="/">
                              <p>Welcome to a Professional Health Care</p>
                         </a>
                    </div>
                         
                    <div className="col-md-8 col-sm-7 text-align-right">
                         <span
                              className="phone-icon"
                              onClick={() => window.open('tel:900300400')}
                         >
                              <i className="fa fa-phone"></i>
                              010-060-0160
                         </span>
                         <span className="date-icon"><i className="fa fa-calendar-plus-o"></i> 6:00 AM - 10:00 PM (Mon-Fri)</span>
                         <Link
                              to='#'
                              onClick={(e: any) => {
                                   window.location.href = "mailto:info@company.com";
                                   e.preventDefault();
                              }}
                              className="email-icon"
                         >
                              <i className="fa fa-envelope-o" style={{marginRight: "5px", marginLeft: "10px"}}></i>
                              <a>info@company.com</a>
                         </Link>
                    </div>

               </div>
          </div>
     </header>
  )
}

export default Header;