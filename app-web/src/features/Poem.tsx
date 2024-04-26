import PoemHeader from "./PoemHeader";
import PoemContent from "./PoemContent";
import PoemFooter from "./PoemFooter";
import { IPoem } from "./types";

const Poem = ({ poem }: { poem: IPoem }) => {
  return (
    <div className="poem-container">
      <div className="corner">
        <div className="poem-date">{poem.date}</div>
      </div>
      <PoemHeader poem={poem} />
      <PoemContent poem={poem} />
      <PoemFooter poem={poem} />
    </div>
  );
};

export default Poem;
