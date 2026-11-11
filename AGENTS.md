# Project Architecture Rules

- Route all dynamic learning-content translations through the server-side `ai-text-tools` function and cache successful results in the browser, so credentials remain private and repeated views do not incur duplicate AI requests.
- ESO translations use source-content/language cache keys and shared in-flight requests; pass the same translated vocabulary to cards, pronunciation and quizzes to avoid inconsistent language fallbacks.