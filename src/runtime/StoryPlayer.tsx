import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Phone } from "../Phone";
import { initAnalytics } from "../analytics";
import { validateWork, type Work } from "../schema";
import "../styles.css";
import "./player.css";
function StoryPlayer() {
  const [work, setWork] = useState<Work | null>(null),
    [activePhone, setActivePhone] = useState<"A" | "B">("A"),
    [error, setError] = useState("");
  useEffect(() => {
    initAnalytics();
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
        w.phone.passcode = "0000";
        w.phone.wallpaper = "sage";
        w.apps = w.apps.filter((a) => a.id !== "weibo");
        for (const [id, name] of [["twitter", "Twitter"], ["podcasts", "播客"]] as const) {
          if (!w.apps.some((a) => a.id === id)) w.apps.push({ id, name, installed: true, visible: true, dock: false, folder: "", icon: "" });
        }
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
        <>
          <Phone key={activePhone} work={work} />
          <button type="button" className="phone-owner-switch"
            onClick={() => setActivePhone(current => current === "A" ? "B" : "A")}
            aria-label={activePhone === "A" ? "切换到主角B的手机" : "切换到主角A的手机"}
            title="切换手机主人（故事内容待导入）">
            ⇄ 主角 {activePhone} · 切换
          </button>
        </>
      ) : (
        <p role="status">{error || "正在打开手机…"}</p>
      )}
    </main>
  );
}
createRoot(document.getElementById("root")!).render(<StoryPlayer />);
