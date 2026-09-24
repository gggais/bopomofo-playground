# 字字小學堂

為台灣小學一年級學生設計的國字與注音練習網站。

## 架構

- `src/models`：字庫、學習狀態、考試邏輯與瀏覽器儲存
- `src/views`：學習、考試及管理者畫面
- `src/controllers`：使用者事件與 Model/View 協調
- `src/styles`：網站樣式

## 本機執行

```bash
npm install
npm run dev
```

## 正式建置

```bash
npm run build
```

建置結果位於 `dist` 資料夾。
