import { useEffect, useRef, useState } from "react";
import { ChevronLeft, MessageCircle, Heart } from "lucide-react";

const floors = [
  {
    "floor": 1,
    "depth": 0,
    "author": "匿名12000",
    "body": "纳尼你在说什么",
    "replyTo": null
  },
  {
    "floor": 2,
    "depth": 0,
    "author": "匿名12719",
    "body": "室友...?",
    "replyTo": null
  },
  {
    "floor": 3,
    "depth": 0,
    "author": "匿名13438",
    "body": "都让开这里有基佬",
    "replyTo": null
  },
  {
    "floor": 4,
    "depth": 0,
    "author": "匿名14157",
    "body": "匿名28391冷傲退基佬",
    "replyTo": null
  },
  {
    "floor": 5,
    "depth": 0,
    "author": "匿名14876",
    "body": "我要听",
    "replyTo": null
  },
  {
    "floor": 6,
    "depth": 0,
    "author": "匿名15595",
    "body": "楼主说的只是疑似一群人就沸腾上了。。",
    "replyTo": null
  },
  {
    "floor": 7,
    "depth": 1,
    "author": "匿名16314",
    "body": "这你也要管？",
    "replyTo": 6
  },
  {
    "floor": 8,
    "depth": 1,
    "author": "匿名17033",
    "body": "家住太平洋",
    "replyTo": 7
  },
  {
    "floor": 9,
    "depth": 0,
    "author": "匿名17752",
    "body": "可代入一下很可怕啊没人觉得吗",
    "replyTo": null
  },
  {
    "floor": 10,
    "depth": 1,
    "author": "匿名18471",
    "body": "朝夕相处的室友暗地里在吃嘴子",
    "replyTo": 9
  },
  {
    "floor": 11,
    "depth": 1,
    "author": "匿名19190",
    "body": "为什么会觉得可怕...",
    "replyTo": 10
  },
  {
    "floor": 12,
    "depth": 0,
    "author": "匿名19909",
    "body": "楼主呢give me give me more",
    "replyTo": null
  },
  {
    "floor": 13,
    "depth": 0,
    "author": "匿名20628",
    "body": "和我们说说基佬",
    "replyTo": null
  },
  {
    "floor": 14,
    "depth": 0,
    "author": "匿名21347",
    "body": "这属于隐私吧真的可以在这里讲吗",
    "replyTo": null
  },
  {
    "floor": 15,
    "depth": 0,
    "author": "匿名28391",
    "body": "细节我不会说的希望大家也不要过多猜测，我发帖子只是想问问应该怎么继续和他们相处。",
    "replyTo": null
  },
  {
    "floor": 16,
    "depth": 0,
    "author": "匿名22785",
    "body": "和之前一样就可以吧",
    "replyTo": null
  },
  {
    "floor": 17,
    "depth": 0,
    "author": "匿名23504",
    "body": "他们如果不想公开楼主就假装不知道比较好",
    "replyTo": null
  },
  {
    "floor": 18,
    "depth": 0,
    "author": "匿名24223",
    "body": "平时宿舍关系怎么样呢",
    "replyTo": null
  },
  {
    "floor": 19,
    "depth": 0,
    "author": "匿名28391",
    "body": "其实非常融洽，有时候还会出去聚餐，他们性格都很好，所以发现他们的秘密有点不知所措。",
    "replyTo": null
  },
  {
    "floor": 20,
    "depth": 0,
    "author": "匿名25661",
    "body": "能理解，但也不用有太大压力呀正常相处就好了",
    "replyTo": null
  },
  {
    "floor": 21,
    "depth": 0,
    "author": "匿名26380",
    "body": "对不起但是我太好奇撞破的原因了",
    "replyTo": null
  },
  {
    "floor": 22,
    "depth": 1,
    "author": "匿名27099",
    "body": "我也是...",
    "replyTo": 21
  },
  {
    "floor": 23,
    "depth": 0,
    "author": "匿名28391",
    "body": "一开始只是觉得他们关系很好，一起上课一起吃饭还会出去逛街打游戏，这些都挺正常的，但上个月团建我们都喝了酒，结束之后他们两个走在最后面，我想问他们打不打车，结果回头就看见...",
    "replyTo": null
  },
  {
    "floor": 24,
    "depth": 0,
    "author": "匿名28537",
    "body": "看见啥呀急死我了",
    "replyTo": null
  },
  {
    "floor": 25,
    "depth": 0,
    "author": "匿名29256",
    "body": "怎么还吊胃口",
    "replyTo": null
  },
  {
    "floor": 26,
    "depth": 0,
    "author": "匿名28391",
    "body": "我实在不知道能不能说，看到的是a抓着b的手然后在手背上亲了一口",
    "replyTo": null
  },
  {
    "floor": 27,
    "depth": 0,
    "author": "匿名30694",
    "body": "就这",
    "replyTo": null
  },
  {
    "floor": 28,
    "depth": 1,
    "author": "匿名31413",
    "body": "你兄弟会亲你手背吗",
    "replyTo": 27
  },
  {
    "floor": 29,
    "depth": 1,
    "author": "匿名32132",
    "body": "脖子都亲啊这有啥的",
    "replyTo": 28
  },
  {
    "floor": 30,
    "depth": 1,
    "author": "匿名32851",
    "body": "微微一纳很尼尼",
    "replyTo": 29
  },
  {
    "floor": 31,
    "depth": 0,
    "author": "匿名33570",
    "body": "这好暧昧。",
    "replyTo": null
  },
  {
    "floor": 32,
    "depth": 0,
    "author": "匿名34289",
    "body": "可爱...",
    "replyTo": null
  },
  {
    "floor": 33,
    "depth": 0,
    "author": "匿名35008",
    "body": "我以为看到什么劲爆的了结果这么纯",
    "replyTo": null
  },
  {
    "floor": 34,
    "depth": 0,
    "author": "匿名28391",
    "body": "看到这个我都被吓死了。",
    "replyTo": null
  },
  {
    "floor": 35,
    "depth": 0,
    "author": "匿名36446",
    "body": "说不定没在一起呢楼主别自己吓自己",
    "replyTo": null
  },
  {
    "floor": 36,
    "depth": 1,
    "author": "匿名37165",
    "body": "都这样了谈不谈不是一句话的事吗",
    "replyTo": 35
  },
  {
    "floor": 37,
    "depth": 2,
    "author": "匿名37884",
    "body": "懂你意思",
    "replyTo": 36
  }
] as const;

