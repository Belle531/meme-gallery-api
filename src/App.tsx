import { MemeList } from "../src/components/MemeList";
import { Meme } from "./types.js";

const memes: Meme[] = [
  { id: 1, title: "Distracted Boyfriend", url: "https://i.imgur.com/example1.jpg", userId: 1 },
  { id: 2, title: "Success Kid", url: "https://i.imgur.com/example2.jpg", userId: 1 }
];

export default function App() {
  return (
    <MemeList
      items={memes}
      renderItem={(meme: Meme) => (
        <div>
          <h3>{meme.title}</h3>
          <img src={meme.url} alt={meme.title} width="200" />
        </div>
      )}
    />
  );
}