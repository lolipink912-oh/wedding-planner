// 項目資料：fixed = 固定在婚期前幾個月完成；其餘項目由婚顧在設定頁手動填寫「建議開始準備時間」
// 延伸閱讀、婚顧、優惠券連結放在 links.js（以 id 對應）
const ITEMS = [
  { id:"ring", name:"挑婚戒",
    steps:["設定婚戒預算","試戴比較款式與品牌","確認訂製所需時間","下訂並確認取件日、保養與售後服務"],
    tips:["訂製需要時間，不要拖到最後","先了解鑽石 4C 與 GIA 證書再比價","確認刻字內容"] },
  { id:"proposal", name:"提親",
    steps:["與雙方父母溝通想法與底線","決定提親日期與餐廳","討論婚期、聘金、禮餅、儀式與宴客形式","確認提親當天流程與伴手禮"],
    tips:["有些家長不喜歡當面談錢，先私下溝通較順利","各地習俗不同，以雙方家庭共識為主"] },
  { id:"venue", name:"找婚禮場地",
    steps:["確認婚期、賓客人數與總預算","參觀 3～5 個場地並比較","確認桌數、菜單、場佈、服務費與包場時段","簽約並確認付款時程"],
    tips:["從找場地到簽約約需 2 個月，熱門日期要提早","問清楚額外費用（服務費、開瓶費、延時費）","一定要實際試菜"] },
  { id:"photo", name:"拍婚紗照",
    steps:["設定婚紗預算","比較 3～5 家風格與作品集","確認拍攝套餐、禮服件數、精修張數","簽約並預約拍攝日"],
    tips:["看完整相簿，不要只看精選照","問清楚加價項目與底片是否全數提供","簽約前確認付款方式與退換條款"] },
  { id:"cake", name:"訂婚喜餅",
    steps:["估算份數（親友名單）與預算","試吃並比較 3 家以上","確認訂購數量與送達時間","完成下訂付款"],
    tips:["先決定要送給哪些人，再決定份數","訂購要預留製作與運送期","可多留意結婚採購節的檔期優惠"] },
  { id:"shoot", name:"婚禮攝影",
    steps:["確定婚期後預約","比較風格與過往作品","確認拍攝時段、人數、成品內容","簽約並付訂金"],
    tips:["婚禮當天無法重來，優先看經驗","確認是否有備用器材與備援人員"] },
  { id:"makeup", name:"新娘秘書",
    steps:["確認婚期後盡快預約","比較作品與風格","安排試妝，確認妝髮與當天時間表","確認服務時段與加價項目"],
    tips:["確定婚期就先卡位，旺季很快額滿","試妝請帶上禮服與喜歡的參考照","問清楚是否包含補妝跟拍"] },
  { id:"video", name:"婚禮錄影",
    steps:["決定需要的影片類型（紀錄版、快剪版）","比較作品","確認拍攝時段與交件時間","簽約付款"],
    tips:["可與攝影師打包，常有優惠","確認交件期限"] },
  { id:"host", name:"婚禮主持人",
    steps:["比較主持風格","約時間面談","確認流程、遊戲與串場需求","簽約並確認當天時段"],
    tips:["面談時請對方說明對流程的建議","提供雙方背景，讓主持更貼近你們"] },
  { id:"decor", name:"婚禮佈置",
    steps:["決定婚禮主題與色系","比較佈置廠商與報價","確認場地允許的佈置範圍","確認進場時間與撤場安排"],
    tips:["先問場地是否有合作廠商或限制","重點佈置在簽到區與主桌"] },
  { id:"dress", fixed:4, name:"新娘婚紗",
    steps:["確認婚禮風格後試穿比較","確認進場、儀式、送客的禮服件數","完成修改與最終試穿","約定取件或送達日"],
    tips:["提前留出修改時間","送客服可選擇方便活動的款式"] },
  { id:"suit", fixed:4, name:"新郎西服",
    steps:["決定租借或訂製","確認訂製流程與時程","量身與試穿","完成修改並取件"],
    tips:["訂製比租借需要更長製作期","與新娘禮服色系互相呼應"] },
  { id:"parents", fixed:3, name:"主婚人穿搭",
    steps:["確認雙方父母服裝風格與色系","購買或租借並試穿","確認修改完成時間"],
    tips:["色系與婚禮主題協調即可","尺寸請提早確認"] },
  { id:"invite", fixed:3, name:"發喜帖 & RSVP",
    steps:["整理賓客名單","選定喜帖樣式並印製或製作電子喜帖","寄出喜帖","追蹤賓客回覆並統計桌數"],
    tips:["電子喜帖搭配出席調查表單，統計回覆更方便","注意葷素、兒童椅等需求"] },
  { id:"ceremony", fixed:2, name:"文定 & 迎娶儀式規劃",
    steps:["決定儀式形式與流程","確認雙方家庭的禮俗需求","準備禮俗用品","彩排確認"],
    tips:["流程以賓客不覺得冗長為原則","禮俗用品可先列清單逐項採買"] },
  { id:"program", fixed:2, name:"婚禮流程規劃",
    steps:["列出從早到晚的時間表","安排遊戲與串場","與所有廠商對流程","分發流程表與人力安排給關鍵人員"],
    tips:["每個環節預留緩衝時間","指定一位親友當天協助聯絡"] },
  { id:"gifts", fixed:2, name:"送客禮",
    steps:["決定數量與預算","比較款式與製作時間","下訂並確認交貨日","確認包裝與發放方式"],
    tips:["客製化商品需要較長製作時間"] },
  { id:"honey", fixed:1, name:"蜜月旅行",
    steps:["決定目的地與天數","確認護照與簽證","預訂機票與住宿","規劃行程"],
    tips:["旺季機票越早越划算","護照效期請提早確認"] }
];

