(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{model;view;constructor(e,t){this.model=e,this.view=t}start(){this.render()}render(){this.view.render(this.model.state,{onModeChange:e=>this.update(()=>this.model.setMode(e)),onNextWord:()=>this.update(()=>this.model.nextWord()),onListen:()=>this.speakCurrentWord(),onAnswer:e=>this.update(()=>this.model.answerQuestion(e)),onNextQuestion:()=>this.update(()=>this.model.nextQuestion()),onRestartQuiz:()=>this.update(()=>this.model.resetQuiz()),onLookupWord:e=>this.model.lookupWord(e),onAddCustom:e=>this.update(()=>this.model.addCustom(e)),onAgeChange:e=>this.model.setSelectedAge(e),onGenerateByAge:()=>this.update(()=>this.model.generateByAge()),onGenerateRandom:()=>this.update(()=>this.model.generateRandom()),onRemoveWorking:e=>this.update(()=>this.model.removeWorkingItem(e)),onToggleBookmark:e=>this.update(()=>this.model.toggleBookmark(e)),onUseBookmark:e=>this.update(()=>this.model.useBookmark(e)),onApply:()=>this.update(()=>this.model.applyWorkingItems()),onClearApplied:()=>this.update(()=>this.model.clearAppliedItems()),isBookmarked:e=>this.model.isBookmarked(e)})}update(e){e(),this.render()}speakCurrentWord(){let e=new SpeechSynthesisUtterance(this.model.getCurrentWord().word);e.lang=`zh-TW`,e.rate=.75,window.speechSynthesis.cancel(),window.speechSynthesis.speak(e)}},t=[{word:`太陽`,bopomofo:[`ㄊㄞˋ`,`ㄧㄤˊ`],emoji:`☀️`,age:6,color:`#FFE29A`},{word:`月亮`,bopomofo:[`ㄩㄝˋ`,`ㄌㄧㄤˋ`],emoji:`🌙`,age:6,color:`#C9D8FF`},{word:`小狗`,bopomofo:[`ㄒㄧㄠˇ`,`ㄍㄡˇ`],emoji:`🐶`,age:6,color:`#FFD2B8`},{word:`小貓`,bopomofo:[`ㄒㄧㄠˇ`,`ㄇㄠ`],emoji:`🐱`,age:6,color:`#F8CDE0`},{word:`花朵`,bopomofo:[`ㄏㄨㄚ`,`ㄉㄨㄛˇ`],emoji:`🌼`,age:6,color:`#FFF0A8`},{word:`雨傘`,bopomofo:[`ㄩˇ`,`ㄙㄢˇ`],emoji:`☂️`,age:6,color:`#BFE5F6`},{word:`蘋果`,bopomofo:[`ㄆㄧㄥˊ`,`ㄍㄨㄛˇ`],emoji:`🍎`,age:6,color:`#FFC6BA`},{word:`西瓜`,bopomofo:[`ㄒㄧ`,`ㄍㄨㄚ`],emoji:`🍉`,age:6,color:`#CBE9BA`},{word:`蝴蝶`,bopomofo:[`ㄏㄨˊ`,`ㄉㄧㄝˊ`],emoji:`🦋`,age:6,color:`#D9C7FA`},{word:`火車`,bopomofo:[`ㄏㄨㄛˇ`,`ㄔㄜ`],emoji:`🚂`,age:6,color:`#C8E4EF`},{word:`學校`,bopomofo:[`ㄒㄩㄝˊ`,`ㄒㄧㄠˋ`],emoji:`🏫`,age:6,color:`#FFD5A5`},{word:`朋友`,bopomofo:[`ㄆㄥˊ`,`ㄧㄡˇ`],emoji:`🧒🏻`,age:6,color:`#D4EBC3`},{word:`天空`,bopomofo:[`ㄊㄧㄢ`,`ㄎㄨㄥ`],emoji:`🌤️`,age:6,color:`#CDEBFA`},{word:`白雲`,bopomofo:[`ㄅㄞˊ`,`ㄩㄣˊ`],emoji:`☁️`,age:6,color:`#E4ECF3`},{word:`星星`,bopomofo:[`ㄒㄧㄥ`,`ㄒㄧㄥ`],emoji:`⭐`,age:6,color:`#FFF0A8`},{word:`老師`,bopomofo:[`ㄌㄠˇ`,`ㄕ`],emoji:`👩‍🏫`,age:7,color:`#F4D8B8`},{word:`同學`,bopomofo:[`ㄊㄨㄥˊ`,`ㄒㄩㄝˊ`],emoji:`🧑‍🤝‍🧑`,age:7,color:`#D5E8C9`},{word:`爸爸`,bopomofo:[`ㄅㄚˋ`,`ㄅㄚ˙`],emoji:`👨`,age:7,color:`#D3E5F6`},{word:`媽媽`,bopomofo:[`ㄇㄚ`,`ㄇㄚ˙`],emoji:`👩`,age:7,color:`#F5D5E5`},{word:`弟弟`,bopomofo:[`ㄉㄧˋ`,`ㄉㄧ˙`],emoji:`👦`,age:7,color:`#D6E9F4`},{word:`妹妹`,bopomofo:[`ㄇㄟˋ`,`ㄇㄟ˙`],emoji:`👧`,age:7,color:`#F7DCE8`},{word:`上學`,bopomofo:[`ㄕㄤˋ`,`ㄒㄩㄝˊ`],emoji:`🎒`,age:7,color:`#F7D9A9`},{word:`回家`,bopomofo:[`ㄏㄨㄟˊ`,`ㄐㄧㄚ`],emoji:`🏠`,age:7,color:`#D8E7CA`},{word:`吃飯`,bopomofo:[`ㄔ`,`ㄈㄢˋ`],emoji:`🍚`,age:7,color:`#F1E5C9`},{word:`喝水`,bopomofo:[`ㄏㄜ`,`ㄕㄨㄟˇ`],emoji:`🥤`,age:7,color:`#CBE9F4`},{word:`看書`,bopomofo:[`ㄎㄢˋ`,`ㄕㄨ`],emoji:`📖`,age:7,color:`#E4D8F5`},{word:`寫字`,bopomofo:[`ㄒㄧㄝˇ`,`ㄗˋ`],emoji:`✏️`,age:7,color:`#F9E1B8`},{word:`春天`,bopomofo:[`ㄔㄨㄣ`,`ㄊㄧㄢ`],emoji:`🌱`,age:8,color:`#D4EDC8`},{word:`夏天`,bopomofo:[`ㄒㄧㄚˋ`,`ㄊㄧㄢ`],emoji:`🌻`,age:8,color:`#FFE3A3`},{word:`秋天`,bopomofo:[`ㄑㄧㄡ`,`ㄊㄧㄢ`],emoji:`🍂`,age:8,color:`#F5D0A3`},{word:`冬天`,bopomofo:[`ㄉㄨㄥ`,`ㄊㄧㄢ`],emoji:`❄️`,age:8,color:`#D8EAF7`},{word:`公園`,bopomofo:[`ㄍㄨㄥ`,`ㄩㄢˊ`],emoji:`🛝`,age:8,color:`#D8EBCB`},{word:`河流`,bopomofo:[`ㄏㄜˊ`,`ㄌㄧㄡˊ`],emoji:`🏞️`,age:8,color:`#C9E7F2`},{word:`高山`,bopomofo:[`ㄍㄠ`,`ㄕㄢ`],emoji:`⛰️`,age:8,color:`#D8DFC9`},{word:`海洋`,bopomofo:[`ㄏㄞˇ`,`ㄧㄤˊ`],emoji:`🌊`,age:8,color:`#BFE1F5`},{word:`森林`,bopomofo:[`ㄙㄣ`,`ㄌㄧㄣˊ`],emoji:`🌲`,age:8,color:`#C9E1C3`},{word:`動物`,bopomofo:[`ㄉㄨㄥˋ`,`ㄨˋ`],emoji:`🐾`,age:8,color:`#E8D5C2`},{word:`植物`,bopomofo:[`ㄓˊ`,`ㄨˋ`],emoji:`🪴`,age:8,color:`#CDE6C4`},{word:`快樂`,bopomofo:[`ㄎㄨㄞˋ`,`ㄌㄜˋ`],emoji:`😄`,age:8,color:`#FFE5A8`}],n=t.slice(0,12),r=[`ㄕㄢ`,`ㄕㄨㄟˇ`,`ㄉㄚˋ`,`ㄊㄧㄢ`,`ㄕㄡˇ`,`ㄩˊ`,`ㄋㄧㄠˇ`,`ㄔㄜ`,`ㄏㄨㄛˇ`,`ㄏㄨㄚ`],i={applied:`characterSchool.applied`,draft:`characterSchool.draft`,bookmarks:`characterSchool.bookmarks`,age:`characterSchool.age`},a=10,o=[6,7,8];function s(e){return[...e].sort(()=>Math.random()-.5)}function c(e){try{let t=JSON.parse(localStorage.getItem(e)||`[]`);return Array.isArray(t)?t.map(l).filter(e=>e.word):[]}catch{return[]}}function l(e){return{word:String(e.word||``).trim(),bopomofo:Array.isArray(e.bopomofo)?e.bopomofo.map(e=>String(e).trim()).filter(Boolean):[],emoji:String(e.emoji||`🔤`).trim()||`🔤`,age:Number(e.age)||7,color:e.color||`#E4EBCF`}}function u(e){return`${e.word}|${e.bopomofo.join(`|`)}`}var d=class{mode=`learn`;appliedItems=c(i.applied);workingItems=c(i.draft);bookmarks=c(i.bookmarks);currentWord=0;currentQuestion=0;score=0;selectedAnswer=null;quizOrder=[];selectedAge=Number(localStorage.getItem(i.age))||7;adminNotice=``;wordDictionary=new Map(t.map(e=>[e.word,e]));characterDictionary=new Map;constructor(){o.includes(this.selectedAge)||(this.selectedAge=7),t.forEach(e=>{[...e.word].forEach((t,n)=>{this.characterDictionary.has(t)||this.characterDictionary.set(t,{word:t,bopomofo:[e.bopomofo[n]],emoji:e.emoji,age:e.age,color:e.color})})}),this.resetQuiz()}get state(){return{mode:this.mode,appliedItems:this.appliedItems,workingItems:this.workingItems,bookmarks:this.bookmarks,activeWords:this.getActiveWords(),currentWord:this.currentWord,currentQuestion:this.currentQuestion,score:this.score,selectedAnswer:this.selectedAnswer,quizOrder:this.quizOrder,selectedAge:this.selectedAge,adminNotice:this.adminNotice}}setMode(e){this.mode=e,this.adminNotice=``,e===`quiz`&&this.resetQuiz(),e===`learn`&&(this.currentWord=Math.floor(Math.random()*this.getActiveWords().length))}getActiveWords(){return this.appliedItems.length?this.appliedItems:n}getCurrentWord(){let e=this.getActiveWords();return this.currentWord>=e.length&&(this.currentWord=0),e[this.currentWord]}nextWord(){let e=this.getActiveWords();if(e.length<=1)return;let t=this.currentWord;for(;t===this.currentWord;)t=Math.floor(Math.random()*e.length);this.currentWord=t}lookupWord(e){return this.wordDictionary.get(e.trim())||this.characterDictionary.get(e.trim())||null}answerQuestion(e){this.selectedAnswer===null&&this.quizOrder[this.currentQuestion]&&(this.selectedAnswer=e,e===this.quizOrder[this.currentQuestion].answer&&(this.score+=a))}nextQuestion(){this.currentQuestion+=1,this.selectedAnswer=null}resetQuiz(){this.currentQuestion=0,this.score=0,this.selectedAnswer=null;let e=this.quizItemsFromWords(this.getActiveWords()),n=[...new Set([...t.flatMap(e=>e.bopomofo),...this.getActiveWords().flatMap(e=>e.bopomofo),...r])];this.quizOrder=s(e).slice(0,Math.min(10,e.length)).map(e=>({...e,options:s([e.answer,...s(n.filter(t=>t!==e.answer)).slice(0,3)])}))}addCustom(e){let t=e.word.trim(),n=e.bopomofo.trim().split(/\s+/).filter(Boolean);if(!t){this.adminNotice=`請先輸入單字或詞語。`;return}if([...t].length!==n.length){this.adminNotice=`「${t}」有 ${[...t].length} 個字，請提供相同數量的注音並以空格分隔。`;return}this.addWorkingItem({word:t,bopomofo:n,emoji:e.emoji.trim()||`🔤`,age:this.selectedAge,color:`#E4EBCF`})}setSelectedAge(e){this.selectedAge=o.includes(e)?e:7,localStorage.setItem(i.age,String(this.selectedAge))}generateByAge(){this.workingItems=s(t.filter(e=>e.age===this.selectedAge)).slice(0,10).map(l),this.adminNotice=`已依 ${this.selectedAge} 歲產生 ${this.workingItems.length} 組字詞，可繼續新增或刪除。`,this.save()}generateRandom(){this.workingItems=s(t).slice(0,10).map(l),this.adminNotice=`已從全部字庫隨機產生 10 組字詞。`,this.save()}removeWorkingItem(e){this.workingItems.splice(e,1),this.adminNotice=`已從本次清單刪除。`,this.save()}toggleBookmark(e){let t=this.workingItems[e];if(!t)return;let n=this.bookmarks.findIndex(e=>u(e)===u(t));n>=0?(this.bookmarks.splice(n,1),this.adminNotice=`已取消標記「${t.word}」。`):(this.bookmarks.push(l(t)),this.adminNotice=`已標記「${t.word}」，下次可快速使用。`),this.save()}useBookmark(e){let t=this.bookmarks[e];t&&this.addWorkingItem(t)}applyWorkingItems(){if(!this.workingItems.length){this.adminNotice=`本次清單是空的，請先加入至少一組字詞。`;return}if(this.workingItems.some(e=>[...e.word].length!==e.bopomofo.length)){this.adminNotice=`有字詞缺少注音，請刪除後重新加入。`;return}this.appliedItems=this.workingItems.map(l),this.currentWord=0,this.resetQuiz(),this.adminNotice=`已套用 ${this.appliedItems.length} 組，學習與考試模式都會立即使用。`,this.save()}clearAppliedItems(){this.appliedItems=[],this.currentWord=0,this.resetQuiz(),this.adminNotice=`已清除套用內容，恢復使用網站預設詞語。`,this.save()}isBookmarked(e){return this.bookmarks.some(t=>u(t)===u(e))}addWorkingItem(e){let t=l(e);if(this.workingItems.some(e=>u(e)===u(t))){this.adminNotice=`這個字詞已經在本次清單中。`;return}this.workingItems.push(t),this.adminNotice=`已新增「${t.word}」。`,this.save()}quizItemsFromWords(e){let t=new Map;return e.forEach(e=>{[...e.word].forEach((n,r)=>{let i=e.bopomofo[r],a=`${n}|${i}`;i&&!t.has(a)&&t.set(a,{character:n,answer:i})})}),[...t.values()]}save(){localStorage.setItem(i.draft,JSON.stringify(this.workingItems)),localStorage.setItem(i.bookmarks,JSON.stringify(this.bookmarks)),localStorage.setItem(i.applied,JSON.stringify(this.appliedItems)),localStorage.setItem(i.age,String(this.selectedAge))}};function f(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`})[e])}function p(e){let t=String(e||`？`).match(/^(.*?)([ˊˇˋ˙])?$/),n=t?.[1]||`？`,r=t?.[2]||``;return`<span class="bopomofo">
    <span class="bopomofo-base">${f(n)}</span>
    ${r?`<span class="bopomofo-tone ${r===`˙`?`neutral`:``}">${f(r)}</span>`:``}
  </span>`}function m(e){return[...e.word].map((t,n)=>`
    <span class="annotated">
      <span class="hanzi">${f(t)}</span>
      ${p(e.bopomofo[n])}
    </span>`).join(``)}var h=class{root;constructor(e){this.root=e}render(e,t){this.root.innerHTML=`<div class="page">
      <header>
        <div class="brand">
          <span class="brand-mark">字</span>
          <span class="brand-text"><strong>字字小學堂</strong><small>快樂認識每個字</small></span>
        </div>
        <div class="today">⭐ 今天也要加油！</div>
      </header>
      <main>
        ${this.modeSwitcher(e.mode)}
        ${e.mode===`learn`?this.learningView(e):e.mode===`quiz`?this.quizView(e):this.adminView(e,t)}
      </main>
      <footer>每天學一點，國字進步看得見！ 🌱</footer>
    </div>`,this.bindEvents(t)}modeSwitcher(e){return`<div class="mode-switcher">
      <button class="mode ${e===`learn`?`active`:``}" data-mode="learn">
        <span class="mode-icon">▤</span><span class="mode-label"><strong>學習模式</strong><small>看圖片・讀詞語</small></span>
      </button>
      <button class="mode ${e===`quiz`?`active`:``}" data-mode="quiz">
        <span class="mode-icon">✎</span><span class="mode-label"><strong>考試模式</strong><small>選出正確注音</small></span>
      </button>
      <button class="mode ${e===`admin`?`active`:``}" data-mode="admin">
        <span class="mode-icon">⚙</span><span class="mode-label"><strong>管理者模式</strong><small>設定練習內容</small></span>
      </button>
    </div>`}learningView(e){let t=Math.min(e.currentWord,e.activeWords.length-1),n=e.activeWords[t];return`<section class="heading">
      <div>
        <span class="eyebrow"><i></i>${e.appliedItems.length?`管理者指定內容`:`今天的詞語`}</span>
        <h1>看看圖片，跟著讀一讀！</h1>
      </div>
      <span class="counter">詞語 ${t+1} / ${e.activeWords.length}</span>
    </section>
    <section class="learning-card">
      <div class="picture-panel" style="--color:${f(n.color)}">
        <div class="picture" role="img" aria-label="${f(n.word)}">${f(n.emoji)}</div>
        <span class="picture-label">看圖想一想</span>
      </div>
      <div class="word-panel">
        <span class="prompt">這個詞語怎麼念？</span>
        <div class="word-with-bopomofo">${m(n)}</div>
        <button class="listen" id="listen">🔊 聽聽看</button>
      </div>
    </section>
    <div class="actions">
      <p>💡 小提示：先看圖片，再大聲念出來！</p>
      <button class="primary" id="next-word">換一個詞語 <span>→</span></button>
    </div>`}quizView(e){if(!e.quizOrder.length)return`<section class="result-card">
        <div class="result-emoji">📝</div><h1>目前沒有可考的字</h1>
        <p>請到管理者模式加入完整注音並套用。</p>
      </section>`;if(e.currentQuestion>=e.quizOrder.length){let t=e.score===e.quizOrder.length*10;return`<section class="result-card">
        <div class="result-emoji">${t?`🏆`:`🌟`}</div>
        <h1>${t?`全部答對，太棒了！`:`完成挑戰，很不錯！`}</h1>
        <p>你得到 <strong>${e.score} 分</strong></p>
        <button class="primary" id="restart">再考一次 ↻</button>
      </section>`}let t=e.quizOrder[e.currentQuestion],n=e.selectedAnswer!==null;return`<section class="heading">
      <div>
        <span class="eyebrow"><i></i>${e.appliedItems.length?`指定內容測驗`:`注音小測驗`}</span>
        <h1>選出這個字的正確注音</h1>
      </div>
      <div class="score">⭐ ${e.score} 分</div>
    </section>
    <div class="progress-row">
      <span>第 ${e.currentQuestion+1} 題，共 ${e.quizOrder.length} 題</span>
      <div class="progress"><i style="width:${(e.currentQuestion+ +!!n)/e.quizOrder.length*100}%"></i></div>
    </div>
    <section class="quiz-card">
      <div class="question">${f(t.character)}</div>
      <p class="question-text">請選出「${f(t.character)}」的正確注音</p>
      <div class="answers">
        ${t.options.map((r,i)=>{let a=``;return n&&r===t.answer?a=`correct`:n&&r===e.selectedAnswer&&(a=`wrong`),`<button class="answer ${a}" data-answer="${f(r)}" ${n?`disabled`:``}>
            <span>${String.fromCharCode(65+i)}</span>${f(r)}
            ${a===`correct`?`<b>✓</b>`:a===`wrong`?`<b>×</b>`:``}
          </button>`}).join(``)}
      </div>
      ${n?`
        <div class="feedback ${e.selectedAnswer===t.answer?`good`:`bad`}">
          ${e.selectedAnswer===t.answer?`🎉 答對了，真厲害！`:`再記一下：正確答案是 ${f(t.answer)}`}
        </div>
        <button class="primary next-question" id="next-question">下一題 →</button>`:`<div class="tip">仔細看、慢慢想，你一定可以！</div>`}
    </section>`}adminView(e,t){return`<section class="heading admin-heading">
      <div><span class="eyebrow"><i></i>家長與老師專區</span><h1>管理練習內容</h1></div>
      <span class="admin-status">${e.appliedItems.length?`已套用 ${e.appliedItems.length} 組`:`使用預設詞語`}</span>
    </section>
    <div class="admin-grid">
      <section class="admin-card">
        <h2>✍️ 自由輸入</h2>
        <p>內建字典會自動帶入已收錄的注音與圖示；查不到時請手動輸入，每個字的注音以空格分隔。</p>
        <div class="field-grid">
          <label>單字或詞語<input id="custom-word" maxlength="8" placeholder="例如：太陽"></label>
          <label>注音<input id="custom-bopomofo" placeholder="例如：ㄊㄞˋ ㄧㄤˊ"></label>
          <label>圖示<input id="custom-emoji" maxlength="8" placeholder="🔤"></label>
        </div>
        <div class="admin-buttons"><button class="secondary" id="add-custom">新增到清單</button></div>
      </section>
      <section class="admin-card">
        <h2>🎂 依年齡產生</h2>
        <p>從內建的一年級生活字詞中，依年齡隨機挑選十組，產生後仍可自由新增或刪除。</p>
        <div class="age-controls">
          <label>孩子年齡
            <select id="age-select">
              <option value="6" ${e.selectedAge===6?`selected`:``}>6 歲</option>
              <option value="7" ${e.selectedAge===7?`selected`:``}>7 歲</option>
              <option value="8" ${e.selectedAge===8?`selected`:``}>8 歲</option>
            </select>
          </label>
          <button class="secondary" id="generate-age">產生 10 組</button>
        </div>
        <div class="admin-buttons"><button class="secondary" id="generate-random">🎲 全部隨機產生 10 組</button></div>
      </section>
      <section class="admin-card wide">
        <h2>⭐ 已標記字詞</h2>
        <p>點選即可快速加入本次清單。</p>
        <div class="bookmarks">
          ${e.bookmarks.length?e.bookmarks.map((e,t)=>`<button class="bookmark-chip" data-use-bookmark="${t}">${f(e.emoji)} ${f(e.word)}</button>`).join(``):`<span class="empty">尚未標記任何字詞</span>`}
        </div>
      </section>
      <section class="admin-card wide">
        <h2>📋 本次練習清單</h2>
        <p>共 ${e.workingItems.length} 組。確認後按 Apply，學習模式與考試模式都會使用這份內容。</p>
        <div class="draft-list">${this.workingList(e,t)}</div>
        ${e.adminNotice?`<div class="notice">${f(e.adminNotice)}</div>`:``}
        <div class="apply-bar">
          <p>${e.appliedItems.length?`目前學習與考試使用 ${e.appliedItems.length} 組指定內容。`:`目前使用網站預設的雙字詞語。`}</p>
          <div class="apply-actions">
            <button class="secondary" id="clear-applied">清除套用</button>
            <button class="primary" id="apply-list">Apply 套用清單</button>
          </div>
        </div>
      </section>
    </div>`}workingList(e,t){return e.workingItems.length?e.workingItems.map((e,n)=>`
      <div class="draft-row">
        <div class="draft-emoji">${f(e.emoji)}</div>
        <div class="draft-word"><strong>${f(e.word)}</strong><small>${e.bopomofo.map(f).join(`・`)}</small></div>
        <div class="draft-actions">
          <button class="star-button" data-bookmark="${n}" title="標記供下次使用">${t.isBookmarked(e)?`★`:`☆`}</button>
          <button class="danger" data-remove="${n}">刪除</button>
        </div>
      </div>`).join(``):`<div class="empty">目前沒有內容，請使用上方任一方式新增字詞。</div>`}bindEvents(e){this.root.querySelectorAll(`[data-mode]`).forEach(t=>{t.addEventListener(`click`,()=>e.onModeChange(t.dataset.mode))}),this.byId(`next-word`)?.addEventListener(`click`,e.onNextWord),this.byId(`listen`)?.addEventListener(`click`,e.onListen),this.root.querySelectorAll(`[data-answer]`).forEach(t=>{t.addEventListener(`click`,()=>e.onAnswer(t.dataset.answer||``))}),this.byId(`next-question`)?.addEventListener(`click`,e.onNextQuestion),this.byId(`restart`)?.addEventListener(`click`,e.onRestartQuiz);let t=this.byId(`custom-word`);t?.addEventListener(`input`,()=>{let n=e.onLookupWord(t.value);if(!n)return;let r=this.byId(`custom-bopomofo`),i=this.byId(`custom-emoji`);r&&(r.value=n.bopomofo.join(` `)),i&&(i.value=n.emoji)}),this.byId(`add-custom`)?.addEventListener(`click`,()=>{e.onAddCustom({word:t?.value||``,bopomofo:this.byId(`custom-bopomofo`)?.value||``,emoji:this.byId(`custom-emoji`)?.value||``})});let n=this.byId(`age-select`);n?.addEventListener(`change`,()=>e.onAgeChange(Number(n.value))),this.byId(`generate-age`)?.addEventListener(`click`,e.onGenerateByAge),this.byId(`generate-random`)?.addEventListener(`click`,e.onGenerateRandom),this.root.querySelectorAll(`[data-remove]`).forEach(t=>{t.addEventListener(`click`,()=>e.onRemoveWorking(Number(t.dataset.remove)))}),this.root.querySelectorAll(`[data-bookmark]`).forEach(t=>{t.addEventListener(`click`,()=>e.onToggleBookmark(Number(t.dataset.bookmark)))}),this.root.querySelectorAll(`[data-use-bookmark]`).forEach(t=>{t.addEventListener(`click`,()=>e.onUseBookmark(Number(t.dataset.useBookmark)))}),this.byId(`apply-list`)?.addEventListener(`click`,e.onApply),this.byId(`clear-applied`)?.addEventListener(`click`,e.onClearApplied)}byId(e){return this.root.querySelector(`#${e}`)}},g=document.querySelector(`#app`);if(!g)throw Error(`找不到應用程式根節點 #app`);new e(new d,new h(g)).start();