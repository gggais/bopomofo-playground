import { AppModel } from "../models/AppModel";
import type { AppMode, CustomWordInput } from "../models/types";
import { AppView, type ViewHandlers } from "../views/AppView";

export class AppController {
  constructor(
    private readonly model: AppModel,
    private readonly view: AppView
  ) {}

  start(): void {
    this.render();
  }

  private render(): void {
    const handlers: ViewHandlers = {
      onModeChange: (mode: AppMode) => this.update(() => this.model.setMode(mode)),
      onNextWord: () => this.update(() => this.model.nextWord()),
      onListen: () => this.speakCurrentWord(),
      onAnswer: (answer: string) => this.update(() => this.model.answerQuestion(answer)),
      onNextQuestion: () => this.update(() => this.model.nextQuestion()),
      onRestartQuiz: () => this.update(() => this.model.resetQuiz()),
      onLookupWord: (word: string) => this.model.lookupWord(word),
      onAddCustom: (input: CustomWordInput) => this.update(() => this.model.addCustom(input)),
      onAgeChange: (age: number) => this.model.setSelectedAge(age),
      onGenerateByAge: () => this.update(() => this.model.generateByAge()),
      onGenerateRandom: () => this.update(() => this.model.generateRandom()),
      onRemoveWorking: (index: number) => this.update(() => this.model.removeWorkingItem(index)),
      onToggleBookmark: (index: number) => this.update(() => this.model.toggleBookmark(index)),
      onUseBookmark: (index: number) => this.update(() => this.model.useBookmark(index)),
      onApply: () => this.update(() => this.model.applyWorkingItems()),
      onClearApplied: () => this.update(() => this.model.clearAppliedItems()),
      isBookmarked: (item) => this.model.isBookmarked(item)
    };

    this.view.render(this.model.state, handlers);
  }

  private update(action: () => void): void {
    action();
    this.render();
  }

  private speakCurrentWord(): void {
    const utterance = new SpeechSynthesisUtterance(this.model.getCurrentWord().word);
    utterance.lang = "zh-TW";
    utterance.rate = 0.75;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}
