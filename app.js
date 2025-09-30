
let globalBan = null;
let bannedSurvivors = [];
let bannedHunters = [];
let currentSet = 1;
let currentMap = 1;
let playerRole = null;
let currentTurn = 0;
let timerId = null;
let timeLeft = 0;
let selectedThisTurn = [];
let finalSurvivors = [];
let finalHunter = null;
let bannedMaps = []; // 글로벌 밴 ON 상태에서 이전 세트 선택한 맵 기록
let currentSetPicked = {
  survivor: [],
  hunter: [],
  bannedSurvivor: [],
  bannedHunter: []
};

const mapNames = [
  null, // index 0은 비워둠 (맵 번호가 1부터 시작)
  "군수공장",
  "붉은성당",
  "성심병원",
  "호수마을",
  "달빛강공원",
  "레오의기억",
  "에버슬리핑타운",
  "차이나타운",
  "돌아올 수 없는 숲"
];

// 샘플 캐릭터
let survivors = [
  { name: "의사", img: "./images/s1.jpg" },
  { name: "변호사", img: "./images/s2.jpg" },
  { name: "도둑", img: "./images/s3.jpg" },
  { name: "정원사", img: "./images/s4.jpg" },
  { name: "마술사", img: "./images/s5.jpg" },
  { name: "모험가", img: "./images/s6.jpg" },
  { name: "용병", img: "./images/s7.jpg" },
  { name: "공군", img: "./images/s8.jpg" },
  { name: "샤먼", img: "./images/s9.jpg" },
  { name: "기계공", img: "./images/s10.jpg" },
  { name: "포워드", img: "./images/s11.jpg" },
  { name: "맹인", img: "./images/s12.jpg" },
  { name: "조향사", img: "./images/s13.jpg" },
  { name: "카우보이", img: "./images/s14.jpg" },
  { name: "무희", img: "./images/s15.jpg" },
  { name: "선지자", img: "./images/s16.jpg" },
  { name: "납관사", img: "./images/s17.jpg" },
  { name: "탐사원", img: "./images/s18.jpg" },
  { name: "주술사", img: "./images/s19.jpg" },
  { name: "야만인", img: "./images/s20.jpg" },
  { name: "곡예사", img: "./images/s21.jpg" },
  { name: "항해사", img: "./images/s22.jpg" },
  { name: "바텐더", img: "./images/s23.jpg" },
  { name: "우편 배달부", img: "./images/s24.jpg" },
  { name: "묘지기", img: "./images/s25.jpg" },
  { name: "죄수", img: "./images/s26.jpg" },
  { name: "곤충학자", img: "./images/s27.jpg" },
  { name: "화가", img: "./images/s28.jpg" },
  { name: "타자", img: "./images/s29.jpg" },
  { name: "장난감 상인", img: "./images/s30.jpg" },
  { name: "환자", img: "./images/s31.jpg" },
  { name: "'심리학자'", img: "./images/s32.jpg" },
  { name: "소설가", img: "./images/s33.jpg" },
  { name: "'여자아이'", img: "./images/s34.jpg" },
  { name: "우는 광대", img: "./images/s35.jpg" },
  { name: "교수", img: "./images/s36.jpg" },
  { name: "골동품 상인", img: "./images/s37.jpg" },
  { name: "작곡가", img: "./images/s38.jpg" },
  { name: "기자", img: "./images/s39.jpg" },
  { name: "항공 전문가", img: "./images/s40.jpg" },
  { name: "치어리더", img: "./images/s41.jpg" },
  { name: "인형사", img: "./images/s42.jpg" },
  { name: "화재조사관", img: "./images/s43.jpg" },
  { name: "'파로 부인'", img: "./images/s44.jpg" },
  { name: "'기사'", img: "./images/s45.jpg" },
  { name: "기상학자", img: "./images/s46.jpg" },
  { name: "궁수", img: "./images/s47.jpg" },
  { name: "'탈출 마스터'", img: "./images/s48.jpg" },
  { name: "행운아", img: "./images/s49.jpg" },
];


