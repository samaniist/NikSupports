import type {CSSProperties} from 'react';
export default function Icon({kind}:{kind:'left'|'up'|'diagonal'|'spark'|'close'}){
 const paths={left:'M19 12H5m6-6-6 6 6 6',up:'M12 19V5m-6 6 6-6 6 6',diagonal:'M5 19 19 5M5 5h14v14',spark:'M12 2v20M2 12h20M5 5l14 14M5 19 19-14',close:'m6 6 12 12M6 18 18 6'};
 return <svg className="ui-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" style={{width:'1em',height:'1em',display:'inline-block',verticalAlign:'-.12em',flexShrink:0} as CSSProperties}><path d={paths[kind]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
