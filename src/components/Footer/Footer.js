import React from 'react'
import './Footer.css';


const FooterComponent = () => (
  <div className="footer">

        &copy; Dog Food {(new Date().getFullYear())}

  </div>
)

export default FooterComponent