let hunters = [
  { name: "공장장", img: "./images/h1.jpg" },
  { name: "광대", img: "./images/h2.jpg" },
  { name: "사냥터지기", img: "./images/h3.jpg" },
  { name: "리퍼", img: "./images/h4.jpg" },
  { name: "거미", img: "./images/h5.jpg" },
  { name: "붉은 나비", img: "./images/h6.jpg" },
  { name: "우산의 영혼", img: "./images/h7.jpg" },
  { name: "사진사", img: "./images/h8.png" },
  { name: "광기의 눈", img: "./images/h9.png" },
  { name: "노란 옷의 왕", img: "./images/h10.png" },
  { name: "꿈의 마녀", img: "./images/h11.jpg" },
  { name: "울보", img: "./images/h12.jpg" },
  { name: "재앙의 도마뱀", img: "./images/h13.jpg" },
  { name: "블러디 퀸", img: "./images/h14.jpg" },
  { name: "수위 26호", img: "./images/h15.jpg" },
  { name: "'사도'", img: "./images/h16.jpg" },
  { name: "바이올리니스트", img: "./images/h17.png" },
  { name: "조각가", img: "./images/h18.jpg" },
  { name: "'박사'", img: "./images/h19.jpg" },
  { name: "파멸의 바퀴", img: "./images/h20.jpg" },
  { name: "나이아스", img: "./images/h21.jpg" },
  { name: "밀랍인형사", img: "./images/h22.jpg" },
  { name: "'악몽'", img: "./images/h23.jpg" },
  { name: "서기관", img: "./images/h24.jpg" },
  { name: "은둔자", img: "./images/h25.jpg" },
  { name: "나이트 워치", img: "./images/h26.jpg" },
  { name: "오페라 가수", img: "./images/h27.jpg" },
  { name: "'파이라이트'", img: "./images/h28.jpg" },
  { name: "시공의 그림자", img: "./images/h29.jpg" },
  { name: "''절름발이 판''", img: "./images/h30.jpg" },
  { name: "'훌라발루'", img: "./images/h31.jpg" },
  { name: "잡화상", img: "./images/h32.jpg" },
  { name: "'당구 선수'", img: "./images/h33.jpg" },
];

// 세트별 밴픽 순서 (1세트 예시)
let setFlows = {};

for(let i=1;i<=5;i++){
  setFlows[i] = [
    {side: "hunter", action: "ban", target: "survivor", count: 2, time: 120}, // 기존 유지
  ];

  // 새로 추가되는 부분
  if(i === 2){
    setFlows[i].push({side: "survivor", action: "ban", target: "hunter", count: 1, time: 60}); // 2세트: 1개, 60초
  } else if(i >= 3){
    setFlows[i].push({side: "survivor", action: "ban", target: "hunter", count: 2, time: 60}); // 3~5세트: 2개, 60초
  }

  setFlows[i].push(
    {side: "survivor", action: "pick", target: "survivor", count: 2, time: 120}, // 기존 유지
    {side: "hunter", action: "ban", target: "survivor", count: 1, time: 60},
    {side: "survivor", action: "pick", target: "survivor", count: 1, time: 60},
    {side: "hunter", action: "ban", target: "survivor", count: 1, time: 60},
    {side: "survivor", action: "pick", target: "survivor", count: 1, time: 60},
    {side: "survivor", action: "ready", target: "trait", count: 0, time: 120},
    {side: "hunter", action: "pick", target: "hunter", count: 1, time: 120}
  );
}

const roleDisplay = {
  hunter: "감시자",
  survivor: "생존자"
};



function selectGlobalBan(isOn){
  globalBan = isOn;
  document.getElementById("globalOnBtn").classList.toggle("selected", isOn);
  document.getElementById("globalOffBtn").classList.toggle("selected", !isOn);
  document.getElementById("globalNextBtn").disabled = false; // ✅ 항상 활성화
}

function confirmGlobalBan(){
  if(globalBan === null){ alert("글로벌 밴 여부를 선택해주세요."); return; }
  document.getElementById("globalBanSelect").classList.add("hidden");
  document.getElementById("setSelect").classList.remove("hidden");
}

