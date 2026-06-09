
const films={
'HP5+':{iso:400,times:{25:6,50:11,100:20}},
'FP4+':{iso:125,times:{25:8,50:11,100:18}},
'Delta 100':{iso:100,times:{25:7,50:11,100:19}},
'Fomapan 100':{iso:100,times:{25:6,50:8,100:15}},
'Fomapan 400':{iso:400,times:{25:7,50:11,100:18}}
};

const filmSelect=document.getElementById('film');
Object.keys(films).forEach(f=>{
 let o=document.createElement('option');
 o.textContent=f;
 filmSelect.appendChild(o);
});

function calculate(){
 let film=films[filmSelect.value];
 let dilution=document.getElementById('dilution').value;
 let asa=parseFloat(document.getElementById('asa').value);
 let temp=parseFloat(document.getElementById('temp').value);

 let time=film.times[dilution];
 let stops=Math.log2(asa/film.iso);

 if(stops>0) time*=1+(stops*0.25);
 if(stops<0) time*=1+(stops*0.15);

 time*=Math.pow(0.92,(temp-20));

 let comment='Normal';
 if(asa<film.iso) comment='More shadow detail, lower contrast';
 if(asa>film.iso) comment='Push processing, more grain and contrast';
 if(asa>=film.iso*4) comment='Heavy push, strong grain';

 document.getElementById('result').innerHTML=
 `<b>Recommended time:</b> ${time.toFixed(1)} min<br>
 <b>Comment:</b> ${comment}`;

 document.getElementById('minutes').value=time.toFixed(1);
}

function mixCalc(){
 let vol=parseFloat(document.getElementById('volume').value);
 let dilution=parseInt(document.getElementById('dilution').value);

 let rodinal=vol/(dilution+1);
 let water=vol-rodinal;

 document.getElementById('mix').innerHTML=
 `Rodinal: ${rodinal.toFixed(1)} ml<br>Water: ${water.toFixed(1)} ml`;
}

let interval;
function startTimer(){
 clearInterval(interval);
 let seconds=Math.round(parseFloat(document.getElementById('minutes').value)*60);

 interval=setInterval(()=>{
   let m=Math.floor(seconds/60);
   let s=seconds%60;
   document.getElementById('timer').textContent=`${m}:${String(s).padStart(2,'0')}`;

   if(seconds<=0){
      clearInterval(interval);
      document.getElementById('timer').textContent='Development Finished!';
      alert('Development Finished!');
   }
   seconds--;
 },1000);
}

calculate();
mixCalc();
