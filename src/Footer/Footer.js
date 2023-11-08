import React from "react";
import {NavLink} from "react-router-dom";
import LastFooter from "../Footer/LastFooter";
import "../Footer/footer.css";
// import { store } from "../../../ContextStore/ContextStore";

function Footer(){

    // const [cdata] = useContext(store);
    // console.log(cdata);

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth", 
        });
      };

    return(
        <>  
            <div className="Footer">
                <div className="Fcontainer">
                    <div className="Fbox1">
                        <div className='logo'>
                            
                        </div><hr/><br/>
                        <h3>Contact: +91 772 882 7144</h3>
                        <h4>Email: nagilamukesh43@gmail.com</h4>
                        <h4>Address: Pithoragarh, Uttrakhand</h4>
                        <div className="icons">
                                        {/* {cdata.filter((item) => item.category === 'FooterIcon1').map((item, index) => {
                                            return(
                                                <>
                                                    <a href="https://www.instagram.com/nagilabhai/"><img src={item.image} alt="instaimg"></img></a>
                                                </>
                                            )
                                        })}
                                        {cdata.filter((item) => item.category === 'FooterIcon2').map((item, index) => {
                                            return(
                                                <>
                                                    <a href="https://www.facebook.com/mukesh.nagila.9"><img src={item.image} alt="instaimg"></img></a>
                                                </>
                                            )
                                        })}
                                        {cdata.filter((item) => item.category === 'FooterIcon3').map((item, index) => {
                                            return(
                                                <>
                                                    <a href="https://www.linkedin.com/in/mukesh-nagila-989775255/"><img src={item.image} alt="instaimg"></img></a>
                                                </>
                                            )
                                        })}
                                        {cdata.filter((item) => item.category === 'FooterIcon4').map((item, index) => {
                                            return(
                                                <>
                                                    <a href="https://www.youtube.com/channel/UC0KGSCNE-RF1CLY3gUmop8A"><img src={item.image} alt="instaimg"></img></a>
                                                </>
                                            )
                                        })} */}
                        </div>
                    </div>
                    <div className="Fbox2">
                        <h3>Know More</h3><br/>
                        <h5>"You want potential leads to be able to get in contact with you as easily as possible. For that reason, website footers will often contain contact details like a business email, phone number, or mailing address. Or it might simply include a link that brings you to a contact form."</h5>
                    </div>
                    <div className="Fbox3">
                        <h3>Quick Link's</h3>                    
                        <div><NavLink onClick={scrollToTop} style={({isActive}) => ({color : isActive ? "blue" : "green"})} className='Linkline' to="/" >Home</NavLink></div>
                        <div><NavLink onClick={scrollToTop} style={({isActive}) => ({color : isActive ? "blue" : "green"})} className='Linkline' to="/Electronic" >Electronic</NavLink></div>
                        <div><NavLink onClick={scrollToTop} style={({isActive}) => ({color : isActive ? "blue" : "green"})} className='Linkline' to="/Sports" >Sports</NavLink></div>
                        <div><NavLink onClick={scrollToTop} style={({isActive}) => ({color : isActive ? "blue" : "green"})} className='Linkline' to="/Fitness" >Fitness</NavLink></div>
                        <div><NavLink onClick={scrollToTop} style={({isActive}) => ({color : isActive ? "blue" : "green"})} className='Linkline' to="/Men" >Men's</NavLink></div>
                        <div><NavLink onClick={scrollToTop} style={({isActive}) => ({color : isActive ? "blue" : "green"})} className='Linkline' to="/Women" >Women's</NavLink></div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                    <LastFooter />
            </div>        
        </>
    )
}

export default Footer;