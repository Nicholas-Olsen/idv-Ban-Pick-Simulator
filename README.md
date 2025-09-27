# idv-Ban-Pick-Simulator
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>밴픽 시뮬레이터 (1단계)</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #1e1e1e;
      color: #f0f0f0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    .screen {
      display: none;
      max-width: 600px;
      width: 100%;
      padding: 20px;
      border: 1px solid #444;
      border-radius: 8px;
      background-color: #2b2b2b;
      margin-top: 20px;
    }
    .active {
      display: block;
    }
    button {
      margin: 10px;
      padding: 10px 20px;
      background: #4caf50;
      border: none;
      border-radius: 5px;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background: #45a049;
    }
  </style>
</head>
<body>
  <h1>밴픽 시뮬레이터 (1단계)</h1>

  <!-- 화면 1: 세트 지정 -->
  <div id="setScreen" class="screen active">
    <h2>1. 세트 지정</h2>
    <p>방장이 세트 번호를 선택하세요.</p>
    <button onclick="goToScreen('mapScreen')">세트 선택 완료</button>
  </div>

  <!-- 화면 2: 맵 지정 -->
  <div id="mapScreen" class="screen">
    <h2>2. 맵 지정</h2>
    <p>맵을 선택하세요.</p>
    <button onclick="goToScreen('sideScreen')">맵 선택 완료</button>
  </div>

  <!-- 화면 3: 진영 선택 -->
  <div id="sideScreen" class="screen">
    <h2>3. 진영 선택</h2>
    <p>방장과 참여자가 각각 감시자/생존자를 선택합니다.</p>
    <button onclick="goToScreen('confirmScreen')">진영 선택 완료</button>
  </div>

  <!-- 화면 4: 진영 선택 확인 -->
  <div id="confirmScreen" class="screen">
    <h2>4. 진영 선택 확인</h2>
    <p>양측 진영 선택이 확정되었습니다.</p>
    <button onclick="goToScreen('banpickScreen')">밴픽 시작</button>
  </div>

  <!-- 화면 5: 밴픽 시작 -->
  <div id="banpickScreen" class="screen">
    <h2>5. 밴픽 화면</h2>
    <p>여기서부터 세트 규칙에 맞춰 밴픽 절차가 진행됩니다.</p>
    <button onclick="alert('여기서부터 턴/타이머 구현 예정')">턴 진행 테스트</button>
  </div>

  <script>
    function goToScreen(screenId) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById(screenId).classList.add('active');
    }
  </script>
</body>
</html>
