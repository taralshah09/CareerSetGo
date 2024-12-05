import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import { ArrowDown } from "react-feather";
import styles from "./Body.module.css";
import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

const Body = () => {
  const colors = ["#6b46c1", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936", "#239ce2"];
  const [activeColor, setActiveColor] = useState(colors[0]);

  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };

  const contentRef = useRef();

  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: "My Resume" });

  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo, //section title is unique
      sectionTitle: sections.basicInfo,
      detail: {}, //detail is a object as we can have multiple user details e.g. phone no. address
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [], // work experience can be more than 1, so used array to respresent that
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",
    },
  });

  useEffect(() => {
    console.log(resumeInformation);
  }, [resumeInformation]);

  return (
    <div className={styles.container} style={{ width: "100%" }}>
      <p style={{ textAlign: "left", fontSize: "35px" }}>Resume Builder</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${activeColor === item ? styles.active : ""
                }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>
        <button onClick={reactToPrintFn}>Print</button>
      </div>
      <div className={styles.main}>
        <div className="editor">
          <Editor
            sections={sections}
            information={resumeInformation}
            setInformation={setResumeInformation}
          />
        </div>
        <div className="resume">
          <Resume
            ref={contentRef}
            sections={sections}
            information={resumeInformation}
            activeColor={activeColor}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
