import type { AppMode, AppState, CustomWordInput, WordItem } from "../models/types";

export interface ViewHandlers {
  onModeChange: (mode: AppMode) => void;
  onNextWord: () => void;
  onListen: () => void;
  onAnswer: (answer: string) => void;
  onNextQuestion: () => void;
  onRestartQuiz: () => void;
  onLookupWord: (word: string) => WordItem | null;
  onAddCustom: (input: CustomWordInput) => void;
  onAgeChange: (age: number) => void;
  onGenerateByAge: () => void;
  onGenerateRandom: () => void;
  onRemoveWorking: (index: number) => void;
  onToggleBookmark: (index: number) => void;
  onUseBookmark: (index: number) => void;
  onApply: () => void;
  onClearApplied: () => void;
  isBookmarked: (item: WordItem) => boolean;
}

function escapeHtml(value: unknown): string {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character] as string);
}

function bopomofoMarkup(value: string): string {
  const match = String(value || "？").match(/^(.*?)([ˊˇˋ˙])?$/);
  const base = match?.[1] || "？";
  const tone = match?.[2] || "";
  return `<span class="bopomofo">
    <span class="bopomofo-base">${escapeHtml(base)}</span>
    ${tone ? `<span class="bopomofo-tone ${tone === "˙" ? "neutral" : ""}">${escapeHtml(tone)}</span>` : ""}
  </span>`;
}

function wordMarkup(item: WordItem): string {
  return [...item.word].map((character, index) => `
    <span class="annotated">
      <span class="hanzi">${escapeHtml(character)}</span>
      ${bopomofoMarkup(item.bopomofo[index])}
    </span>`).join("");
}

export class AppView {
  constructor(private readonly root: HTMLElement) {}

  render(state: AppState, handlers: ViewHandlers): void {
    this.root.innerHTML = `<div class="page">
      <header>
        <div class="brand">
          <span class="brand-mark">字</span>
          <span class="brand-text"><strong>字字小學堂</strong><small>快樂認識每個字</small></span>
        </div>
        <div class="today">⭐ 今天也要加油！</div>
      </header>
      <main>
        ${this.modeSwitcher(state.mode)}
        ${state.mode === "learn" ? this.learningView(state) : state.mode === "quiz" ? this.quizView(state) : this.adminView(state, handlers)}
      </main>
      <footer>每天學一點，國字進步看得見！ 🌱</footer>
    </div>`;

    this.bindEvents(handlers);
  }

  private modeSwitcher(mode: AppMode): string {
    return `<div class="mode-switcher">
      <button class="mode ${mode === "learn" ? "active" : ""}" data-mode="learn">
        <span class="mode-icon">▤</span><span class="mode-label"><strong>學習模式</strong><small>看圖片・讀詞語</small></span>
      </button>
      <button class="mode ${mode === "quiz" ? "active" : ""}" data-mode="quiz">
        <span class="mode-icon">✎</span><span class="mode-label"><strong>考試模式</strong><small>選出正確注音</small></span>
      </button>
      <button class="mode ${mode === "admin" ? "active" : ""}" data-mode="admin">
        <span class="mode-icon">⚙</span><span class="mode-label"><strong>管理者模式</strong><small>設定練習內容</small></span>
      </button>
    </div>`;
  }

  private learningView(state: AppState): string {
    const index = Math.min(state.currentWord, state.activeWords.length - 1);
    const item = state.activeWords[index];
    return `<section class="heading">
      <div>
        <span class="eyebrow"><i></i>${state.appliedItems.length ? "管理者指定內容" : "今天的詞語"}</span>
        <h1>看看圖片，跟著讀一讀！</h1>
      </div>
      <span class="counter">詞語 ${index + 1} / ${state.activeWords.length}</span>
    </section>
    <section class="learning-card">
      <div class="picture-panel" style="--color:${escapeHtml(item.color)}">
        <div class="picture" role="img" aria-label="${escapeHtml(item.word)}">${escapeHtml(item.emoji)}</div>
        <span class="picture-label">看圖想一想</span>
      </div>
      <div class="word-panel">
        <span class="prompt">這個詞語怎麼念？</span>
        <div class="word-with-bopomofo">${wordMarkup(item)}</div>
        <button class="listen" id="listen">🔊 聽聽看</button>
      </div>
    </section>
    <div class="actions">
      <p>💡 小提示：先看圖片，再大聲念出來！</p>
      <button class="primary" id="next-word">換一個詞語 <span>→</span></button>
    </div>`;
  }

