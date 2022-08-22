import "../background.scss";
import { useState, useEffect } from "react";

const Background = () => {
  const [arrayElement, setArrayElement] = useState([]);
  const makeSvg = () => {
    let i = 0;
    let array = [];
    while (i < 50) {
      i++;
      array.push(i);
    }
    return array;
  };

  useEffect(() => {
    setArrayElement(makeSvg());
  }, []);

  return (
    <div>
      <div className="wrap">
        {arrayElement.map(() => (
          <svg
            className="svg"
            width="200pt"
            height="200pt"
            viewBox="0 0 752 752"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m418.25 348.91v-29.742l-57.207-33.34-57.023 33.527v66.492l29.742 17.238v29.742l57.207 33.34 57.207-33.34v-66.492zm-3.9805-2.2734-19.512-11.176 19.512-11.176zm-53.039-55.883 51.148 29.742-50.957 29.742-0.1875 0.1875-50.957-29.742zm-53.23 92.82v-59.48l49.062 28.414-23.488 13.641v32.016zm80.887 76.531-51.148-29.742v-59.48l51.148 29.742zm-49.254-92.82 51.148-29.742 51.148 29.742-51.148 29.742zm104.38 63.078-51.148 29.742v-59.48l51.148-29.742z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default Background;