function goMapSelect(){
  currentSet = parseInt(document.getElementById("setNumber").value);
  document.getElementById("setSelect").classList.add("hidden");
  document.getElementById("mapSelect").classList.remove("hidden");

  // 글로벌 밴 ON이면 이전에 선택된 맵 제외
  const mapSelect = document.getElementById("mapNumber");
  Array.from(mapSelect.options).forEach(opt => {
    opt.disabled = (globalBan && bannedMaps.includes(parseInt(opt.value)));
  });

  updateSetMapInfo(); // 표시 업데이트
}

function goRoleSelect(){
  currentMap = parseInt(document.getElementById("mapNumber").value);
  document.getElementById("mapSelect").classList.add("hidden");
  document.getElementById("roleSelect").classList.remove("hidden");

  updateSetMapInfo(); // 표시 업데이트
}


function updateCurrentLineup(){
  const container = document.getElementById("currentSurvivors");
  container.innerHTML = "";
  // 중복 제거
  const uniqueSurvivors = Array.from(new Set(finalSurvivors.map(c=>c.name)))
                              .map(name => finalSurvivors.find(c=>c.name===name));
  uniqueSurvivors.slice(0,4).forEach(c => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<img src="${c.img}"><span>${c.name}</span>`;
    container.appendChild(div);
  });
}

function chooseRole(role){
  playerRole = role;

  // 버튼 색상 업데이트
  document.getElementById("survivorRoleBtn").classList.toggle("selected", role==="survivor");
  document.getElementById("hunterRoleBtn").classList.toggle("selected", role==="hunter");

  // 다음 버튼 활성화
  document.getElementById("roleNextBtn").disabled = false;
}


let customBanDone = false; // ✅ 첫 세트에서만 커스텀 밴 진행 여부

function goToDraftPhase() {
  document.getElementById("roleSelect").classList.add("hidden");

  if (currentSet === 1) {
    // 1세트 → 커스텀 글로벌 밴 절대 호출 안 함
    document.getElementById("draftPhase").classList.remove("hidden");
    startTurn();
  } else {
    // 2세트 이상
    if (globalBan && !customBanDone) {
      startCustomGlobalBan();
      customBanDone = true; // 이후 세트는 호출 안함
    } else if(!globalBan) {
      // 글로벌 밴 off → 2세트 이상에서도 커스텀 밴 호출
      startCustomGlobalBan();
      customBanDone = true; // 이후 세트 호출 안함
    } else {
      document.getElementById("draftPhase").classList.remove("hidden");
      startTurn();
    }
  }
}


function updateCustomGlobalLabels() {
  let survivorCount = (currentSet - 1) * 3;
  let hunterCount   = (currentSet - 1) * 1;

  document.getElementById("survivorLabel").innerText = `생존자 : ${survivorCount}개`;
  document.getElementById("hunterLabel").innerText   = `감시자 : ${hunterCount}개`;
}



let survivorCount = (currentSet-1)*3;
let hunterCount = (currentSet-1)*1;
  
let customBanTargets = {survivor:0, hunter:0};
let selectedCustomBan = {survivor:[], hunter:[]};


function startCustomGlobalBan() {
  document.getElementById("customGlobalBan").classList.remove("hidden");

  // 세트별 필요 수량 계산
  customBanTargets = {
    survivor: (currentSet - 1) * 3,
    hunter: (currentSet - 1) * 1
  };
  selectedCustomBan = {survivor: [], hunter: []};

  updateCustomGlobalLabels();
  renderCustomBanCards("survivor");
  renderCustomBanCards("hunter");
  updateCustomBanButton();
}

// 커스텀 글로벌 밴 단계 카드 렌더링
function renderCustomBanCards(target){
  const container = document.getElementById(target==="survivor"?"customBanSurvivors":"customBanHunters");
  container.innerHTML = "";
  const pool = target==="survivor"?survivors:hunters;

  pool.forEach(c=>{
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<img src="${c.img}"><span>${c.name}</span>`;

    // 🔹 특정 이름 카드에만 클래스 추가
    if(c.name === "바이올리니스트"){
        div.querySelector("span").classList.add("long-name");
    }

    div.onclick = ()=>{
      if(selectedCustomBan[target].includes(c.name)){
        // 선택 해제
        selectedCustomBan[target] = selectedCustomBan[target].filter(x=>x!==c.name);
        div.classList.remove("selected");
      } else {
        if(selectedCustomBan[target].length >= customBanTargets[target]) return;
        selectedCustomBan[target].push(c.name);
        div.classList.add("selected");
      }
      updateCustomBanButton();
    };
    container.appendChild(div);
  });
}