  private quizView(state: AppState): string {
    if (!state.quizOrder.length) {
      return `<section class="result-card">
        <div class="result-emoji">📝</div><h1>目前沒有可考的字</h1>
        <p>請到管理者模式加入完整注音並套用。</p>
      </section>`;
    }

    if (state.currentQuestion >= state.quizOrder.length) {
      const perfect = state.score === state.quizOrder.length * 10;
      return `<section class="result-card">
        <div class="result-emoji">${perfect ? "🏆" : "🌟"}</div>
        <h1>${perfect ? "全部答對，太棒了！" : "完成挑戰，很不錯！"}</h1>
        <p>你得到 <strong>${state.score} 分</strong></p>
        <button class="primary" id="restart">再考一次 ↻</button>
      </section>`;
    }

    const item = state.quizOrder[state.currentQuestion];
    const answered = state.selectedAnswer !== null;
    return `<section class="heading">
      <div>
        <span class="eyebrow"><i></i>${state.appliedItems.length ? "指定內容測驗" : "注音小測驗"}</span>
        <h1>選出這個字的正確注音</h1>
      </div>
      <div class="score">⭐ ${state.score} 分</div>
    </section>
    <div class="progress-row">
      <span>第 ${state.currentQuestion + 1} 題，共 ${state.quizOrder.length} 題</span>
      <div class="progress"><i style="width:${((state.currentQuestion + (answered ? 1 : 0)) / state.quizOrder.length) * 100}%"></i></div>
    </div>
    <section class="quiz-card">
      <div class="question">${escapeHtml(item.character)}</div>
      <p class="question-text">請選出「${escapeHtml(item.character)}」的正確注音</p>
      <div class="answers">
        ${item.options.map((option, index) => {
          let answerState = "";
          if (answered && option === item.answer) answerState = "correct";
          else if (answered && option === state.selectedAnswer) answerState = "wrong";
          return `<button class="answer ${answerState}" data-answer="${escapeHtml(option)}" ${answered ? "disabled" : ""}>
            <span>${String.fromCharCode(65 + index)}</span>${escapeHtml(option)}
            ${answerState === "correct" ? "<b>✓</b>" : answerState === "wrong" ? "<b>×</b>" : ""}
          </button>`;
        }).join("")}
      </div>
      ${answered ? `
        <div class="feedback ${state.selectedAnswer === item.answer ? "good" : "bad"}">
          ${state.selectedAnswer === item.answer ? "🎉 答對了，真厲害！" : `再記一下：正確答案是 ${escapeHtml(item.answer)}`}
        </div>
        <button class="primary next-question" id="next-question">下一題 →</button>`
        : `<div class="tip">仔細看、慢慢想，你一定可以！</div>`}
    </section>`;
  }

  private adminView(state: AppState, handlers: ViewHandlers): string {
    return `<section class="heading admin-heading">
      <div><span class="eyebrow"><i></i>家長與老師專區</span><h1>管理練習內容</h1></div>
      <span class="admin-status">${state.appliedItems.length ? `已套用 ${state.appliedItems.length} 組` : "使用預設詞語"}</span>
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
              <option value="6" ${state.selectedAge === 6 ? "selected" : ""}>6 歲</option>
              <option value="7" ${state.selectedAge === 7 ? "selected" : ""}>7 歲</option>
              <option value="8" ${state.selectedAge === 8 ? "selected" : ""}>8 歲</option>
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
          ${state.bookmarks.length
            ? state.bookmarks.map((item, index) => `<button class="bookmark-chip" data-use-bookmark="${index}">${escapeHtml(item.emoji)} ${escapeHtml(item.word)}</button>`).join("")
            : '<span class="empty">尚未標記任何字詞</span>'}
        </div>
      </section>
      <section class="admin-card wide">
        <h2>📋 本次練習清單</h2>
        <p>共 ${state.workingItems.length} 組。確認後按 Apply，學習模式與考試模式都會使用這份內容。</p>
        <div class="draft-list">${this.workingList(state, handlers)}</div>
        ${state.adminNotice ? `<div class="notice">${escapeHtml(state.adminNotice)}</div>` : ""}
        <div class="apply-bar">
          <p>${state.appliedItems.length ? `目前學習與考試使用 ${state.appliedItems.length} 組指定內容。` : "目前使用網站預設的雙字詞語。"}</p>
          <div class="apply-actions">
            <button class="secondary" id="clear-applied">清除套用</button>
            <button class="primary" id="apply-list">Apply 套用清單</button>
          </div>
        </div>
      </section>
    </div>`;
  }

