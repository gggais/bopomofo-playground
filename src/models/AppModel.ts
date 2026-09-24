import type { AppMode, AppState, CustomWordInput, QuizItem, WordItem } from "./types";
import { defaultWords, extraReadings, vocabulary } from "./vocabulary";

const STORAGE = {
  applied: "characterSchool.applied",
  draft: "characterSchool.draft",
  bookmarks: "characterSchool.bookmarks",
  age: "characterSchool.age"
} as const;

const POINTS_PER_QUESTION = 10;
const VALID_AGES = [6, 7, 8];

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function loadList(key: string): WordItem[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.map(cleanItem).filter((item) => item.word) : [];
  } catch {
    return [];
  }
}

function cleanItem(item: Partial<WordItem>): WordItem {
  return {
    word: String(item.word || "").trim(),
    bopomofo: Array.isArray(item.bopomofo)
      ? item.bopomofo.map((value) => String(value).trim()).filter(Boolean)
      : [],
    emoji: String(item.emoji || "🔤").trim() || "🔤",
    age: Number(item.age) || 7,
    color: item.color || "#E4EBCF"
  };
}

function itemKey(item: WordItem): string {
  return `${item.word}|${item.bopomofo.join("|")}`;
}

export class AppModel {
  private mode: AppMode = "learn";
  private appliedItems = loadList(STORAGE.applied);
  private workingItems = loadList(STORAGE.draft);
  private bookmarks = loadList(STORAGE.bookmarks);
  private currentWord = 0;
  private currentQuestion = 0;
  private score = 0;
  private selectedAnswer: string | null = null;
  private quizOrder: QuizItem[] = [];
  private selectedAge = Number(localStorage.getItem(STORAGE.age)) || 7;
  private adminNotice = "";
  private readonly wordDictionary = new Map(vocabulary.map((item) => [item.word, item]));
  private readonly characterDictionary = new Map<string, WordItem>();

  constructor() {
    if (!VALID_AGES.includes(this.selectedAge)) this.selectedAge = 7;

    vocabulary.forEach((item) => {
      [...item.word].forEach((character, index) => {
        if (!this.characterDictionary.has(character)) {
          this.characterDictionary.set(character, {
            word: character,
            bopomofo: [item.bopomofo[index]],
            emoji: item.emoji,
            age: item.age,
            color: item.color
          });
        }
      });
    });

    this.resetQuiz();
  }

  get state(): AppState {
    return {
      mode: this.mode,
      appliedItems: this.appliedItems,
      workingItems: this.workingItems,
      bookmarks: this.bookmarks,
      activeWords: this.getActiveWords(),
      currentWord: this.currentWord,
      currentQuestion: this.currentQuestion,
      score: this.score,
      selectedAnswer: this.selectedAnswer,
      quizOrder: this.quizOrder,
      selectedAge: this.selectedAge,
      adminNotice: this.adminNotice
    };
  }

  setMode(mode: AppMode): void {
    this.mode = mode;
    this.adminNotice = "";
    if (mode === "quiz") this.resetQuiz();
    if (mode === "learn") {
      this.currentWord = Math.floor(Math.random() * this.getActiveWords().length);
    }
  }

  getActiveWords(): WordItem[] {
    return this.appliedItems.length ? this.appliedItems : defaultWords;
  }

  getCurrentWord(): WordItem {
    const items = this.getActiveWords();
    if (this.currentWord >= items.length) this.currentWord = 0;
    return items[this.currentWord];
  }

  nextWord(): void {
    const items = this.getActiveWords();
    if (items.length <= 1) return;
    let next = this.currentWord;
    while (next === this.currentWord) next = Math.floor(Math.random() * items.length);
    this.currentWord = next;
  }

  lookupWord(word: string): WordItem | null {
    return this.wordDictionary.get(word.trim()) || this.characterDictionary.get(word.trim()) || null;
  }

  answerQuestion(answer: string): void {
    if (this.selectedAnswer !== null || !this.quizOrder[this.currentQuestion]) return;
    this.selectedAnswer = answer;
    if (answer === this.quizOrder[this.currentQuestion].answer) this.score += POINTS_PER_QUESTION;
  }

  nextQuestion(): void {
    this.currentQuestion += 1;
    this.selectedAnswer = null;
  }

  resetQuiz(): void {
    this.currentQuestion = 0;
    this.score = 0;
    this.selectedAnswer = null;

    const candidates = this.quizItemsFromWords(this.getActiveWords());
    const readingPool = [
      ...new Set([
        ...vocabulary.flatMap((item) => item.bopomofo),
        ...this.getActiveWords().flatMap((item) => item.bopomofo),
        ...extraReadings
      ])
    ];

    this.quizOrder = shuffle(candidates)
      .slice(0, Math.min(10, candidates.length))
      .map((item) => ({
        ...item,
        options: shuffle([
          item.answer,
          ...shuffle(readingPool.filter((value) => value !== item.answer)).slice(0, 3)
        ])
      }));
  }

