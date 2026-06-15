
import React, { useEffect, useRef,useState } from "react";

import { AudioVisualizer } from "../common/AudioVisualizer";
import {FunctionGrapher} from "../common/FunctionGrapher";
import { NavBar } from "../common/navbar";
import "../../css/dimensions.css";
import "../../css/fonts.css";
import "../../css/slider.css";
type Images = Record<string, string>;

interface Project {
  title: string;
  link: string;
  description: string;
  media: any[];
}

interface ProjectItemProps {
  project: Project;
}

const getImgPath = (imageName: string) => `${process.env.PUBLIC_URL}/fast_imgs/${imageName}`;
const images: Images = {
calculator: getImgPath('calculator.webp'),
  webCam: getImgPath('webCam.mp4'),
  theVibeCheck_video: getImgPath('theVibeCheck_Video.mp4'),
  zelda_1: getImgPath("zelda_1.png"),
  zelda_3: getImgPath("zelda_3.png")
};

const projectsData: Project[] = [
  {
    title: "This Website (Typescript)",
    link: "https://github.com/austinhutchen/austinscode",
    description:
      "This website is programmed to be mobile-first, optimized to run well on any device with an internet connection! Click the title text for a link to the source code.",
    media: [{}],
  },
   {
 title: "Calculator App (Flutter /C)",
    link: "https://github.com/austinmorozane/qwikCalculator",
    description: "A calculator app, programmed by me in C using the Dart/Flutter Framework. Has custom functions for transcendental operations including sine,cosine, and factorial.",
       media: [{ type: "image", src: images["calculator"] }],
  },
  {
  title: "The Vibe Check (BootStrap / SQL / Typecript)",
  link: "https://github.com/mali7617/thevibecheck",
  description: "A mapping engine that returns nearby locations based on your inputted mood. Uses modern technologies such as GoogleMaps Places API, SQL backend, Chrome Extension and Javascript. Working on a team, I helped design security for the SQL backend, optimized scripts and CSS animations for the frontend.",
  media: [{ type:"video",src:images["theVibeCheck_video"]}],
  },
  {
    title: "WebCam Interface (Typescript)",
    link: "https://github.com/austinmorozane/webCam",
    description: "An asynchronous webcam interface (like photobooth) that used the FEAN stack to compress and store video data in blob format on a FireBase server.",
    media:  [{ type: "video", src: images["webCam"]}] ,
  },{
    title: "Terminal Scroller (C++)",
    link: "https://github.com/austinmorozane/levelQuest",
    description:"A terminal scroller based on the Zelda franchise, in which the player moves through maze-like settings to gather armor and meet UTF-8 enemies. Features color graphics and can be compiled on almost any computer. A later port is featured on my github, in which the game runs on a 16x2 LCD from an Arduino uno R3, and the player moves using a wired joystick and pointers.",
    media: [
      { type: "image", src:images["zelda_1"]},
      {type:"image", src:images["zelda_3"]}
    ]
  }
 ];
const ProjectList: React.FC = () => (
  <div className="projVid">
    {projectsData.map((project, index) => (
      <ProjectItem key={index} project={project} />
    ))}
  </div>
);

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const mediaRefs = useRef<(HTMLImageElement | HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    mediaRefs.current = mediaRefs.current.slice(0, project.media.length);
    for (const mediaRef of mediaRefs.current) {
      if (mediaRef) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (mediaRef instanceof HTMLImageElement) {
                mediaRef.src = mediaRef.dataset.src || '';
              } else if (mediaRef instanceof HTMLVideoElement) {
                const source = document.createElement('source');
                source.src = mediaRef.dataset.src || '';
                mediaRef.appendChild(source);
                mediaRef.load();
              }
              observer.disconnect();
            }
          });
        }, { rootMargin: '-10px' });
        observer.observe(mediaRef);
        observers.push(observer);
      }
    }
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [project]);
  return (
    <div>
      <div className="fadeSide" style={{textShadow: "2px 2px 4px black"}} >
       
  <h2 className="hlight">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.title}
          </a>
        </h2> 
        <br />
      </div>
      {project.media.map((mediaItem, index) => {
        if (mediaItem.type === 'video') {
          return (
            <video
              className="projVid"
              key={mediaItem.src}
              ref={el => mediaRefs.current[index] = el}
              data-src={mediaItem.src}
              autoPlay
              muted
              playsInline
              loop
            />
          );
        } else if (mediaItem.type === 'image') {
          return (
            <img
              className="projImg"
              key={mediaItem.src}
              ref={el => mediaRefs.current[index] = el}
              data-src={mediaItem.src}
              alt={project.title}
            />
          );
        } else {
          return null;
        }
      })}
      <div className="projDesc">
        <div className="fadeSide" style={{ margin: '0 auto'}}>
          <br />
          <h3>{project.description}</h3>
      </div>
      </div>
    </div>
  );
};
// Main Projects Component
export const Projects: React.FC = () => {
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

    return (
    <div>
      <NavBar />
   

     
      <ProjectList />
       <div className="fadeSide" style={{ margin: '0 auto', textShadow: "2px 2px 4px black" }}>
             <h2 className="hlight"> <a href="https://github.com/austinhutchen/austinscode/tree/master/src/components/common" rel="noopener noreferrer">FM Sound Spectrum Analyzer (Typescript) </a> </h2>
        <br />
          <div className='projDesc'>
          <div className='fadeSide' style={{ margin: '0 auto'}}>
<p >
              Visualize this effect in real time with the interface below! This is a web program that decomposes your microphone's audio spectrum. The program then displays your voice's audio spectrum in an HTML canvas element, for you to see.
          </p>
          </div>
          </div>
      </div>
    
<br/>
        <AudioVisualizer
       stream={audioStream}
        setStream={setAudioStream}
      />

<FunctionGrapher/> 


    </div>
  );
};
