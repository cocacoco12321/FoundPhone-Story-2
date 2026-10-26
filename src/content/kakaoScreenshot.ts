import type { Item } from "../schema";

// Rebuilt from the author's 605 (4) screenshots. Individual histories can be added later.
type Line = [string, string, string, string, boolean];
const lines: Line[] = [
 ["2021-11-09","21:56","珍浩哥","这么晚了成灿怎么还没回来",false],
 ["2021-11-09","21:56","炫宇哥","他有说今晚不住宿舍吗？",false],
 ["2021-11-09","21:56","珍浩哥","没和我说",false],
 ["2021-11-09","21:56","宋硕","高中的朋友来找他了",false],
 ["2021-11-09","21:57","炫宇哥","他和你说了？",false],
 ["2021-11-09","21:57","宋硕","嗯",false],
 ["2021-11-09","21:57","宋硕","正好碰到",false],
 ["2021-11-09","21:57","我","我",true],
 ["2021-11-09","21:57","我","马上就回来",true],
 ["2021-11-09","21:57","珍浩哥","那就好",false],
 ["2021-12-14","21:25","我","圣诞你们都怎么过",true],
 ["2021-12-14","21:25","我","回家吗",true],
 ["2021-12-14","21:25","我","还是去旅行",true],
 ["2021-12-14","21:25","炫宇哥","我打算回家陪爸妈",false],
 ["2021-12-14","21:25","珍浩哥","我选度假",false],
 ["2021-12-14","21:26","炫宇哥","和女朋友？",false],
 ["2021-12-14","21:26","珍浩哥","还不是呢",false],
 ["2021-12-14","21:26","珍浩哥","别乱说",false],
 ["2021-12-14","21:26","我","哥都没提过",true],
 ["2021-12-14","21:26","宋硕","事以密成",false],
 ["2021-12-14","21:26","珍浩哥","就是",false],
 ["2021-12-14","21:26","炫宇哥","你小子",false],
 ["2021-12-14","21:26","炫宇哥","一针见血",false],
];
const make = (id:string,title:string,sender:string,body:string,time:string,outgoing=false):Item => ({
 id,title,body,richText:"",meta:{},time,sender,avatar:"",kind:"text",media:"",
 hidden:false,unlock:"",password:"",folder:"",favorite:false,outgoing,read:true,likes:0,comments:[]
});
export const kakaoScreenshotMessages: Item[] = [
 ...lines.map(([date,time,sender,body,outgoing],i)=>make("kkt-605-"+i,"605 (4",sender,body,date+" "+time,outgoing)),
 // Contact entries are placeholders only: the author has not supplied their private chat histories.
 ...["珍浩哥","炫宇哥","宋硕"].map((name,i)=>make("kkt-contact-"+i,name,name,"", "2021-11-09 21:56"))
];
