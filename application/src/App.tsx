import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";
import pb from "../db";

function App() {
  const [data, setData] = useState<RecordModel[]>([]);

  useEffect(() => {
    (async () => {
      const list = await pb
        .collection("Reference")
        .getFullList({ expand: "Book" });
      setData(list);
    })();
  }, []);

  return (
    <>
      {data.length == 0
        ? "loading"
        : data.map((d) => <div>{JSON.stringify(d)}</div>)}
    </>
  );
}

export default App;
