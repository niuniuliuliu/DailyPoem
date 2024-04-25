import { IPoem } from "./types";

const PoemHeader = ({ poem }: { poem: IPoem }) => {
  return (
    <div className="poem-header">
      <div className="poem-header-title">{poem.title}</div>
      <div className="poem-header-author">
        {poem.dynasty}
        {poem.author}
      </div>
    </div>
  );
};

export default PoemHeader;
