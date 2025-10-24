// This file will be replaced by a generic React component implementation.
import React from "react";
import { Meme } from "../types.js";

interface MemeListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function MemeList<T extends Meme>({ items, renderItem }: MemeListProps<T>) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{renderItem(item)}</div>
      ))}
    </div>
  );
}