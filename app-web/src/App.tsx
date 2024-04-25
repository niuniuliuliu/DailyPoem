import React, { useCallback, useEffect, useState } from "react";
import jinrishici from "jinrishici";
import "./App.css";
import { IPoem } from "./features/types";
import Slides from "./features/Slides";

const StorageKey = "DailyPoem";
const App = () => {
  const [poems, setPoems] = useState<IPoem[]>([]);

  const loadPoem = useCallback(() => {
    const prevData = window.localStorage.getItem(StorageKey);
    const poems = [];
    if (prevData) {
      poems.push(...JSON.parse(prevData));
    }
    const date = new Date().toLocaleDateString();
    if (!poems.find((x) => x.date === date)) {
      // load today's poem
      jinrishici.load((result: any) => {
        console.log(result);
      });
      poems.push({
        id: `1111`,
        date,
        title: "夜雨寄北",
        dynasty: "唐代",
        author: "李商隐",
        content: [
          "君问归期未有期，巴山夜雨涨秋池。",
          "何当共剪西窗烛，却话巴山夜雨时。",
        ],
        translate: [
          "您问归期，归期实难说准，巴山连夜暴雨，涨满秋池。",
          "何时归去，共剪西窗烛花，当面诉说，巴山夜雨况味。",
        ],
        tags: [],
      });
    }
    setPoems(poems);
    localStorage.setItem(StorageKey, JSON.stringify(poems));
  }, []);

  useEffect(() => {
    loadPoem();
  }, [loadPoem]);

  return (
    <div className="main defaultBg">
      {poems.length && <Slides poems={poems} />}
    </div>
  );
};

export default App;
