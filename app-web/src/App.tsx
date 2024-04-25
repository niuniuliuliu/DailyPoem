import React, { useCallback, useEffect, useState } from "react";
import * as jinrishici from "jinrishici";

import "./App.css";
import { IPoem } from "./features/types";
import Slides from "./features/Slides";

const StorageKey = "DailyPoem";
const App = () => {
  const [poems, setPoems] = useState<IPoem[]>([]);

  const getDailyPoem = useCallback(async () => {
    return new Promise((resolve, reject) => {
      jinrishici.load((result: any) => {
        const { id, matchTags: tags, origin: { author, content, dynasty, title, translate } } = result.data;
        resolve({
          id,
          title,
          dynasty,
          author,
          content,
          translate,
          tags,
        });
      }, (err: any) => reject(err));
    });
  }, []);

  const loadPoem = useCallback(async () => {
    try {
      const prevData = window.localStorage.getItem(StorageKey);
      const poems = [] as IPoem[];
      if (prevData) {
        poems.push(...JSON.parse(prevData));
      }
      const date = new Date().toLocaleDateString();
      if (!poems.find((x) => x.date === date)) {
        // load today's poem
        const poem = await getDailyPoem() as any;
        poems.push({ ...poem, date });
        localStorage.setItem(StorageKey, JSON.stringify(poems));
      }
      setPoems(poems);
    } catch (e) {
      console.error(e);
    }
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