  private workingList(state: AppState, handlers: ViewHandlers): string {
    if (!state.workingItems.length) {
      return `<div class="empty">目前沒有內容，請使用上方任一方式新增字詞。</div>`;
    }

    return state.workingItems.map((item, index) => `
      <div class="draft-row">
        <div class="draft-emoji">${escapeHtml(item.emoji)}</div>
        <div class="draft-word"><strong>${escapeHtml(item.word)}</strong><small>${item.bopomofo.map(escapeHtml).join("・")}</small></div>
        <div class="draft-actions">
          <button class="star-button" data-bookmark="${index}" title="標記供下次使用">${handlers.isBookmarked(item) ? "★" : "☆"}</button>
          <button class="danger" data-remove="${index}">刪除</button>
        </div>
      </div>`).join("");
  }

  private bindEvents(handlers: ViewHandlers): void {
    this.root.querySelectorAll<HTMLElement>("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => handlers.onModeChange(button.dataset.mode as AppMode));
    });
    this.byId("next-word")?.addEventListener("click", handlers.onNextWord);
    this.byId("listen")?.addEventListener("click", handlers.onListen);
    this.root.querySelectorAll<HTMLElement>("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => handlers.onAnswer(button.dataset.answer || ""));
    });
    this.byId("next-question")?.addEventListener("click", handlers.onNextQuestion);
    this.byId("restart")?.addEventListener("click", handlers.onRestartQuiz);

    const wordInput = this.byId<HTMLInputElement>("custom-word");
    wordInput?.addEventListener("input", () => {
      const found = handlers.onLookupWord(wordInput.value);
      if (!found) return;
      const bopomofo = this.byId<HTMLInputElement>("custom-bopomofo");
      const emoji = this.byId<HTMLInputElement>("custom-emoji");
      if (bopomofo) bopomofo.value = found.bopomofo.join(" ");
      if (emoji) emoji.value = found.emoji;
    });
    this.byId("add-custom")?.addEventListener("click", () => {
      handlers.onAddCustom({
        word: wordInput?.value || "",
        bopomofo: this.byId<HTMLInputElement>("custom-bopomofo")?.value || "",
        emoji: this.byId<HTMLInputElement>("custom-emoji")?.value || ""
      });
    });

    const ageSelect = this.byId<HTMLSelectElement>("age-select");
    ageSelect?.addEventListener("change", () => handlers.onAgeChange(Number(ageSelect.value)));
    this.byId("generate-age")?.addEventListener("click", handlers.onGenerateByAge);
    this.byId("generate-random")?.addEventListener("click", handlers.onGenerateRandom);
    this.root.querySelectorAll<HTMLElement>("[data-remove]").forEach((button) => {
      button.addEventListener("click", () => handlers.onRemoveWorking(Number(button.dataset.remove)));
    });
    this.root.querySelectorAll<HTMLElement>("[data-bookmark]").forEach((button) => {
      button.addEventListener("click", () => handlers.onToggleBookmark(Number(button.dataset.bookmark)));
    });
    this.root.querySelectorAll<HTMLElement>("[data-use-bookmark]").forEach((button) => {
      button.addEventListener("click", () => handlers.onUseBookmark(Number(button.dataset.useBookmark)));
    });
    this.byId("apply-list")?.addEventListener("click", handlers.onApply);
    this.byId("clear-applied")?.addEventListener("click", handlers.onClearApplied);
  }

  private byId<T extends HTMLElement = HTMLElement>(id: string): T | null {
    return this.root.querySelector<T>(`#${id}`);
  }
}
