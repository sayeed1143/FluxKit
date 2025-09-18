import React, { useMemo, useState } from 'react';

function parseCSV(input:string){
  const rows: string[][] = []; let cur=''; let row: string[]=[]; let inQ=false;
  for(let i=0;i<input.length;i++){
    const ch=input[i]; const next=input[i+1];
    if(inQ){ if(ch==='"'){ if(next==='"'){cur+='"'; i++;} else {inQ=false;} } else { cur+=ch; } }
    else { if(ch==='"'){ inQ=true; } else if(ch===','){ row.push(cur); cur=''; } else if(ch==='\n'){ row.push(cur); rows.push(row); row=[]; cur=''; } else { cur+=ch; } }
  }
  if(cur.length>0 || row.length>0) { row.push(cur); rows.push(row); }
  return rows.filter(r=>r.some(c=>c!==''));
}
function toCSV(rows:string[][]){ return rows.map(r=> r.map(c=> /[",\n]/.test(c)? '"'+c.replace(/"/g,'""')+'"': c).join(',')).join('\n'); }

const TableCsvConverter: React.FC = () => {
  const [csv, setCsv] = useState('name,role\nAlice,Designer\nBob,Engineer');
  const rows = useMemo(()=>parseCSV(csv),[csv]);
  const csvOut = useMemo(()=>toCSV(rows),[rows]);
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-brand-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">Table ↔ CSV Converter</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <textarea value={csv} onChange={e=>setCsv(e.target.value)} className="w-full h-64 p-3 rounded border border-brand-border" />
        <div className="overflow-auto border border-brand-border rounded">
          <table className="min-w-full text-sm">
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i} className="odd:bg-brand-background/40">
                  {r.map((c,j)=>(<td key={j} className="px-3 py-2 border border-brand-border/50">{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 text-xs text-brand-muted">CSV output length: {csvOut.length} chars</div>
    </div>
  );
};

export default TableCsvConverter;