function updateSetMapInfo() {
  const infoDiv = document.getElementById("setMapInfo");
  if (currentSet && currentMap) {
    infoDiv.innerText = `세트: ${currentSet} | 맵: ${mapNames[currentMap]}`;
  } else {
    infoDiv.innerText = "";
  }
}


function updateCustomBanButton(){
  const ok = (selectedCustomBan.survivor.length === customBanTargets.survivor &&
              selectedCustomBan.hunter.length === customBanTargets.hunter);
  document.getElementById("confirmCustomBanBtn").disabled = !ok;
}

function confirmCustomBan() {
  // 글로벌 밴 처리 (중복 방지)
  bannedSurvivors.push(...selectedCustomBan.survivor.filter(c => !bannedSurvivors.includes(c)));
  bannedHunters.push(...selectedCustomBan.hunter.filter(c => !bannedHunters.includes(c)));

  document.getElementById("customGlobalBan").classList.add("hidden");
  document.getElementById("draftPhase").classList.remove("hidden");

  startTurn();
}

function startTurn(){
  clearInterval(timerId);
  selectedThisTurn = [];
  document.getElementById("finishTurnBtn").disabled = true;

  let flow = setFlows[currentSet];
  if(currentTurn >= flow.length){
    showEndOptions();
    return;
  }

  let turn = flow[currentTurn];
  document.getElementById("turnInfo").innerText = `[${turn.side}] ${turn.target} ${turn.action} ${turn.count>0?turn.count+"개":""}`;
  renderCards(turn.target, turn.count);
  startTimer(turn.time);
}

