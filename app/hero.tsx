'use client';
import Icon from './ui-icon';
import useVideoPrime from './use-video-prime';
import {useEffect,useRef,useState} from 'react';
import About from './about';
import Needs from './needs';
import Services from './services';
import BeforeHello from './before-hello';
import Contact from './contact';
const Arrow=()=> <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5"/></svg>;
export default function Hero(){
 const scene=useRef<HTMLElement>(null), video=useRef<HTMLVideoElement>(null), dialog=useRef<HTMLDialogElement>(null);
 const [preferred,setPreferred]=useState<number|null>(null);
 const [motion,setMotion]=useState(true); const [failed,setFailed]=useState(false);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setMotion(!media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useVideoPrime(video,motion);
 useEffect(()=>{const el=scene.current,v=video.current;if(!el||!v)return;let raf=0,target=0,lastProgress=-1,lastDuration=0;
 const seek=()=>{if(v.readyState>=1&&!v.seeking&&Number.isFinite(v.duration)&&Math.abs(v.currentTime-target)>0.018)v.currentTime=target;};
 const draw=()=>{raf=0;const r=el.getBoundingClientRect();const p=motion?Math.min(1,Math.max(0,-r.top/Math.max(1,el.offsetHeight-innerHeight))):0;const duration=Number.isFinite(v.duration)?v.duration:0;if(p===lastProgress&&duration===lastDuration){seek();return}lastProgress=p;lastDuration=duration;el.querySelector<HTMLElement>('.intro')!.inert=p>.4;el.querySelector<HTMLElement>('.second')!.inert=p<.55;el.style.setProperty('--progress',String(p));el.style.setProperty('--fade',String(Math.max(0,1-p*2.5)));el.style.setProperty('--reveal',String(Math.min(1,Math.max(0,(p-.45)*3))));target=p*Math.max(0,(v.duration||0)-.08);seek();};
 const schedule=()=>{if(!raf)raf=requestAnimationFrame(draw)};window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);v.addEventListener('loadedmetadata',schedule);v.addEventListener('loadeddata',schedule);v.addEventListener('canplay',schedule);v.addEventListener('seeked',seek);draw();return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);v.removeEventListener('loadedmetadata',schedule);v.removeEventListener('loadeddata',schedule);v.removeEventListener('canplay',schedule);v.removeEventListener('seeked',seek)};
 },[motion]);
 const open=()=>document.getElementById("start-a-conversation")?.scrollIntoView({behavior:motion?"smooth":"instant",block:"start"});
 return <><a className="skip" href="#main">Skip to content</a><header><a className="brand" href="/" aria-label="Nik Supports home"><img className="brand-logo" src="/nik-supports-logo.png" alt="Nik Supports" width={1254} height={1254}/></a><div className="header-note">A little understanding.<br/>A different kind of support.</div><button className="contact-link" onClick={open}>Let’s connect <span><Arrow/></span></button></header>
 <main id="main"><section ref={scene} className={`journey ${motion?'':'still'}`} aria-label="A space to begin at your own pace"><div className="stage"><div className="film"><video ref={video} muted playsInline preload="auto" poster="/hero-poster.jpg" onError={()=>setFailed(true)} aria-label="A sunlit welcoming room with two chairs" src="/hero-scroll.mp4"/><div className="film-wash"/></div><div className="topline"><span className="little-star"><Icon kind="spark"/></span> SUPPORT THAT STARTS WITH YOU <span className="location">MELBOURNE & ONLINE</span></div>
 <div className="intro"><h1>You don’t have<br/>to know where<br/>to <em>start.</em></h1><p>We’ll take the time to understand you.<br/>No pressure. At your pace.</p><button className="primary" onClick={open}>Let’s find your next step <Arrow/></button><span className="under-button">For you, your family, or someone you support.</span></div>
 <div className="second" inert><span className="eyebrow">A LITTLE SPACE. A LITTLE TIME.</span><h2>Good support<br/>begins with<br/><em>feeling understood.</em></h2><button className="primary" onClick={open}>Start with a hello <Arrow/></button></div>
 <div className="bottom"><div className="scroll-cue"><span className="scroll-line"/><span>Take a moment.<br/><b>Scroll at your pace.</b></span></div><div className="signature">Space to be yourself.<span>Support to move forward.</span></div><button className="motion-toggle" aria-pressed={!motion} onClick={()=>setMotion(!motion)}>{motion?'Reduce motion':'Enable motion'}</button></div><div className="progress"/>{failed&&<span className="video-notice">A space to begin, at your pace.</span>}</div></section>
 <About motion={motion} onConnect={open}/><Needs motion={motion} onConnect={open} onChoose={setPreferred}/><Services motion={motion} preferred={preferred} onConnect={open}/><BeforeHello motion={motion} onConnect={open}/><Contact motion={motion}/></main>
 <dialog ref={dialog} onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><button className="close" aria-label="Close contact options" onClick={()=>dialog.current?.close()}><Icon kind="close"/></button><span className="eyebrow">YOUR FIRST STEP</span><h2>Start with<br/><em>a hello.</em></h2><p>You don’t need to have everything figured out. Contact Nik Supports in the way that feels comfortable.</p><a className="primary" href="mailto:admin@niksupports.com">Send an email <Arrow/></a><a className="phone" href="tel:+61454780480">Or call 0454 780 480</a></dialog></>;
}