const COUNTIES = Object.keys(typeof COUNTY_REGION !== "undefined" ? COUNTY_REGION : {});
const STATUS = [["0","還沒開始"],["1","進行中"],["2","已完成"],["3","不需要"]];
const $ = id => document.getElementById(id);
const DAY = 86400000;

// 狀態編碼進網址 hash，無需後端
const encode = o => btoa(unescape(encodeURIComponent(JSON.stringify(o))));
const decode = s => JSON.parse(decodeURIComponent(escape(atob(s))));
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function renderSetup(state){
  $("items").innerHTML = ITEMS.map(it => `
    <div class="item"><b>${it.name}</b>
      <div class="seg">${STATUS.map(([v,l]) => `
        <label data-v="${v}"><input type="radio" name="s_${it.id}" value="${v}" ${(state.s?.[it.id] ?? "0")==v?"checked":""}><span>${l}</span></label>`).join("")}
      </div>
      ${it.fixed
        ? `<p class="due fixed">建議開始準備時間：固定為婚期前 ${it.fixed} 個月開始準備</p>`
        : `<label class="due">建議開始準備時間<input type="date" id="t_${it.id}" value="${state.t?.[it.id] || ""}"></label>`}
    </div>`).join("");
  $("county").innerHTML = `<option value="">請選擇</option>` + COUNTIES.map(c => `<option ${state.c===c?"selected":""}>${c}</option>`).join("");
  $("bride").value = state.b || ""; $("groom").value = state.g || ""; $("date").value = state.d || "";
  $("venue").value = state.v || "";
}

function collect(){
  const s = {}, t = {};
  ITEMS.forEach(it => {
    s[it.id] = document.querySelector(`input[name=s_${it.id}]:checked`).value;
    const el = $("t_" + it.id); if (el && el.value) t[it.id] = el.value;
  });
  return { b:$("bride").value.trim(), g:$("groom").value.trim(), d:$("date").value, c:$("county").value, v:$("venue").value.trim(), s, t };
}

function show(which){ $("setup").hidden = which !== "setup"; $("plan").hidden = which !== "plan"; window.scrollTo(0,0); }

// 延伸閱讀與婚顧／優惠券區塊
function renderLinks(id){
  const L = (typeof LINKS !== "undefined" && LINKS[id]) || null;
  if (!L) return "";
  const tail = t => `target="_blank" rel="noopener">${esc(t)}</a>`;
  const reads = L.articles?.length ? `<h4>延伸閱讀</h4>
    <ul class="reads">${L.articles.map(([t,u]) => `<li><a href="${esc(u)}" ${tail(t)}</li>`).join("")}</ul>` : "";
  const acts = [
    ...(L.extras||[]).map(([t,u]) => `<a class="btn sm" href="${esc(u)}" ${tail(t)}`),
    L.consult ? `<a class="btn sm" href="${esc(L.consult)}" ${tail("呼叫線上婚顧")}` : "",
    L.coupon ? `<a class="btn sm primary" href="${esc(L.coupon)}" ${tail("領取優惠券")}` : ""
  ].join("");
  return reads + (acts ? `<div class="acts">${acts}</div>` : "");
}

// 推薦廠商名單：連到 GoWedding 優質推薦店家，並預先篩好分類與區域
function vendorLink(id, county){
  const cat = typeof VENDOR_CAT !== "undefined" && VENDOR_CAT[id];
  if (!cat) return "";
  let region = COUNTY_REGION[county] || "";
  if (region && (VENDOR_EMPTY[cat] || []).includes(region)) region = "";   // 該區沒有店家就不加區域
  const url = VENDOR_URL + "?_sft_product_cat=" + cat + (region ? "&_sft_pa_test=" + region : "");
  const label = VENDOR_CAT_NAME[cat] + (region ? "・" + REGION_NAME[region] : "");
  const note = county && !region ? `<p class="hint">${esc(county)}暫無此類別的推薦店家，已改顯示全台名單。</p>` : "";
  return `<h4>推薦廠商名單</h4>
    <div class="vendor"><span>GoWedding 優質推薦：${esc(label)}</span>
      <a class="btn sm primary" href="${esc(url)}" target="_blank" rel="noopener">查看推薦廠商名單</a></div>${note}`;
}

