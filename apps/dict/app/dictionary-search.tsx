"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";

type DictionaryDefinition = {
  en: string;
  zh: string;
  example: string;
};

type DictionaryMeaning = {
  part_of_speech: string;
  definitions: DictionaryDefinition[];
};

type DictionaryResponse = {
  word: string;
  phonetic: string;
  audio_url: string;
  meanings: DictionaryMeaning[];
  origin: string;
  synonyms: string[];
  antonyms: string[];
  learning_tip: string;
};

type DictionarySuggestionResponse = {
  query: string;
  suggestions: string[];
};

const DEFAULT_WORD = "resilience";

export function DictionarySearch() {
  const [word, setWord] = useState(DEFAULT_WORD);
  const [result, setResult] = useState<DictionaryResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isPending, startTransition] = useTransition();
  const requestIdRef = useRef(0);

  useEffect(() => {
    const normalized = word.trim().toLowerCase();

    if (normalized.length < 2) {
      setSuggestions([]);
      return;
    }

    requestIdRef.current += 1;
    const currentRequestId = requestIdRef.current;
    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/v1/dictionary/suggestions?q=${encodeURIComponent(normalized)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as DictionarySuggestionResponse;
        if (requestIdRef.current === currentRequestId) {
          setSuggestions(payload.suggestions.filter((item) => item !== normalized));
        }
      } catch (suggestionError) {
        if (controller.signal.aborted) {
          return;
        }
        setSuggestions([]);
      }
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [word]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized = word.trim();
    if (!normalized) {
      setError("请输入要查询的单词。");
      setResult(null);
      return;
    }

    setError("");
    setShowSuggestions(false);

    startTransition(async () => {
      try {
        const response = await fetch("/api/v1/dictionary/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ word: normalized })
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as { detail?: string } | null;
          throw new Error(payload?.detail || "查询失败，请稍后重试。");
        }

        const payload = (await response.json()) as DictionaryResponse;
        setResult(payload);
        setError("");
      } catch (submissionError) {
        const message =
          submissionError instanceof Error ? submissionError.message : "查询失败，请稍后重试。";
        setError(message);
        setResult(null);
      }
    });
  }

  function applySuggestion(nextWord: string) {
    setWord(nextWord);
    setShowSuggestions(false);
  }

  return (
    <>
      <div className="hero-copy">
        <p className="section-eyebrow">Word Lens / Lookup System</p>
        <h1>查询单词，直接得到清晰结果。</h1>
        <p>
          词典站现在已经接通 MVP 查询链路。输入英文单词后，页面会直接请求后端 API，返回释义、音标、例句和关联词。
        </p>
      </div>

      <div className="surface-panel dict-panel">
        <form onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="word">
            Input Word
          </label>
          <div className="search-stack">
            <div className="search-row">
              <input
                id="word"
                name="word"
                value={word}
                onChange={(event) => {
                  setWord(event.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="例如 resilience"
                autoComplete="off"
              />
              <button className="primary-button" type="submit" disabled={isPending}>
                {isPending ? "Searching..." : "Search"}
              </button>
            </div>
            {showSuggestions && suggestions.length ? (
              <div className="suggestion-panel" role="listbox" aria-label="Word suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="suggestion-item"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => applySuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </form>

        <div className="query-hint">
          试试这些词：
          {" "}
          <button type="button" className="inline-chip" onClick={() => applySuggestion("resilience")}>
            resilience
          </button>
          <button type="button" className="inline-chip" onClick={() => applySuggestion("serendipity")}>
            serendipity
          </button>
          <button type="button" className="inline-chip" onClick={() => applySuggestion("clarity")}>
            clarity
          </button>
        </div>

        {error ? <p className="status-message status-message--error">{error}</p> : null}

        {result ? (
          <section className="result-panel" aria-live="polite">
            <div className="result-header">
              <div>
                <p className="meta-label">Query Result</p>
                <h2>{result.word}</h2>
              </div>
              <div className="result-meta">
                {result.phonetic ? <span>{result.phonetic}</span> : null}
                {result.audio_url ? (
                  <a className="text-link" href={result.audio_url} target="_blank" rel="noreferrer">
                    Pronunciation
                  </a>
                ) : null}
              </div>
            </div>

            <div className="meaning-list">
              {result.meanings.map((meaning) => (
                <article className="meaning-card" key={`${meaning.part_of_speech}-${meaning.definitions[0]?.en}`}>
                  <p className="meta-label">{meaning.part_of_speech}</p>
                  {meaning.definitions.map((definition) => (
                    <div className="definition-block" key={definition.en}>
                      <p>{definition.en}</p>
                      {definition.example ? (
                        <p className="definition-example">Example: {definition.example}</p>
                      ) : null}
                    </div>
                  ))}
                </article>
              ))}
            </div>

            {result.learning_tip ? (
              <div className="support-grid">
                <article className="surface-panel support-card">
                  <p className="meta-label">Learning Tip</p>
                  <p>{result.learning_tip}</p>
                </article>
                <article className="surface-panel support-card">
                  <p className="meta-label">Synonyms</p>
                  <p>{result.synonyms.length ? result.synonyms.join(", ") : "No synonym data yet."}</p>
                </article>
                <article className="surface-panel support-card">
                  <p className="meta-label">Antonyms</p>
                  <p>{result.antonyms.length ? result.antonyms.join(", ") : "No antonym data yet."}</p>
                </article>
              </div>
            ) : null}
          </section>
        ) : (
          <div className="result-empty">
            <p className="meta-label">Ready</p>
            <p>输入单词并提交后，结果会出现在这里。</p>
          </div>
        )}
      </div>
    </>
  );
}
