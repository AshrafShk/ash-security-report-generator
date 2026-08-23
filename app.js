(function(){
"use strict";
var ash_types1=[
["vulnerability","Vulnerability Assessment Report"],
["attack-surface","Attack Surface Report"],
["attack-path","Attack Path / Kill Chain Report"],
["event-log","Windows Event Log Analysis Report"],
["incident-response","Incident Response Report"],
["mitre","MITRE ATT&CK Mapping Report"],
["siem-soc","SIEM / SOC Dashboard Report"],
["risk","Risk Assessment Report"],
["hardening","Remediation / Hardening Report"]
];

var ash_demo1={
vulnerabilities:[
{id:"V-001",severity:"Critical",status:"Open",asset:"WEB-01"},
{id:"V-002",severity:"High",status:"Open",asset:"DB-01"},
{id:"V-003",severity:"High",status:"Remediated",asset:"APP-01"},
{id:"V-004",severity:"Medium",status:"In Progress",asset:"WEB-02"},
{id:"V-005",severity:"Low",status:"Accepted",asset:"LAP-01"}],
assets:[
{asset:"WEB-01",exposure:"Internet",os:"Windows Server"},
{asset:"WEB-02",exposure:"Internet",os:"Linux"},
{asset:"APP-01",exposure:"Internal",os:"Windows Server"},
{asset:"DB-01",exposure:"Internal",os:"Linux"},
{asset:"LAP-01",exposure:"Internal",os:"Windows 11"}],
path:[
{stage:"Initial Access",technique:"T1190"},
{stage:"Execution",technique:"T1059"},
{stage:"Persistence",technique:"T1053"},
{stage:"Credential Access",technique:"T1003"},
{stage:"Exfiltration",technique:"T1041"}],
events:[
{eventId:"4624",action:"Logon Success",host:"DC-01"},
{eventId:"4625",action:"Logon Failure",host:"DC-01"},
{eventId:"4688",action:"Process Creation",host:"APP-01"},
{eventId:"7045",action:"Service Install",host:"WEB-01"},
{eventId:"4625",action:"Logon Failure",host:"APP-01"}],
incidents:[
{id:"IR-001",severity:"High",status:"Investigating",host:"APP-01"},
{id:"IR-002",severity:"Critical",status:"Contained",host:"WEB-01"},
{id:"IR-003",severity:"Medium",status:"Closed",host:"LAP-01"}],
controls:[
{technique:"T1566.001",tactic:"Initial Access"},
{technique:"T1059.001",tactic:"Execution"},
{technique:"T1003.001",tactic:"Credential Access"},
{technique:"T1021.001",tactic:"Lateral Movement"},
{technique:"T1041",tactic:"Exfiltration"}],
risks:[
{asset:"WEB-01",likelihood:5,impact:5},
{asset:"DB-01",likelihood:4,impact:5},
{asset:"APP-01",likelihood:3,impact:4},
{asset:"LAP-01",likelihood:2,impact:2}],
hardening:[
{control:"Disable SMBv1",status:"Open",priority:"High"},
{control:"Enable MFA",status:"In Progress",priority:"Critical"},
{control:"Remove legacy service",status:"Remediated",priority:"Medium"},
{control:"Harden PowerShell",status:"Open",priority:"High"}]
};

var ash_palette1=["#185abd","#c5221f","#188038","#b06000","#7b4db1","#087f8c","#d04a00","#52606d"];
function ash_el1(id){return document.getElementById(id);}
function ash_esc1(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function ash_num1(v){var n=Number(v);return isFinite(n)?n:0;}
function ash_norm1(v){return String(v).toLowerCase().replace(/[\s_\-\/]+/g,"");}
function ash_rows1(data,type){
var keys={vulnerability:"vulnerabilities", "attack-surface":"assets","attack-path":"path","event-log":"events","incident-response":"incidents",mitre:"controls","siem-soc":"events",risk:"risks",hardening:"hardening"};
if(Array.isArray(data))return data;
if(data&&Array.isArray(data[keys[type]]))return data[keys[type]];
if(data&&typeof data==="object"){var all=[];Object.keys(data).forEach(function(k){if(Array.isArray(data[k]))all=all.concat(data[k]);});return all;}
return [];
}
function ash_get1(row,names){
var ks=Object.keys(row||{});
for(var i=0;i<names.length;i++){for(var j=0;j<ks.length;j++){if(ash_norm1(ks[j])===ash_norm1(names[i])&&row[ks[j]]!==""&&row[ks[j]]!=null)return row[ks[j]];}}
return "Unknown";
}
function ash_group1(rows,names){var m={};rows.forEach(function(r){var v=String(ash_get1(r,names));m[v]=(m[v]||0)+1;});return Object.keys(m).map(function(k){return[k,m[k]];}).sort(function(a,b){return b[1]-a[1];});}
function ash_pie1(title,pairs){
var total=pairs.reduce(function(a,x){return a+ash_num1(x[1]);},0),cur=0,st=[];
pairs.slice(0,8).forEach(function(x,i){var s=cur/total*100;cur+=ash_num1(x[1]);st.push(ash_palette1[i%ash_palette1.length]+" "+s+"% "+cur/total*100+"%");});
return '<div class="ash_chartCard1"><h3 class="ash_chartTitle1">'+ash_esc1(title)+'</h3><div class="ash_pie1" style="background:conic-gradient('+st.join(",")+')"><div class="ash_pieHole1"><strong>'+total+'</strong><span>Total</span></div></div><div class="ash_legend1">'+pairs.slice(0,8).map(function(x,i){return '<div class="ash_legendItem1"><span class="ash_legendDot1" style="background:'+ash_palette1[i%ash_palette1.length]+'"></span>'+ash_esc1(x[0])+': <strong>'+x[1]+'</strong></div>';}).join("")+'</div></div>';
}
function ash_bar1(title,pairs){
var max=Math.max.apply(null,pairs.map(function(x){return ash_num1(x[1]);}).concat([1]));
return '<div class="ash_chartCard1"><h3 class="ash_chartTitle1">'+ash_esc1(title)+'</h3>'+pairs.slice(0,10).map(function(x,i){var pct=Math.max(ash_num1(x[1])/max*100,2);return '<div class="ash_barRow1"><div class="ash_barLabel1">'+ash_esc1(x[0])+'</div><div class="ash_barTrack1"><div class="ash_barFill1" style="width:'+pct+'%;background:'+ash_palette1[i%ash_palette1.length]+'"></div></div><strong class="ash_barValue1">'+x[1]+'</strong></div>';}).join("")+'</div>';
}
function ash_visuals1(type,rows){
var a,b;
if(type==="vulnerability"){a=ash_group1(rows,["severity"]);b=ash_group1(rows,["status"]);}
else if(type==="attack-surface"){a=ash_group1(rows,['Exposed Port is '+"exposed_port"]);b=ash_group1(rows,["risk_level"]);}
else if(type==="attack-path"){a=ash_group1(rows,["stage","phase"]);b=ash_group1(rows,["technique","target"]);}
else if(type==="event-log"){a=ash_group1(rows,["log_source","event_id"]);b=ash_group1(rows,["severity"]);}
else if(type==="incident-response"){a=ash_group1(rows,["severity"]);b=ash_group1(rows,["status"]);}
else if(type==="mitre"){a=ash_group1(rows,["tactic"]);b=ash_group1(rows,["technique","techniqueId"]);}
else if(type==="siem-soc"){a=ash_group1(rows,["severity"]);b=ash_group1(rows,["status","alert_id"]);}
else if(type==="risk"){a=ash_group1(rows,["risk_rating", "risk_score"]);b=ash_group1(rows,["asset","impact"]);}
else if(type==="hardening"){a=ash_group1(rows,["status"]);b=ash_group1(rows,["priority","severity"]);}
else {var bands={};rows.forEach(function(r){var s=ash_num1(ash_get1(r,["riskScore","score"],0))||ash_num1(ash_get1(r,["likelihood"],0))*ash_num1(ash_get1(r,["impact"],0));var q=s>=15?"High":s>=8?"Medium":"Low";bands[q]=(bands[q]||0)+1;});a=Object.keys(bands).map(function(k){return[k,bands[k]];});b=rows.map(function(r){return[String(ash_get1(r,["asset","assetName"])),ash_num1(ash_get1(r,["likelihood"],0))*ash_num1(ash_get1(r,["impact"],0))];}).sort(function(x,y){return y[1]-x[1];});}
return ash_pie1("Distribution",a)+ash_bar1("Breakdown",b);
}
function ash_table1(rows){if(!rows.length)return "<div>No records.</div>";var keys=Object.keys(rows[0]);return '<div class="ash_tableWrap1"><table class="ash_table1"><thead><tr>'+keys.map(function(k){return "<th>"+ash_esc1(k)+"</th>";}).join("")+'</tr></thead><tbody>'+rows.map(function(r){return "<tr>"+keys.map(function(k){return "<td>"+ash_esc1(r[k])+"</td>";}).join("");}).join("</tr>")+"</tbody></table></div>";}
function ash_report1(type,data){
var rows=ash_rows1(data,type);if(!rows.length)rows=[{status:"No data"}];
var title=ash_types1.filter(function(x){return x[0]===type;})[0][1];
return '<div class="ash_reportHeader1"><h1>'+ash_esc1(title)+'</h1><p>Generated '+new Date().toLocaleString()+'</p></div><div class="ash_metricGrid1"><div class="ash_metric1"><div class="ash_metricValue1">'+rows.length+'</div><div class="ash_metricLabel1">Records</div></div><div class="ash_metric1"><div class="ash_metricValue1">'+new Set(rows.map(function(r){return JSON.stringify(r);})).size+'</div><div class="ash_metricLabel1">Unique records</div></div><div class="ash_metric1"><div class="ash_metricValue1">'+Object.keys(rows[0]).length+'</div><div class="ash_metricLabel1">Fields</div></div><div class="ash_metric1"><div class="ash_metricValue1">ASH</div><div class="ash_metricLabel1">Cyber Engine</div></div></div><section class="ash_reportSection1"><h2>Visual Analytics</h2><div class="ash_visualGrid1">'+ash_visuals1(type,rows)+'</div></section><section class="ash_reportSection1"><h2>Source Records</h2>'+ash_table1(rows)+'</section>';
}
function ash_csv1(t){var ls=t.trim().split(/\r?\n/);if(!ls.length)return[];var h=ls[0].split(",").map(function(x){return x.trim().replace(/^"|"$/g,"");});return ls.slice(1).filter(Boolean).map(function(l){var v=l.split(",");var o={};h.forEach(function(k,i){o[k]=String(v[i]||"").trim().replace(/^"|"$/g,"");});return o;});}
function ash_parse1(t){try{return JSON.parse(t);}catch(e){return ash_csv1(t);}}
function ash_render1(){
var type=ash_el1("ash_reportType1").value;
ash_el1("ash_report1").innerHTML=ash_report1(type,ash_current1);
ash_el1("ash_reportMeta1").textContent="Charts are generated directly from the displayed records.";
}
var ash_current1=JSON.parse(JSON.stringify(ash_demo1));
var sel=ash_el1("ash_reportType1");
ash_types1.forEach(function(x){var o=document.createElement("option");o.value=x[0];o.textContent=x[1];sel.appendChild(o);});

ash_el1("ash_demo1").addEventListener("click",function(){
try{
ash_current1=JSON.parse(JSON.stringify(ash_demo1));
ash_el1("ash_text1").value=JSON.stringify(ash_current1,null,2);
ash_render1();
ash_el1("ash_status1").textContent="Demo data loaded successfully.";
}catch(e){ash_el1("ash_status1").textContent="Demo error: "+e.message;console.error(e);}
});
ash_el1("ash_generate1").addEventListener("click",function(){
try{
var text=ash_el1("ash_text1").value.trim();
if(text)ash_current1=ash_parse1(text);
ash_render1();
ash_el1("ash_status1").textContent="Report generated successfully.";
}catch(e){ash_el1("ash_status1").textContent="Generation error: "+e.message;console.error(e);}
});
ash_el1("ash_file1").addEventListener("change",function(e){
var f=e.target.files[0];if(!f)return;
var reader=new FileReader();
reader.onload=function(){try{ash_current1=ash_parse1(reader.result);ash_el1("ash_text1").value=reader.result;ash_render1();ash_el1("ash_status1").textContent="File loaded and report generated.";}catch(err){ash_el1("ash_status1").textContent="Import error: "+err.message;}};
reader.readAsText(f);
});
ash_el1("ash_export1").addEventListener("click",function(){
var html='<!doctype html><html><head><meta charset="utf-8"><title>ASH Cyber Report</title><link rel="stylesheet" href="styles.css"></head><body class="ash_body1"><main class="ash_main1"><section class="ash_card1">'+ash_el1("ash_report1").innerHTML+'</section></main></body></html>';
var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([html],{type:"text/html"}));a.download="ash_security_report.html";a.click();
});
ash_render1();
})();
