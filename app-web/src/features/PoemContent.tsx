import { IPoem } from "./types";

const PoemContent = ({ poem }: { poem: IPoem }) => {
  return (
    <div className="poem-content">
      {poem.content.map((x, index) => (
        <div key={index} className="poem-content-line">
          {x}
        </div>
      ))}
    </div>
  );
};

export default PoemContent;
