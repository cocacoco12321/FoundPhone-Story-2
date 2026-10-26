import { AudioPlayer, useTrack } from "../audio";
import { useSkinState } from "../skinState";
import {
  Bookmark,
  Check,
  Compass,
  Heart,
  Home,
  MessageCircle,
  Music,
  Play,
  Plus,
  Search,
  SkipForward,
  User,
  Users,
  Video,
} from "lucide-react";
import { useState } from "react";
import { safeMedia, type Item } from "../schema";
import {
  Avatar,
  Empty,
  groupItems,
  Header,
  Media,
  meta,
  SearchBox,
  Tabs,
  useContent,
  type Props,
} from "./shared";
function TrackPlayer({
  item,
  p,
  onNext,
}: {
  item: Item;
  p: Props;
  onNext: () => void;
}) {
  return (
    <div className="track-player">
      <button onClick={() => p.onItem(item)}>
        <Music size={20} />
        <span>
          {item.title}
          <small>{item.sender}</small>
        </span>
      </button>
      {item.kind === "audio" && safeMedia(item.media) ? (
        <AudioPlayer p={p} item={item} />
      ) : (
        <button onClick={() => p.onItem(item)}>查看</button>
      )}
      <button aria-label="下一首" onClick={onNext}>
        <SkipForward size={19} />
      </button>
    </div>
  );
}
export function SpotifySkin(p: Props) {
  const { tab, setTab, q, setQ, items } = useContent(p, "首页");
  const [playlist, setPlaylist] = useState(""),
    [track, setTrack] = useTrack(p, items);
  const list = playlist
    ? items.filter((i) => (i.folder || "我的音乐") === playlist)
    : items;
  return (
    <div className="catalog-skin spotify-ui">
      <Header p={p} />
      <div className="catalog-scroll">
        <div className="spotify-heading">
          <Avatar name={p.owner ?? "我"} />
          <button
            className={tab === "首页" ? "selected" : ""}
            onClick={() => setTab("首页")}
          >
            音乐
          </button>
          <button
            className={tab === "音乐库" ? "selected" : ""}
            onClick={() => setTab("音乐库")}
          >
            音乐库
          </button>
        </div>
        {tab === "搜索" && <SearchBox value={q} set={setQ} />}
        <h1>{playlist || (tab === "音乐库" ? "音乐库" : "为你收藏")}</h1>
        {!playlist && (
          <div className="spotify-playlists">
            {groupItems(items, "我的音乐").map((g) => (
              <button key={g} onClick={() => setPlaylist(g)}>
                <Music size={29} />
                <strong>{g}</strong>
              </button>
            ))}
          </div>
        )}
        {playlist && (
          <button className="playlist-back" onClick={() => setPlaylist("")}>
            返回全部音乐
          </button>
        )}
        <div className="spotify-tracks">
          {list.map((i, n) => (
            <button
              key={i.id}
              onClick={() => {
                setTrack(i);
              }}
            >
              <span>{n + 1}</span>
              <div>
                <strong>{i.title}</strong>
                <small>
                  {i.sender} · {meta(i, "album")}
                </small>
              </div>
              <small>{meta(i, "duration")}</small>
            </button>
          ))}
        </div>
        <Empty items={list} />
      </div>
      {track && (
        <TrackPlayer
          item={track}
          p={p}
          onNext={() =>
            setTrack(
              items[
                (items.findIndex((i) => i.id === track.id) + 1) % items.length
              ],
            )
          }
        />
      )}
      <Tabs
        tabs={["首页", "搜索", "音乐库"]}
        value={tab}
        set={(t) => {
          setTab(t);
          setPlaylist("");
        }}
        icons={[<Home />, <Search />, <Music />]}
      />
    </div>
  );
}
export function NeteaseSkin(p: Props) {
  const { tab, setTab, q, setQ, items } = useContent(p, "发现");
  const [folder, setFolder] = useState(""),
    [track, setTrack] = useTrack(p, items);
  const list = folder
    ? items.filter((i) => (i.folder || "我的歌单") === folder)
    : items;
  return (
    <div className="catalog-skin netease-ui">
      <Header p={p} />
      <div className="catalog-scroll">
        <SearchBox value={q} set={setQ} />
        {tab === "发现" ? (
          <>
            <div className="netease-feature">
              <Music size={44} />
              <h2>推荐歌单</h2>
            </div>
            <div className="netease-shelves">
              {groupItems(items, "我的歌单").map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setFolder(g);
                    setTab("我的");
                  }}
                >
                  <Music size={33} />
                  <strong>{g}</strong>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="netease-profile">
              <Avatar name={p.owner ?? "我"} />
              <h2>{p.owner ?? "我的音乐"}</h2>
            </div>
            <h3>{folder || "我的歌单"}</h3>
          </>
        )}
        {list.map((i, n) => (
          <div className="netease-track" key={i.id}>
            <button
              onClick={() => {
                setTrack(i);
              }}
            >
              <span>{n + 1}</span>
              <div>
                <strong>{i.title}</strong>
                <small>
                  {i.sender} · {meta(i, "album")}
                </small>
              </div>
            </button>
            <button
              aria-label={`歌曲详情${i.title}`}
              onClick={() => p.onItem(i)}
            >
              <MessageCircle size={18} />
            </button>
          </div>
        ))}
        <Empty items={list} />
      </div>
      {track && (
        <TrackPlayer
          item={track}
          p={p}
          onNext={() =>
            setTrack(
              items[
                (items.findIndex((i) => i.id === track.id) + 1) % items.length
              ],
            )
          }
        />
      )}
      <Tabs
        tabs={["发现", "我的"]}
        value={tab}
        set={(t) => {
          setTab(t);
          setFolder("");
        }}
        icons={[<Compass />, <Music />]}
      />
    </div>
  );
}
export function YouTubeSkin(p: Props) {
  const { tab, setTab, q, setQ, items } = useContent(p, "首页");
  const [category, setCategory] = useState("全部");
  const list = items.filter((i) =>
    tab === "Shorts"
      ? i.folder === "Shorts"
      : tab === "订阅"
        ? i.folder === "订阅"
        : tab === "播放列表"
          ? i.favorite || i.folder === "播放列表"
          : category === "全部" || i.folder === category,
  );
  return (
    <div className="catalog-skin youtube-ui">
      <Header p={p} />
      <SearchBox value={q} set={setQ} />
      <div className="youtube-chips">
        {["全部", ...groupItems(items).filter((g) => g !== "未分类")].map(
          (g) => (
            <button
              className={category === g ? "selected" : ""}
              key={g}
              onClick={() => setCategory(g)}
            >
              {g}
            </button>
          ),
        )}
      </div>
      <div className="catalog-scroll">
        <div className={tab === "Shorts" ? "youtube-shorts" : "youtube-videos"}>
          {list.map((i) => (
            <article key={i.id}>
              <button className="youtube-thumb" onClick={() => p.onItem(i)}>
                <Media item={i} />
                {meta(i, "duration") && <time>{meta(i, "duration")}</time>}
              </button>
              <button className="youtube-byline" onClick={() => p.onItem(i)}>
                <Avatar name={i.sender} />
                <div>
                  <strong>{i.title}</strong>
                  <small>
                    {i.sender} · {meta(i, "views", "—")} 次播放
                  </small>
                </div>
              </button>
            </article>
          ))}
        </div>
        <Empty items={list} />
      </div>
      <Tabs
        tabs={["首页", "Shorts", "订阅", "播放列表"]}
        value={tab}
        set={setTab}
        icons={[<Home />, <Video />, <Users />, <User />]}
      />
    </div>
  );
}
export function BilibiliSkin(p: Props) {
  const { tab, setTab, q, setQ, items } = useContent(p, "首页");
  const [category, setCategory] = useState("推荐");
  const list =
    tab === "历史"
      ? items.filter((i) => i.folder === "历史")
      : tab === "动态"
        ? items.filter((i) => i.folder === "动态")
        : category === "推荐"
          ? items
          : items.filter((i) => i.folder === category);
  return (
    <div className="catalog-skin bilibili-ui">
      <Header p={p} />
      <div className="bili-search">
        <Avatar name={p.owner ?? "我"} />
        <SearchBox value={q} set={setQ} />
      </div>
      <div className="bili-categories">
        {["推荐", "动画", "音乐", "生活"].map((c) => (
          <button
            key={c}
            className={category === c ? "selected" : ""}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="catalog-scroll">
        <div className="bili-grid">
          {list.map((i) => (
            <button key={i.id} onClick={() => p.onItem(i)}>
              <div>
                <Media item={i} />
                <small>
                  <Play size={10} />
                  {meta(i, "views", "—")}
                  <time>{meta(i, "duration")}</time>
                </small>
              </div>
              <strong>{i.title}</strong>
              <span>UP · {i.sender}</span>
            </button>
          ))}
        </div>
        <Empty items={list} />
      </div>
      <Tabs
        tabs={["首页", "动态", "历史"]}
        value={tab}
        set={setTab}
        icons={[<Home />, <MessageCircle />, <User />]}
      />
    </div>
  );
}
function VerticalVideo({ p, item }: { p: Props; item: Item }) {
  const [liked, setLiked] = useSkinState<boolean>(p, `liked-${item.id}`, false),
    [saved, setSaved] = useSkinState<boolean>(p, `saved-${item.id}`, false);
  return (
    <article className="vertical-video">
      <Media item={item} />
      <div className="vertical-actions">
        <button
          aria-label={`作者${item.sender}`}
          onClick={() => p.onItem(item)}
        >
          <Avatar name={item.sender} />
        </button>
        <button
          aria-label={`喜欢${item.title}`}
          onClick={() => setLiked(!liked)}
        >
          <Heart size={29} fill={liked ? "#f44368" : "white"} />
          <small>{item.likes + (liked ? 1 : 0)}</small>
        </button>
        <button aria-label={`评论${item.title}`} onClick={() => p.onItem(item)}>
          <MessageCircle size={29} />
          <small>{item.comments.length}</small>
        </button>
        <button
          aria-label={`收藏${item.title}`}
          onClick={() => setSaved(!saved)}
        >
          <Bookmark size={27} fill={saved ? "#f8cc55" : "none"} />
        </button>
      </div>
      <button className="vertical-caption" onClick={() => p.onItem(item)}>
        <strong>@{item.sender}</strong>
        <p>{item.body}</p>
        <small>
          <Music size={11} />
          {item.title}
        </small>
      </button>
    </article>
  );
}
export function DouyinSkin(p: Props) {
  const { tab, setTab, items } = useContent(p, "推荐");
  const list = tab === "推荐" ? items : items.filter((i) => i.folder === tab);
  return (
    <div className="catalog-skin douyin-ui">
      <Header p={p} />
      <div className="douyin-top">
        {["同城", "关注", "推荐"].map((t) => (
          <button
            className={tab === t ? "selected" : ""}
            key={t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="vertical-feed">
        {list.map((i) => (
          <VerticalVideo key={i.id} p={p} item={i} />
        ))}
        <Empty items={list} />
      </div>
      <Tabs
        tabs={["推荐", "关注", "我"]}
        value={tab}
        set={setTab}
        icons={[<Home />, <Users />, <User />]}
      />
    </div>
  );
}
export function TikTokSkin(p: Props) {
  const { tab, setTab, items } = useContent(p, "For You");
  const list =
    tab === "For You"
      ? items
      : tab === "Following"
        ? items.filter((i) => i.folder === "关注" || i.folder === "Following")
        : items.filter((i) => i.folder === "个人主页");
  return (
    <div className="catalog-skin tiktok-ui">
      <Header p={p} />
      <div className="tiktok-top">
        <button
          className={tab === "Following" ? "selected" : ""}
          onClick={() => setTab("Following")}
        >
          Following
        </button>
        <button
          className={tab === "For You" ? "selected" : ""}
          onClick={() => setTab("For You")}
        >
          For You
        </button>
      </div>
      <div className="vertical-feed">
        {list.map((i) => (
          <VerticalVideo key={i.id} p={p} item={i} />
        ))}
        <Empty items={list} />
      </div>
      <Tabs
        tabs={["For You", "Following", "Profile"]}
        value={tab}
        set={setTab}
        icons={[<Home />, <Users />, <User />]}
      />
    </div>
  );
}
const netflixCatalogue = [
  { id:"truman", title:"楚门的世界", original:"The Truman Show", year:"1998", type:"电影", duration:"1小时43分钟", genre:"剧情 · 科幻", rating:"PG", synopsis:"楚门逐渐发现，自己看似平凡的人生，可能是一场精心安排的真人秀。", colors:["#156d93","#071a30"], symbol:"☀", shelf:"值得重温" },
  { id:"about-time", title:"时空恋旅人", original:"About Time", year:"2013", type:"电影", duration:"2小时3分钟", genre:"爱情 · 奇幻", rating:"12", synopsis:"拥有穿越时间能力的蒂姆，在爱情与家人的日常里，慢慢懂得珍惜每一个普通的瞬间。", colors:["#9b3843","#23112c"], symbol:"♥", shelf:"浪漫电影之夜" },
  { id:"spirited", title:"千与千寻", original:"Spirited Away", year:"2001", type:"电影", duration:"2小时5分钟", genre:"动画 · 奇幻", rating:"PG", synopsis:"误入神灵世界的千寻，为了救出父母，在奇妙而陌生的汤屋中展开冒险。", colors:["#3b776a","#142d35"], symbol:"✦", shelf:"动画精选" },
  { id:"reply1988", title:"请回答1988", original:"Reply 1988", year:"2015", type:"剧集", duration:"20集", genre:"家庭 · 青春", rating:"15", synopsis:"1988年的首尔双门洞，五个家庭的邻里日常、青春与成长故事。", colors:["#b16d42","#402c2c"], symbol:"88", shelf:"温暖治愈的剧集" },
  { id:"hospital", title:"机智医生生活", original:"Hospital Playlist", year:"2020", type:"剧集", duration:"2季", genre:"医疗 · 友情", rating:"15", synopsis:"五位相识多年的医生，在医院与音乐之间分享友情、生活和彼此的故事。", colors:["#55878a","#173d51"], symbol:"♫", shelf:"温暖治愈的剧集" },
  { id:"littlewomen", title:"小妇人", original:"Little Women", year:"2019", type:"电影", duration:"2小时15分钟", genre:"剧情 · 成长", rating:"U", synopsis:"四姐妹在成长与生活的选择中，寻找各自的梦想和自由。", colors:["#98745c","#392b34"], symbol:"✿", shelf:"值得重温" },
];
export function NetflixSkin(p: Props) {
  const { tab, setTab, q, setQ } = useContent(p, "首页");
  const [saved, setSaved] = useSkinState<string[]>(p, "curatedNetflixSaved", []);
  const [selected, setSelected] = useState<string | null>(null);
  const list = netflixCatalogue.filter(movie =>
    (tab !== "我的片单" || saved.includes(movie.id)) &&
    (movie.title + movie.original + movie.genre).toLowerCase().includes(q.toLowerCase())
  );
  const featured = netflixCatalogue[0];
  const detail = netflixCatalogue.find(movie => movie.id === selected);
  const poster = (movie: typeof featured, wide = false) => (
    <div style={{width:"100%",height:"100%",minHeight:wide?215:175,display:"flex",flexDirection:"column",justifyContent:"space-between",padding:wide?22:13,boxSizing:"border-box",borderRadius:wide?12:9,color:"#fff",background:`radial-gradient(circle at 75% 20%, ${movie.colors[0]} 0%, transparent 60%), linear-gradient(150deg,${movie.colors[0]},${movie.colors[1]})`,position:"relative",overflow:"hidden"}}>
      <span style={{fontSize:10,fontWeight:800,letterSpacing:2,color:"#e50914"}}>N <span style={{color:"#fff",opacity:.75}}>CINEMA</span></span>
      <span style={{position:"absolute",top:"24%",right:"10%",fontSize:wide?85:54,opacity:.2,fontFamily:"Georgia,serif"}}>{movie.symbol}</span>
      <div style={{position:"relative",textShadow:"0 2px 9px #0008"}}>
        <div style={{fontSize:wide?27:16,fontWeight:850,lineHeight:1.25}}>{movie.title}</div>
        <div style={{fontSize:wide?12:9,opacity:.82,marginTop:6}}>{movie.original}</div>
      </div>
    </div>
  );
  const toggle = (id:string) => setSaved(saved.includes(id)?saved.filter(x=>x!==id):[...saved,id]);
  return (
    <div className="catalog-skin netflix-ui" style={{background:"#111",color:"#fff"}}>
      <Header p={p} />
      <div className="catalog-scroll">
        {detail ? (
          <div style={{padding:"16px 16px 35px"}}>
            <button onClick={()=>setSelected(null)} style={{color:"#fff",padding:"10px 0",marginBottom:10}}>〈 返回浏览</button>
            <div style={{height:250}}>{poster(detail,true)}</div>
            <h2 style={{fontSize:26,margin:"18px 0 8px"}}>{detail.title}</h2>
            <div style={{color:"#aaa",fontSize:12,marginBottom:16}}>{detail.year}　{detail.rating}　{detail.duration}　{detail.genre}</div>
            <p style={{fontSize:14,lineHeight:1.8}}>{detail.synopsis}</p>
            <button onClick={()=>toggle(detail.id)} style={{background:"#eee",color:"#111",borderRadius:5,padding:"12px 16px",marginTop:14,fontWeight:700,width:"100%"}}>{saved.includes(detail.id)?"✓ 已加入我的片单":"＋ 加入我的片单"}</button>
            <p style={{fontSize:11,color:"#888",marginTop:16}}>影视资料展示 · 未提供在线播放</p>
          </div>
        ) : (
          <div style={{padding:"12px 14px 28px"}}>
            <SearchBox value={q} set={setQ} />
            {tab === "首页" && !q && (
              <div style={{marginTop:15,marginBottom:24}}>
                <div style={{height:235}}>{poster(featured,true)}</div>
                <div style={{display:"flex",gap:8,marginTop:10}}>
                  <button onClick={()=>setSelected(featured.id)} style={{flex:1,background:"#f5f5f5",color:"#111",padding:12,borderRadius:5,fontWeight:750}}>▶ 查看详情</button>
                  <button onClick={()=>toggle(featured.id)} style={{flex:1,background:"#333",color:"#fff",padding:12,borderRadius:5}}>{saved.includes(featured.id)?"✓ 已收藏":"＋ 我的片单"}</button>
                </div>
              </div>
            )}
            {(tab==="我的片单"?["我的片单"]:["为你推荐","值得重温","浪漫电影之夜","动画精选","温暖治愈的剧集"]).map(section=>{
              const movies=section==="为你推荐"||section==="我的片单"?list:list.filter(x=>x.shelf===section);
              return movies.length?(
                <section key={section} style={{marginBottom:24}}>
                  <h3 style={{fontSize:18,margin:"0 0 12px",fontWeight:800}}>{section}</h3>
                  <div style={{display:"flex",gap:11,overflowX:"auto",paddingBottom:6}}>
                    {movies.map(movie=><button key={movie.id} onClick={()=>setSelected(movie.id)} style={{width:128,minWidth:128,textAlign:"left",color:"#fff"}}>
                      <div style={{height:181}}>{poster(movie)}</div>
                      <strong style={{display:"block",fontSize:12,marginTop:8}}>{movie.title}</strong>
                      <small style={{color:"#aaa",fontSize:10}}>{movie.year} · {movie.type}</small>
                    </button>)}
                  </div>
                </section>
              ):null;
            })}
            {!list.length && <p style={{color:"#aaa",padding:25,textAlign:"center"}}>暂无符合条件的影片</p>}
          </div>
        )}
      </div>
      <Tabs tabs={["首页","我的片单"]} value={tab} set={t=>{setTab(t);setSelected(null)}} icons={[<Home />,<Bookmark />]}/>
    </div>
  );
}
