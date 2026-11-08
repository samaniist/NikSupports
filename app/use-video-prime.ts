import {useEffect,type RefObject} from 'react';
// Decode a first frame on mobile browsers before scroll-driven seeking.
export default function useVideoPrime(ref:RefObject<HTMLVideoElement|null>,enabled:boolean){
 useEffect(()=>{const v=ref.current;if(!v||!enabled)return;let disposed=false,busy=false,ready=false;
 v.muted=true;v.defaultMuted=true;v.playsInline=true;
 const prime=()=>{if(busy||ready||disposed)return;busy=true;v.play().then(()=>{if(disposed)return;v.pause();ready=true;busy=false;v.dispatchEvent(new Event('loadeddata'));}).catch(()=>{busy=false;});};
 const gesture=()=>prime();
 document.addEventListener('touchstart',gesture,{passive:true});document.addEventListener('pointerdown',gesture,{passive:true});
 prime();
 return()=>{disposed=true;v.pause();document.removeEventListener('touchstart',gesture);document.removeEventListener('pointerdown',gesture);};
 },[ref,enabled]);
}
