# Project Architecture Rules

- Route all dynamic learning-content translations through the server-side `ai-text-tools` function and cache successful results in the browser, so credentials remain private and repeated views do not incur duplicate AI requests.