export function ForumThread({ onBack }: { onBack: () => void }) {
  const [opened, setOpened] = useState(false);
  const [stage, setStage] = useState(() => { try { return Number(sessionStorage.getItem("foundphone-forum-stage") || 0); } catch { return 0; } });
  const [notice, setNotice] = useState(0);
  const [spoken, setSpoken] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const setStoryStage = (next: number) => { setStage(next); try { sessionStorage.setItem("foundphone-forum-stage", String(next)); } catch { /* Storage may be unavailable in private browsing. */ } };
  useEffect(() => {
    if (!opened || stage !== 0) return;
    const root = scrollRef.current;
    const target = root?.querySelector("#forum-floor-37");
    if (!root || !target) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        setStoryStage(1);
        setNotice(1);
      }
    }, { root, threshold: 0.6 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [opened, stage]);
  useEffect(() => {
    if (stage !== 1) return;
    const first = window.setTimeout(() => setNotice(2), 3200);
    const call = window.setTimeout(() => { setNotice(0); setStoryStage(2); }, 6600);
    return () => { window.clearTimeout(first); window.clearTimeout(call); };
  }, [stage]);
  useEffect(() => {
    if (stage !== 4 || spoken >= 2) return;
    const timer = window.setTimeout(() => setSpoken(n => n + 1), spoken === 0 ? 900 : 3700);
    return () => window.clearTimeout(timer);
  }, [stage, spoken]);
  const reject = () => { setStoryStage(3); setNotice(3); window.setTimeout(() => setNotice(4), 3300); };

  const [liked, setLiked] = useState<number[]>([]);
  const [draft, setDraft] = useState("");
  const [extra, setExtra] = useState<string[]>([]);
  const all = [...floors.map(f => ({...f, replyTo: f.replyTo as number | null})), ...extra.map((body,i)=>({floor:floors.length+i+1,depth:0,author:"我",body,replyTo:null}))];
  return (
    <div style={{position:"relative",height:"100%",display:"flex",flexDirection:"column",background:"#f3f5f7",color:"#20242b",fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"}}>
      <div style={{height:52,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",background:"white",borderBottom:"1px solid #eceef0"}}>
        <button onClick={opened?()=>setOpened(false):onBack} style={{border:0,background:"transparent",display:"flex",alignItems:"center",gap:4,color:"#333"}}><ChevronLeft size={20}/> {opened?"论坛":"返回"}</button>
        <strong style={{fontSize:17}}>论坛</strong><span style={{width:42}}/>
      </div>
      <div ref={scrollRef} style={{overflowY:"auto",flex:1}}>
        {!opened ? (
          <div style={{padding:14}}>
            <div style={{fontSize:13,color:"#8b929a",margin:"8px 0 14px"}}>全部帖子 · 最新讨论</div>
            <button onClick={()=>setOpened(true)} style={{width:"100%",border:"1px solid #e9ebed",borderRadius:14,background:"white",textAlign:"left",padding:18,color:"#20242b"}}>
              <div style={{fontSize:12,color:"#7e8994",marginBottom:10}}>匿名28391 · 匿名区</div>
              <div style={{fontWeight:700,fontSize:15,lineHeight:1.45,marginBottom:12,overflowWrap:"anywhere"}}>两个室友疑似在一起了怎么办？</div>
              <div style={{display:"flex",gap:15,color:"#8b929a",fontSize:12}}><span>情感 · 校园</span><span>💬 {all.length} 条回复</span></div>
            </button>
          </div>
        ) : (
          <div style={{padding:"12px 12px 24px"}}>
            <section style={{background:"white",borderRadius:12,padding:"18px 16px",marginBottom:12}}>
              <div style={{fontSize:12,color:"#7b8691",marginBottom:10}}>楼主 · 匿名28391</div>
              <h2 style={{fontSize:20,lineHeight:1.45,margin:"0 0 12px",fontWeight:750}}>两个室友疑似在一起了怎么办？</h2>
              <div style={{fontSize:12,color:"#99a0a7"}}>匿名讨论 · {all.length} 楼</div>
            </section>
            <div style={{fontSize:13,color:"#87909b",padding:"4px 4px 12px"}}>全部回复（{all.length}）· 按楼层排序</div>
            {all.map(f => (
              <article key={f.floor} id={"forum-floor-"+f.floor} style={{background:"white",borderRadius:11,padding:"14px 15px",marginBottom:9,marginLeft:f.depth?Math.min(f.depth,2)*12:0,borderLeft:f.depth?"3px solid #a5bcd0":"3px solid transparent",boxShadow:"0 2px 10px rgba(30,48,68,.035)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,marginBottom:9}}>
                  <span style={{display:"flex",alignItems:"center",gap:8,fontSize:12,fontWeight:650,color:f.author==="匿名28391"?"#467eb7":"#677480"}}><span style={{width:26,height:26,borderRadius:"50%",background:f.author==="匿名28391"?"#d9e9f7":"#e9edf0",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>{f.author==="匿名28391"?"楼":"匿"}</span>{f.author}{f.author==="匿名28391"?" · 楼主":""}</span>
                  <span style={{fontSize:12,color:"#929ba3"}}>{f.floor}楼</span>
                </div>
                {f.replyTo!==null && <div style={{fontSize:12,color:"#7d8c9b",background:"#f3f6f8",padding:"6px 9px",borderRadius:6,marginBottom:9}}>↳ 回复 {f.replyTo}楼</div>}
                <div style={{fontSize:14,lineHeight:1.75,whiteSpace:"pre-wrap",overflowWrap:"anywhere"}}>{f.body}</div>
                <div style={{display:"flex",justifyContent:"flex-end",gap:15,marginTop:11}}>
                  <button onClick={()=>setLiked(old=>old.includes(f.floor)?old.filter(n=>n!==f.floor):[...old,f.floor])} style={{border:0,background:"transparent",color:liked.includes(f.floor)?"#d95a6d":"#9aa2aa",display:"flex",gap:4,alignItems:"center",fontSize:12}}><Heart size={14} fill={liked.includes(f.floor)?"currentColor":"none"}/> {liked.includes(f.floor)?"已赞":"赞"}</button>
                  <button onClick={()=>{setDraft("回复 "+f.floor+"楼：");document.getElementById("forum-reply-input")?.focus()}} style={{border:0,background:"transparent",color:"#9aa2aa",display:"flex",gap:4,alignItems:"center",fontSize:12}}><MessageCircle size={14}/> 回复</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>


      {notice > 0 && stage !== 2 && stage !== 4 && <div role="alert" aria-live="assertive" style={{position:"absolute",top:76,left:10,right:10,zIndex:90,padding:"17px 18px",borderRadius:20,background:"#fee500",color:"#191919",border:"2px solid #e8c900",boxShadow:"0 9px 28px #0006",display:"flex",alignItems:"center",gap:13}}>
        <div style={{width:44,height:44,borderRadius:13,background:"#3a3424",color:"#fee500",fontWeight:800,fontSize:23,display:"grid",placeItems:"center",flexShrink:0}}>K</div>
        <div style={{minWidth:0,flex:1,textAlign:"left"}}>
          <div style={{fontSize:14,fontWeight:750,marginBottom:5}}>KKT · 宋硕 <span style={{fontSize:11,fontWeight:400,opacity:.7}}>现在</span></div>
          <div style={{fontSize:19,fontWeight:650,lineHeight:1.45}}>{notice===1?"你在哪？":notice===2?"我有事找你":notice===3?"我们被发现了":"要不要坦白？"}</div>
        </div>
      </div>}
      {stage === 2 && <div style={{position:"absolute",inset:0,zIndex:70,background:"linear-gradient(160deg,#646a76 0%,#2b303b 55%,#171a22 100%)",color:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"90px 22px 65px",textAlign:"center"}}>
        <div><div style={{width:94,height:94,borderRadius:"50%",background:"#9ba3ae",display:"grid",placeItems:"center",fontSize:40,margin:"0 auto 22px"}}>宋</div><div style={{fontSize:32,fontWeight:500}}>宋银硕</div><div style={{opacity:.8,fontSize:16,marginTop:10}}>KKT 语音通话 · 来电</div></div>
        <div style={{display:"flex",gap:76,alignItems:"center"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}><button onClick={reject} aria-label="拒绝来电" style={{background:"#ff453a",color:"white",border:0,borderRadius:"50%",width:72,height:72,fontSize:30,transform:"rotate(135deg)"}}>☎</button><span style={{fontSize:14}}>拒绝</span></div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}><button onClick={()=>{setSpoken(0);setStoryStage(4)}} aria-label="接听来电" style={{background:"#30d158",color:"white",border:0,borderRadius:"50%",width:72,height:72,fontSize:30}}>☎</button><span style={{fontSize:14}}>接听</span></div>
        </div>
      </div>}
      {stage === 4 && <div style={{position:"absolute",inset:0,zIndex:70,background:"linear-gradient(160deg,#646a76 0%,#2b303b 55%,#171a22 100%)",color:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"90px 22px 58px",textAlign:"center"}}>
        <div><div style={{width:86,height:86,borderRadius:"50%",background:"#9ba3ae",display:"grid",placeItems:"center",fontSize:37,margin:"0 auto 20px"}}>宋</div><div style={{fontSize:32,fontWeight:500}}>宋银硕</div><div style={{opacity:.75,fontSize:15,marginTop:9}}>通话中</div></div>
        <div role="status" aria-live="polite" style={{width:"100%",minHeight:116,boxSizing:"border-box",padding:"20px 16px",borderRadius:17,background:"rgba(20,23,30,.4)",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <div style={{fontSize:12,opacity:.75,marginBottom:12}}>实时通话字幕</div>
          <div style={{fontSize:19,fontWeight:500,lineHeight:1.65,color:"#fff",maxWidth:300}}>
            {spoken===0?"正在连接…":spoken===1?"炫宇哥发现我们在谈恋爱了":"继续瞒下去还是坦白好？"}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:9}}><button onClick={()=>setStoryStage(5)} aria-label="挂断电话" style={{background:"#ff453a",border:0,color:"white",width:70,height:70,borderRadius:"50%",fontSize:29,transform:"rotate(135deg)"}}>☎</button><span style={{fontSize:13}}>挂断</span></div>
      </div>}
      {opened && <form onSubmit={e=>{e.preventDefault();if(draft.trim()){setExtra(old=>[...old,draft.trim()]);setDraft("")}}} style={{display:"flex",gap:8,padding:"10px 12px",background:"white",borderTop:"1px solid #eee"}}>
        <input id="forum-reply-input" value={draft} onChange={e=>setDraft(e.target.value)} placeholder="说点什么…" style={{flex:1,minWidth:0,border:"1px solid #e4e8eb",borderRadius:20,padding:"9px 13px",fontSize:13}}/>
        <button type="submit" style={{border:0,borderRadius:20,padding:"8px 13px",background:"#426b91",color:"white",fontSize:13}}>发送</button>
      </form>}
    </div>
  );
}
