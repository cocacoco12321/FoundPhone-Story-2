import { useEffect, useState } from "react";
import { Phone, PhoneOff } from "lucide-react";

type Scene = {notice:number;call:"idle"|"ringing"|"answered";line:number};
let scene:Scene={notice:0,call:"idle",line:0};
let runId=0;
let running=false;
const listeners=new Set<()=>void>();
const emit=()=>listeners.forEach(fn=>fn());
const revealMessages=(count:number)=>{
  try {
    const prior=Number(sessionStorage.getItem("foundphone-forum-message-count")||0);
    sessionStorage.setItem("foundphone-forum-message-count",String(Math.max(prior,count)));
  } catch { /* unavailable */ }
  window.dispatchEvent(new Event("foundphone-forum-messages-updated"));
};
const update=(patch:Partial<Scene>)=>{scene={...scene,...patch};emit();};
const stage=(n:number)=>{
  try {
    const previous=Number(sessionStorage.getItem("foundphone-forum-stage")||0);
    sessionStorage.setItem("foundphone-forum-stage",String(Math.max(previous,n)));
  } catch { /* unavailable */ }
  emit();
};
const later=(run:number,fn:()=>void,delay:number)=>window.setTimeout(()=>{if(run===runId)fn();},delay);
export function startForumCall(){
  if(running)return;
  running=true;
  const run=++runId;
  stage(1);
  update({notice:0,call:"idle",line:0});
  later(run,()=>{revealMessages(1);update({notice:1});},2000);
  later(run,()=>{revealMessages(2);update({notice:2});},5400);
  later(run,()=>update({notice:0,call:"ringing"}),10400);
}
export function StoryCallLayer({openChat}:{openChat?:()=>void}){
  const [,refresh]=useState(0);
  useEffect(()=>{const fn=()=>refresh(n=>n+1);listeners.add(fn);return()=>{listeners.delete(fn);};},[]);
  const reject=()=>{const run=runId;revealMessages(3);update({call:"idle",notice:3});stage(3);running=false;later(run,()=>{revealMessages(4);update({notice:4});},3400);later(run,()=>update({notice:0}),9000);};
  const answer=()=>{const run=runId;update({call:"answered",line:0});later(run,()=>update({line:1}),900);later(run,()=>update({line:2}),4200);later(run,()=>update({line:3}),7800);};
  return <>
    {scene.notice>0&&scene.call==="idle"&&<button type="button" onClick={()=>{update({notice:0});openChat?.();}} style={{position:"absolute",top:72,left:12,right:"auto",width:"calc(100% - 24px)",zIndex:950,padding:15,borderRadius:19,background:"rgba(249,250,253,.95)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",boxShadow:"0 9px 28px #0004",border:"1px solid #fff",display:"flex",alignItems:"center",justifyContent:"flex-start",gap:12,textAlign:"left",color:"#20242c"}}>
      <span style={{width:42,height:42,borderRadius:13,background:"#f3d66d",display:"grid",placeItems:"center",fontWeight:700,fontSize:22}}>K</span><span style={{display:"block",textAlign:"left",flex:1}}><strong style={{fontSize:14}}>KKT · 宋硕</strong><span style={{display:"block",fontSize:17,marginTop:5}}>{["","你在哪？","我有事和你商量","我们被发现了","要不要坦白？"][scene.notice]}</span></span>
    </button>}
    {scene.call!=="idle"&&<div style={{position:"absolute",inset:0,zIndex:980,background:"radial-gradient(ellipse at 50% 15%,#707b8a,#313a46 60%,#161e29)",color:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"85px 22px 55px",textAlign:"center"}}>
      <div><div style={{width:90,height:90,borderRadius:"50%",background:"linear-gradient(145deg,#b7c0ca,#727e8c)",display:"grid",placeItems:"center",fontSize:35,margin:"0 auto 20px",boxShadow:"inset 0 2px 3px #fff6,0 8px 20px #0003"}}>宋</div><div style={{fontSize:32,fontWeight:450}}>宋银硕</div><div style={{fontSize:15,opacity:.75,marginTop:9}}>{scene.call==="ringing"?"KKT 语音来电":"通话中"}</div></div>
      {scene.call==="answered"&&<div role="status" aria-live="polite" style={{fontSize:18,lineHeight:1.6,padding:"11px 17px",borderRadius:16,background:"#10182066",minHeight:58,width:"auto",maxWidth:"88%",boxSizing:"border-box",display:"grid",placeItems:"center"}}>{scene.line===0?"正在连接…":scene.line===1?"炫宇哥发现我们在谈恋爱了":scene.line===2?"要不要和他坦白":"好，那宿舍见。"}</div>}
      <div style={{display:"flex",gap:72}}>{(scene.call==="ringing"?["拒绝","接听"]:["挂断"]).map(label=><div key={label} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}><button type="button" onClick={()=>label==="接听"?answer():label==="拒绝"?reject():(running=false,update({call:"idle"}))} style={{width:76,height:76,borderRadius:"50%",border:"1px solid #fff5",background:label==="接听"?"linear-gradient(145deg,#81f6a1,#30c96b 75%,#139b48)":"linear-gradient(145deg,#ff827b,#f04440 75%,#cb2929)",boxShadow:"inset 0 2px 3px #fff8,inset 0 -3px 5px #0003,0 8px 18px #0005",display:"grid",placeItems:"center",color:"#fff"}}>{label==="接听"?<Phone size={30}/>:<PhoneOff size={30}/>}</button><span style={{fontSize:14}}>{label}</span></div>)}</div>
    </div>}
  </>;
}
