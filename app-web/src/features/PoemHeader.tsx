import { IPoem } from "./types";

const PoemHeader = ({ poem }: { poem: IPoem }) => {
  return (
    <div className="poem-header">
      <div className="poem-header-title"><a target="_blank" href={`https://cn.bing.com/search?q=${poem.title}`}>{poem.title}</a></div>
      <div className="poem-header-author">
        <span>{poem.dynasty}</span>
        <span>{poem.author}</span>
      </div>
    </div>
  );
};

export default PoemHeader;