function addMonths(d, n){
  const r = new Date(d); const day = r.getDate();
  r.setDate(1); r.setMonth(r.getMonth() + n); 
  r.setDate(Math.min(day, new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate()));
  return r;
}

function renderPlan(state, key){
  const wedding = new Date(state.d + "T00:00:00");
  const today = new Date(); today.setHours(0,0,0,0);
  const left = Math.ceil((wedding - today) / DAY);
  const fmt = d => `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`;
  const names = [state.b, state.g].filter(Boolean).join(" ＆ ") || "我們的婚禮";
  document.title = names + "｜婚禮計畫書";
  $("names").textContent = names;
  $("dateText").textContent = fmt(wedding);
  $("days").textContent = Math.max(left, 0);
  const place = [state.c, state.v].filter(Boolean).join("・");
  $("placeText").textContent = place ? "宴客地點　" + place : ""; $("placeText").hidden = !place;

  const saved = JSON.parse(localStorage.getItem("wp_" + key) || "{}");
  const list = ITEMS.filter(it => state.s[it.id] !== "3").map(it => {
    const due = it.fixed ? addMonths(wedding, -it.fixed)
      : state.t?.[it.id] ? new Date(state.t[it.id] + "T00:00:00") : null;
    return { ...it, st: state.s[it.id], due };
  }).sort((a,b) => (a.st==="2") - (b.st==="2") || (a.due ? a.due : Infinity) - (b.due ? b.due : Infinity) || 0);

  $("timeline").innerHTML = list.map((it, n) => {
    const done = it.st === "2", late = it.st === "0" && it.due && it.due < today;
    const badge = done ? `<span class="badge go">已完成</span>`
      : late ? `<span class="badge late">請盡快處理</span>`
      : it.st === "1" ? `<span class="badge go">進行中</span>` : "";
    const when = done ? "" : it.due ? `建議 ${fmt(it.due)} 開始準備` : "尚未設定開始準備時間";
    return `<details class="t-item ${done?"done":late?"late":""}" ${!done&&late?"open":""}>
      <summary><span class="no">${String(n+1).padStart(2,"0")}</span><span class="t-title">${it.name}${badge}</span><span class="t-when">${when}</span></summary>
      <div class="t-body">
        <h4>待辦清單</h4>
        ${it.steps.map((t,i) => { const k = it.id+i, on = saved[k] || done;
          return `<label class="check ${on?"on":""}"><input type="checkbox" data-k="${k}" ${on?"checked":""}><span>${esc(t)}</span></label>`; }).join("")}
        <h4>找廠商小撇步</h4>
        <ul class="tips">${it.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        ${vendorLink(it.id, state.c)}
        ${renderLinks(it.id)}
      </div></details>`;
  }).join("");

  const update = () => {
    let sum = 0, cnt = 0;
    list.forEach(it => it.steps.forEach((_, i) => { cnt++; if (saved[it.id+i] || it.st==="2") sum++; }));
    const pct = cnt ? Math.round(sum / cnt * 100) : 0;
    $("barFill").style.width = pct + "%";
    $("progressText").textContent = `共 ${list.length} 個項目，待辦完成 ${pct}%`;
  };
  update();
  $("timeline").onchange = e => {
    const k = e.target.dataset.k; if (!k) return;
    saved[k] = e.target.checked;
    e.target.parentElement.classList.toggle("on", e.target.checked);
    localStorage.setItem("wp_" + key, JSON.stringify(saved));
    update();
  };

  $("copy").onclick = async () => {
    const url = location.href;
    try { await navigator.clipboard.writeText(url); } catch { prompt("請複製連結", url); }
    $("copied").hidden = false; setTimeout(() => $("copied").hidden = true, 2000);
  };
  $("edit").onclick = () => { renderSetup(state); show("setup"); };
}

function route(){
  const key = location.hash.slice(1);
  if (key) {
    try { const st = decode(key); if (st.d) { renderPlan(st, key); show("plan"); return; } } catch {}
  }
  renderSetup({}); show("setup");
}

$("generate").onclick = () => {
  const st = collect();
  if (!st.d) { $("err").textContent = "請先選擇婚期"; $("err").hidden = false; return; }
  $("err").hidden = true;
  location.hash = encode(st);   // 觸發 hashchange → 顯示計畫書
};
window.addEventListener("hashchange", route);
route();
