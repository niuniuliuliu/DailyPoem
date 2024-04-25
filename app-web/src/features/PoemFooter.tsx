import { IPoem } from "./types";

const PoemFooter = ({ poem }: { poem: IPoem }) => {
  return (
    <div className="poem-footer">
      {
        poem.translate &&
        <>
          <div>翻译：</div>
          {poem.translate.map((x, index) => (
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
