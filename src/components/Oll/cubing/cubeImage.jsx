// Source= http://cube.rider.biz/visualcube.php
import { cubeSVG } from "sr-visualizer";
import React, { useRef, useEffect, useContext } from "react";
import _ from "lodash";


import { ThemeContext } from '../../../context/DarkThemeContext.jsx';




const CubeImageInternal = (props) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const container = imageRef.current;

    // Clear any existing SVG
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    cubeSVG(container, { ...props, colorScheme });

    // Only run when props change
  }, [props]);

  return <div ref={imageRef}></div>;
};


const Face = { U: 0, R: 1, F: 2, D: 3, L: 4, B: 5 };

const colorScheme = {
  [Face.U]: "yellow",
  [Face.R]: "red",
  [Face.F]: "#1F51FF", // brighter blue
  [Face.D]: "white",
  [Face.L]: "orange",
  [Face.B]: "#00D800", // default green
};

export const CubeImage = (props) => {
  
  const dyanmicKey = _.values(props).join();
  return <CubeImageInternal {...props} key={dyanmicKey} />;
};

CubeImage.defaultProps = {
  width: "50",
  height: "50",
};

const CaseImage = ({ size = 100, caseSetDetails, maskColor, alg, ...props }) => {
  if (!caseSetDetails) throw new Error("CaseImage must have caseSetDetails property");
  const { darkMode } = useContext(ThemeContext);
  const resolvedMaskColor = maskColor ?? (darkMode ? "#404044" : "#666");
  const cubeColor = darkMode ? "#000" : "#181818";
  const algorithm = props.case?.algs?.[0] || alg;
  const { mask, view,arrows } = caseSetDetails;
  const rest = { mask, view, arrows, maskColor: resolvedMaskColor, cubeColor };

  return <CubeImage case={algorithm || ""} height={size} width={size} {...rest} />;
};


CaseImage.defaultProps = {
  size: "100",
};

export default CaseImage;
