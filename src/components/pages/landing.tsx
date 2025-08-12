import React, { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import { HiArrowNarrowRight } from 'react-icons/hi';
import "../../css/TextSphere.css";
import { NavBar } from "../common/navbar";



export const Landing: React.FC = () => {
  const nav = useNavigate();
  const github = process.env.PUBLIC_URL + '/fast_imgs/github.webp';
  const intro = process.env.PUBLIC_URL + '/fast_imgs/nerdy.gif';
  return (
    <>

      <NavBar />
      <div className='animateLand' style={{maxWidth: '83svw',margin: '0 auto',display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',textAlign: 'center'}}>
  
        <div className="introText">
        <h2 className="hlight-mini">
          <b>Welcome! I'm a Software Engineer and Computer Optimization Nerd.</b>
        </h2>

          <div className="intro">
              <h2>
              As a  <a href="https://www.colorado.edu/cs/academics/undergraduate-programs/bachelor-science" rel="noopener noreferrer">Computer Science student (BSc 2027)</a> and tinker, I enjoy software development, building electronic circuits, IoT systems, and reading mathematics. I’ve also taught Calculus 2 through the <a href="https://www.colorado.edu/program/learningassistant/">Learning Assistant Program  </a> at the University of Colorado Boulder. Recently, I developed a proprietary
              <a href="https://modbus.org/docs/Modbus_over_serial_line_V1.pdf"> ModBus C#  </a> implementation for <a href="https://www.formfactor.com"> FormFactor Boulder </a>, a cryogenic quantum computing solutions company. Proficient in TypeScript, C#, and C++, <a> I actively contribute to emerging open-source projects.</a>
            </h2>
          </div>
                 </div>
        <button
          style={{marginBottom: '0.2em' }}
          className="btn btn-success"
          type="button"
          id="navbar"
          onClick={() => {
            nav('/Projects');
          }}
        >
          Software 
          <HiArrowNarrowRight size={'0.8em'} className="ml-3" />
        </button>
           <button
          style={{ marginBottom: '0.2em' }}
          className="btn btn-success"
          type="button"
          id="navbar"
          onClick={() => {
            nav('/Resume');
          }}
        >
          Experience
          <HiArrowNarrowRight size={'0.8em'} className="ml-3" />
        </button>
        <br />
        
      </div >
    </>
  );
};

