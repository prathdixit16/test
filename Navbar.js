import React, { Component, useEffect, useState } from 'react'
import './Navbar.css';
import { Button, ButtonGroup } from '@material-ui/core';
import Logo from '../images/Company Logo/HeroLogoCropped.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const drawerWidth = 350;

const logo = {
    marginTop:'10px',
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '35px',
    justifyContent: 'center',
    display: 'flex',
    // minWidth: '210px'
}
const button = {
    marginTop:'0px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '35px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#ffffff',
    width: window.innerWidth/4/1.75,
    minWidth: '120px',
    height: '40px'
}

const Navbar = ({userType}) => {
    const [navWidth, setNavWidth] = useState(window.innerWidth/4);
    const [navHeight, setNavHeight] = useState(window.innerHeight);
    const updateWidthAndHeight = () => {
        if(window.innerWidth/4 <= 210) {
            setNavWidth(210)
        } else {
            setNavWidth(window.innerWidth/4);
        }
        setNavHeight(window.innerHeight/4);
    }

    let firstButton, secondButton, thirdButton, fourthButton, fifthButton, sixthButton;
    let firstLink, secondLink, thirdLink, fourthLink, fifthLink, sixthLink;

    if (userType === 'buildingOperator') {
        firstButton = "HOME";
        firstLink = "/home";
        secondButton = "OVERVIEW";
        secondLink = "/overview";
        thirdButton = "DEVICES";
        thirdLink = "/devices";
        fourthButton = "OBSERVER";
        fourthLink = "/observer";
        fifthButton = "CONTROL";
        fifthLink = "/control";
        sixthButton = "CONFIGURE";
        sixthLink = "/configure";
    } else if (userType === 'v2gParticipant') {
        firstButton = "HOME";
        firstLink = "/home";
        secondButton = "MY BADGES";
        secondLink = "/myBadges";
        thirdButton = "MY SCHEDULE";
        thirdLink = "/mySchedule";
        fourthButton = "OVERRIDE";
        fourthLink = "/override";
    } else if (userType === 'utility') {
        firstButton = "HOME";
        firstLink = "/home";
        secondButton = "DEMAND";
        secondLink = "/demand";
        thirdButton = "RESPONSE";
        thirdLink = "/response";
        fourthButton = "CONTROL";
        fourthLink = "/control";
    } else {
        // NOT SURE WHAT TO DO
    }

    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => {
            window.removeEventListener("resize", updateWidthAndHeight);
        }
    });

    return (
        <div>
            <div className="Navbar" style={logo}>
                <img src={Logo} alt="HeroLogo" width={navWidth/1.75}/>
            </div>
                { firstButton &&
                    <Button variant='contained' style={button} to={firstLink}>
                        {firstButton}
                    </Button>
                }
                { secondButton &&
                    <Button variant='contained' style={button}>
                        {secondButton}
                    </Button>
                }
                { thirdButton &&
                    <Button variant='contained' style={button}>
                        {thirdButton}
                    </Button>
                }
                { fourthButton &&
                    <Button variant='contained' style={button}>
                        {fourthButton}
                    </Button>
                }
                { fifthButton &&
                    <Button variant='contained' style={button}>
                        {fifthButton}
                    </Button>
                }
                { sixthButton &&
                    <Button variant='contained' style={button}>
                        {sixthButton}
                    </Button>
                }
            <div style={logo}>{`Navbar navWidth = ${navWidth}`}</div>
            <div style={logo}>{`Navbar navHeight = ${navHeight}`}</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      authenticated: state.authenticated,
      userType: state.userType
    }
  };

export default connect(mapStateToProps)(Navbar);


{/* <div>
            <div className="Navbar" style={logo}>
                <img src={Logo} alt="HeroLogo" width={navWidth/1.75}/>
            </div>
                <Button variant='contained' style={button} width={navWidth/1.75}>
                    HOME
                </Button>
                <Button variant='contained' style={button}>
                    OVERVIEW
                </Button>
                <Button variant='contained' style={button}>
                    DEVICES
                </Button>
                <Button variant='contained' style={button}>
                    OBSERVE
                </Button>
                <Button variant='contained' style={button}>
                    CONTROL
                </Button>
                <Button variant='contained' style={button}>
                    CONFIGURE
                </Button>
            <div style={logo}>{`Navbar navWidth = ${navWidth}`}</div>
            <div style={logo}>{`Navbar navHeight = ${navHeight}`}</div>
        </div> */}
