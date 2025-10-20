import React from "react";
import { MemeList } from "./components/MemeList";
import { Meme } from "../types";

const memes: Meme[] = [
  { id: 1, title: "Distracted Boyfriend", imageUrl: "https://i.imgur.com/example1.jpg", createdAt: "2025-10-20T00:00:00Z" },
  { id: 2, title: "Success Kid", imageUrl: "https://i.imgur.com/example2.jpg", createdAt: "2025-10-20T00:00:00Z" }
];

export default function App() {
  return (
    <MemeList
      items={memes}
      renderItem={(meme: Meme) => (
        <div>
          <h3>{meme.title}</h3>
          <img src={meme.imageUrl} alt={meme.title} width="200" />
        </div>
      )}
    />
  );
}
