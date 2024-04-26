import { useCallback, useState } from "react";
import { IPoem } from "./types";

const PoemFooter = ({ poem }: { poem: IPoem }) => {
  const [showTranslate, setShowTranslate] = useState(false);

  const toggleShowTranslate = useCallback(() => {
    setShowTranslate(x => !x);
  }, []);

  return (
    <div className="poem-footer">
      {
        poem.translate &&
        <>
          <div className="poem-footer-show" onClick={toggleShowTranslate}>查看译文</div>
          {showTranslate && poem.translate.map((x, index) => (
            <div key={index} className="poem-footer-line">
              {x}
            </div>
          ))}
        </>
      }
    </div>
  );
};

export default PoemFooter;