// 카드 렌더링 함수 (trait ready 포함)
function renderCards(target, maxCount){
  const listDiv = document.getElementById("cardList");
  listDiv.innerHTML = "";

  const turn = setFlows[currentSet][currentTurn];
  const isTraitTurn = turn.action === "ready";
  const finishBtn = document.getElementById("finishTurnBtn");

  if(isTraitTurn){
    listDiv.style.display = "none"; 
    finishBtn.disabled = false; 
    return;
  } else {
    listDiv.style.display = "flex"; 
  }

  const pool = target==="survivor"?survivors:hunters;

  pool.forEach(c => {
    let container = document.createElement("div");
    container.className = "card-container";

    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<img src="${c.img}"><span>${c.name}</span>`;

    // 🔹 특정 이름 카드에만 클래스 추가
    if(c.name === "바이올리니스트"){
        div.querySelector("span").classList.add("long-name");
    }

    const isGlobalBanned = (target==="survivor" && bannedSurvivors.includes(c.name)) ||
                           (target==="hunter" && bannedHunters.includes(c.name));
    const isPickedThisSet = (target==="survivor" && currentSetPicked.survivor.includes(c.name)) ||
                            (target==="hunter" && currentSetPicked.hunter.includes(c.name));
    const isBannedThisSet = (target==="survivor" && currentSetPicked.bannedSurvivor.includes(c.name)) ||
                             (target==="hunter" && currentSetPicked.bannedHunter.includes(c.name));

if(isGlobalBanned) {
  div.classList.add("globalBanned");
} 
else if(isBannedThisSet) {
  div.classList.add("banned");

  // 붉은 X 표시 span 추가
  const banMark = document.createElement("span");
  banMark.className = "card-ban";
  banMark.textContent = "✖";   // X 문자
  div.appendChild(banMark);
} 
else if(isPickedThisSet) {
  div.classList.add("picked");
} 
else {
  div.onclick = () => {
    if(div.classList.contains("selected")){
      div.classList.remove("selected");
      selectedThisTurn = selectedThisTurn.filter(x => x !== c);
    } else {
      if(selectedThisTurn.length >= maxCount && maxCount!==0) return;
      div.classList.add("selected");
      selectedThisTurn.push(c);
    }
    finishBtn.disabled = selectedThisTurn.length !== maxCount;
  };
}


    container.appendChild(div);
    listDiv.appendChild(container);
  });
}

function startTimer(seconds){
  timeLeft = seconds;
  updateTimerDisplay();
  clearInterval(timerId);
  timerId = setInterval(()=>{
    timeLeft--;
    updateTimerDisplay();
    if(timeLeft<=0){
      clearInterval(timerId);
      finishTurn([]);
    }
  },1000);
}

function updateTimerDisplay(){
  let turn = setFlows[currentSet][currentTurn];
  document.getElementById("turnInfo").innerText =
    `[${roleDisplay[turn.side]}] ${roleDisplay[turn.target] || turn.target} ${turn.action} ${turn.count>0 ? turn.count+"개" : ""} | 남은 시간: ${timeLeft}초`;
}

function finishTurn(selectedChars){
  clearInterval(timerId);
  if(!selectedChars || selectedChars.length===0) selectedChars = selectedThisTurn;
  let turn = setFlows[currentSet][currentTurn];

  // 출력 텍스트 처리 부분 수정
  let displayText;
  if(selectedChars.length > 0){
    displayText = selectedChars.map(c=>c.name).join(", ");
  } else {
    if(turn.action === "ready"){
      displayText = "설정 완료";   // trait ready일 경우
    } else {
      displayText = "(선택 없음)"; // 나머지는 기존 유지
    }
  }

document.getElementById("log").innerHTML +=
  `<div>[${roleDisplay[turn.side]}] ${turn.action} → ${displayText}</div>`;



  // 현재 세트에 반영
if(turn.side==="survivor" && turn.action==="pick") {
  currentSetPicked.survivor.push(...selectedChars.map(c=>c.name));
  finalSurvivors.push(...selectedChars);

  // 현재 라인업 영역 표시
  document.getElementById("currentLineup").classList.remove("hidden");

  updateCurrentLineup(); // ✅ 현재 라인업 갱신
}
  if(turn.side==="hunter" && turn.action==="pick") currentSetPicked.hunter.push(...selectedChars.map(c=>c.name));

  if(turn.side==="hunter" && turn.action==="ban") currentSetPicked.bannedSurvivor.push(...selectedChars.map(c=>c.name));
  if(turn.side==="survivor" && turn.action==="ban") currentSetPicked.bannedHunter.push(...selectedChars.map(c=>c.name));

  // 최종 저장
  if(turn.side === "hunter" && turn.action === "pick") finalHunter = selectedChars[0];

currentTurn++;
  if(currentTurn >= setFlows[currentSet].length){
    // 글로벌 밴 적용
    if(globalBan){
      bannedSurvivors.push(...currentSetPicked.survivor.slice(0,3).filter(c=>!bannedSurvivors.includes(c)));
      bannedHunters.push(...currentSetPicked.hunter.filter(c=>!bannedHunters.includes(c)));
    }
    // 세트 끝났을 때 최종 라인업 화면을 먼저 보여줍니다
    showFinalLineup();
  } else {
    startTurn();
  }
}



function showFinalLineup(){
  // 카드 선택 화면 숨기기
  document.getElementById("draftPhase").classList.add("hidden");

  // 기존 finalLineupContainer 제거 (중복 방지)
  const existing = document.querySelector('.finalLineupContainer');
  if(existing) existing.remove();

  // 로그에 히스토리 추가
  const logDiv = document.getElementById("log");
  logDiv.innerHTML += `<h2>밴픽 히스토리</h2>`;

  // 최종 라인업 컨테이너 생성
  const container = document.createElement("div");
  container.className = "finalLineupContainer";
  container.id = "finalLineupContainer";  // ⭐ id 부여
  container.innerHTML = "<h2>최종 라인업</h2>";

  const lineupDiv = document.createElement("div");
  lineupDiv.className = "finalLineup";


  // 생존자 4명
  finalSurvivors.slice(0,4).forEach(c => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<img src="${c.img}"><span>${c.name}</span>`;
    lineupDiv.appendChild(div);
  });

  // 간격
  let spacer = document.createElement("div");
  spacer.style.width = "20px";
  lineupDiv.appendChild(spacer);

  // 감시자
  if(finalHunter){
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<img src="${finalHunter.img}"><span>${finalHunter.name}</span>`;
    lineupDiv.appendChild(div);
  }

  container.appendChild(lineupDiv);

  // ⭐ log 바깥 → body 맨 아래에 붙임
  document.body.appendChild(container);

  // 종료/다음 세트 옵션 표시
  showEndOptions();
}


function showEndOptions(){
  const endDiv = document.getElementById("endOptions");
  endDiv.classList.remove("hidden");

  if(globalBan){
    // ON이면 두 버튼 활성
    document.getElementById("nextSetBtn").style.display = "inline-block";
    document.getElementById("endMatchBtn").style.display = "inline-block";
  } else {
    // OFF이면 종료 버튼만
    document.getElementById("nextSetBtn").style.display = "none";
    document.getElementById("endMatchBtn").style.display = "inline-block";
  }
}

function endMatch(){
  // 최종 라인업 제거 ⭐
  const existing = document.getElementById("finalLineupContainer");
  if(existing) existing.remove();

  // 초기화
  bannedSurvivors = [];
  bannedHunters = [];
  currentSet = 1;
  currentMap = 1;
  playerRole = null;
  currentTurn = 0;
  selectedThisTurn = [];
  finalSurvivors = [];
  finalHunter = null;
  currentSetPicked = {survivor:[], hunter:[], bannedSurvivor:[], bannedHunter:[]};

  document.getElementById("endOptions").classList.add("hidden");
  document.getElementById("log").innerHTML = "";
  document.getElementById("draftPhase").classList.add("hidden");
  document.getElementById("setSelect").classList.add("hidden");
  document.getElementById("mapSelect").classList.add("hidden");
  document.getElementById("roleSelect").classList.add("hidden");

  document.getElementById("globalBanSelect").classList.remove("hidden");
  document.getElementById("globalNextBtn").disabled = true;
  document.getElementById("globalOnBtn").classList.remove("selected");
  document.getElementById("globalOffBtn").classList.remove("selected");
}

function nextSet() {
  // 이전 세트 최종 라인업 제거
  const existing = document.getElementById("finalLineupContainer");
  if (existing) existing.remove();

  if(globalBan) customBanDone = true; // 글로벌밴 on → 1세트 이후 커스텀 밴 절대 호출 안함
  else customBanDone = false;         // 글로벌밴 off → 이후 세트는 커스텀 밴 필요

  // 이전 세트에서 선택한 맵 기록
  if(globalBan) bannedMaps.push(currentMap);

  currentSet++;
  currentTurn = 0;
  selectedThisTurn = [];
  finalSurvivors = [];
  finalHunter = null;
  currentSetPicked = {survivor: [], hunter: [], bannedSurvivor: [], bannedHunter: []};

  document.getElementById("endOptions").classList.add("hidden");
  document.getElementById("draftPhase").classList.add("hidden");
  document.getElementById("log").innerHTML = "";

  // 5세트 이상이면 [다음 세트 진행] 버튼 비활성화
  if(currentSet > 5){
    document.getElementById("nextSetBtn").style.display = "none";
  } else {
    document.getElementById("mapSelect").classList.remove("hidden");
    updateSetMapInfo();
  }

  const currentLineupDiv = document.getElementById("currentSurvivors");
  if(currentLineupDiv) currentLineupDiv.innerHTML = "";
}
