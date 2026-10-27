import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Phone } from "../Phone";
import { validateWork, type Work } from "../schema";
import "../styles.css";
import "./player.css";
function StoryPlayer() {
  const [work, setWork] = useState<Work | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    const abort = new AbortController();
    fetch(
      new URLSearchParams(location.search).get("preview") === "test"
        ? "./test-work.json"
        : new URLSearchParams(location.search).get("template") === "blank"
          ? "./blank-work.json"
          : "./work.json",
      { signal: abort.signal },
    )
      .then((r) => {
        if (!r.ok) throw Error("缺少作品文件，请运行 npm run story:build");
        return r.json();
      })
      .then((x) => {
        const w = validateWork(x);
        // Keep the author's newest gallery image first on every device.
        const featuredPhoto = {
          id: "photo-2476-first",
          title: "合照",
          body: "",
          richText: "",
          meta: {},
          time: "2024-01-19 12:00",
          sender: "",
          avatar: "",
          kind: "image" as const,
          media: "./IMG_2476.jpg",
          hidden: false,
          unlock: "",
          password: "",
          folder: "",
          favorite: false,
          outgoing: false,
          read: false,
          likes: 0,
          comments: [],
        };
        w.data.photos = [
          featuredPhoto,
          ...(w.data.photos ?? []).filter((item) => item.id !== featuredPhoto.id),
        ];
        document.title =
          w.title === "捡手机" ? "捡手机" : w.title + " · 捡手机";
        setWork(w);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(String(e));
      });
    return () => abort.abort();
  }, []);
  return (
    <main className="story-runtime">
      {work ? (
        <Phone work={work} />
      ) : (
        <p role="status">{error || "正在打开手机…"}</p>
      )}
    </main>
  );
}
createRoot(document.getElementById("root")!).render(<StoryPlayer />);