  addCustom(input: CustomWordInput): void {
    const word = input.word.trim();
    const bopomofo = input.bopomofo.trim().split(/\s+/).filter(Boolean);

    if (!word) {
      this.adminNotice = "請先輸入單字或詞語。";
      return;
    }
    if ([...word].length !== bopomofo.length) {
      this.adminNotice = `「${word}」有 ${[...word].length} 個字，請提供相同數量的注音並以空格分隔。`;
      return;
    }

    this.addWorkingItem({
      word,
      bopomofo,
      emoji: input.emoji.trim() || "🔤",
      age: this.selectedAge,
      color: "#E4EBCF"
    });
  }

  setSelectedAge(age: number): void {
    this.selectedAge = VALID_AGES.includes(age) ? age : 7;
    localStorage.setItem(STORAGE.age, String(this.selectedAge));
  }

  generateByAge(): void {
    this.workingItems = shuffle(vocabulary.filter((item) => item.age === this.selectedAge))
      .slice(0, 10)
      .map(cleanItem);
    this.adminNotice = `已依 ${this.selectedAge} 歲產生 ${this.workingItems.length} 組字詞，可繼續新增或刪除。`;
    this.save();
  }

  generateRandom(): void {
    this.workingItems = shuffle(vocabulary).slice(0, 10).map(cleanItem);
    this.adminNotice = "已從全部字庫隨機產生 10 組字詞。";
    this.save();
  }

  removeWorkingItem(index: number): void {
    this.workingItems.splice(index, 1);
    this.adminNotice = "已從本次清單刪除。";
    this.save();
  }

  toggleBookmark(index: number): void {
    const item = this.workingItems[index];
    if (!item) return;
    const bookmarkIndex = this.bookmarks.findIndex((saved) => itemKey(saved) === itemKey(item));

    if (bookmarkIndex >= 0) {
      this.bookmarks.splice(bookmarkIndex, 1);
      this.adminNotice = `已取消標記「${item.word}」。`;
    } else {
      this.bookmarks.push(cleanItem(item));
      this.adminNotice = `已標記「${item.word}」，下次可快速使用。`;
    }
    this.save();
  }

  useBookmark(index: number): void {
    const item = this.bookmarks[index];
    if (item) this.addWorkingItem(item);
  }

  applyWorkingItems(): void {
    if (!this.workingItems.length) {
      this.adminNotice = "本次清單是空的，請先加入至少一組字詞。";
      return;
    }
    if (this.workingItems.some((item) => [...item.word].length !== item.bopomofo.length)) {
      this.adminNotice = "有字詞缺少注音，請刪除後重新加入。";
      return;
    }

    this.appliedItems = this.workingItems.map(cleanItem);
    this.currentWord = 0;
    this.resetQuiz();
    this.adminNotice = `已套用 ${this.appliedItems.length} 組，學習與考試模式都會立即使用。`;
    this.save();
  }

  clearAppliedItems(): void {
    this.appliedItems = [];
    this.currentWord = 0;
    this.resetQuiz();
    this.adminNotice = "已清除套用內容，恢復使用網站預設詞語。";
    this.save();
  }

  isBookmarked(item: WordItem): boolean {
    return this.bookmarks.some((saved) => itemKey(saved) === itemKey(item));
  }

  private addWorkingItem(item: WordItem): void {
    const clean = cleanItem(item);
    if (this.workingItems.some((existing) => itemKey(existing) === itemKey(clean))) {
      this.adminNotice = "這個字詞已經在本次清單中。";
      return;
    }

    this.workingItems.push(clean);
    this.adminNotice = `已新增「${clean.word}」。`;
    this.save();
  }

  private quizItemsFromWords(items: WordItem[]): Omit<QuizItem, "options">[] {
    const seen = new Map<string, Omit<QuizItem, "options">>();
    items.forEach((item) => {
      [...item.word].forEach((character, index) => {
        const answer = item.bopomofo[index];
        const key = `${character}|${answer}`;
        if (answer && !seen.has(key)) seen.set(key, { character, answer });
      });
    });
    return [...seen.values()];
  }

  private save(): void {
    localStorage.setItem(STORAGE.draft, JSON.stringify(this.workingItems));
    localStorage.setItem(STORAGE.bookmarks, JSON.stringify(this.bookmarks));
    localStorage.setItem(STORAGE.applied, JSON.stringify(this.appliedItems));
    localStorage.setItem(STORAGE.age, String(this.selectedAge));
  }
}
