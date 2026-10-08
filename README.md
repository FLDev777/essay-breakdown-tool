# Essay Breakdown Tool

Turn an essay question into a structured, section-by-section **plan** — headings, word budgets, and depth-tagged bullet points — using the Gemini API. It writes the scaffolding, not the essay.

Static site: plain HTML, CSS and JavaScript. No build step, no package manager, no server, no database.

---

## Bring your own API key

**This repository contains no API key, and no file where you are meant to put one.**

On first visit the app asks for your Gemini API key and keeps it in your browser's `localStorage` only. It is sent to Google's API and nowhere else. Get a free key from [Google AI Studio](https://aistudio.google.com/apikey).

If you deploy this publicly, every visitor supplies their own key — so hosting it costs the owner nothing and shares no quota.

---

## Quick start

1. Get a Gemini API key (link above).
2. Open `index.html` — double-click it, or serve the folder with any static server.
3. Paste your key when prompted, fill in the form, and press **Generate Breakdown**.

The results open in a new tab and can be exported as an interactive HTML file, copied as Markdown, or downloaded as DOCX.

---

## What you get

For a question, some instructions, an optional mark scheme and a target word count, the tool returns:

- **H1 sections drawn from the selected essay style**, with H2 and H3 subsections nested beneath them.
- **An approximate word count on every heading**, summing to your target to within ±7.5%. `References` and `Appendices` are excluded and carry no count.
- **Every bullet tagged by depth** — `[D]` descriptive, `[A]` analytical, `[E]` evaluative — with at least two `[A]`/`[E]` points per section.
- **A `[Why:]` line opening each section**, explaining what that section contributes to the answer.
- **A `[Counter:]` opposing view** on each major claim, with the rebuttal.
- **A populated `References` section**, listing the kinds of sources to consult when specific titles cannot be given.

Your own question and instructions lead the prompt, and the model is instructed never to substitute a different topic or invent findings, studies or citations. If the style does not suit the question's discipline — a Lab Report for a literary question, say — the headings are re-purposed to the material rather than the topic being replaced.

---

## Essay styles

13 styles are available. Each contributes its own H1 section headings; everything below is sent to the API as-is.

| Style | What it is for | H1 sections |
|---|---|---|
| **Standard Essay** | Present a focused, evidence-based argument that answers a set question and demonstrates critical engagement with published sources. | 5 |
| **Reflective Essay (Pure Experiential Reflection)** | Critically explore a personal / professional experience for growth and behavioural change, using internal evidence (your own feelings, actions and outcomes). Sections follow Gibbs' Reflective Cycle; Driscoll's "What? / So What? / Now What?" and Kolb's cycle are equally valid alternatives. | 8 |
| **Reflective Essay (Academic / Theoretical Reflection)** | Bridge real-world experience with published theory: validate and evaluate your practice against academic evidence. Sections follow PEEL-R (Point, Evidence, Explanation, Link, Reflection); Schön's reflection-in-action vs reflection-on-action and an integrated Gibbs structure are equally valid alternatives. | 9 |
| **Literature Review** | Map, critique and synthesise the existing research on a narrow topic to identify gaps your study will fill. | 7 |
| **Persuasive / Viewpoint Essay** | Construct a sustained, rhetorical argument taking a clear stance on a contemporary social issue or prompt. | 5 |
| **Transactional Writing** | Adapt a viewpoint or argument into a specific real-world format tailored to audience and purpose. | 5 |
| **Descriptive Writing** | Craft immersive, sensory-driven prose focused on setting, atmosphere, or character without relying on a plot. | 5 |
| **Narrative Writing** | Develop a structured fictional narrative focusing on character, conflict, tension, and resolution. | 5 |
| **Literary Analysis Essay** | Evaluate how an author uses language, structure, and historical/social context to convey themes in prose, drama, or poetry. | 5 |
| **Comparative Essay** | Synthesise two texts side-by-side to analyze similarities and differences in perspective, language, and technique. | 5 |
| **Research Proposal** | Convince a reader that your planned study is original, feasible and ethically sound. | 10 |
| **Lab / Experimental Report** | Document an experiment so it could be replicated and its findings evaluated. | 8 |
| **Case-Study Analysis** | Apply relevant theories to a real-world entity, event or patient to diagnose problems and recommend evidence-based solutions. | 10 |

Add or edit a style by adding an entry to the `essayStyles` array in `essay-styles.js` — `name`, `description` (shown in the sidebar, never sent to the API) and `headings` (sent).

---

## How it works

1. `index.html` collects the inputs and hands them to the results page through `sessionStorage`.
2. `prompts.js` assembles a single prompt: your question, instructions and marking sheet first, then the selected style's H1 list, the formatting and word-budget rules, and a worked example clearly marked as a formatting specimen only.
3. `breakdown.html` streams the response from the Gemini API, normalises the model's formatting, parses it into a tree and renders collapsible sections.
4. Sections whose H1 title is not in the selected style's heading list are dropped — the style list is a filter as well as a hint.
5. A history of the last 20 breakdowns is kept in your own browser's `localStorage`.

### Files

| File | Role |
|---|---|
| `index.html` | Input form, essay-style picker, local history |
| `breakdown.html` | API call, Markdown parsing, rendering, the three exports |
| `essay-styles.js` | The 13 styles with their descriptions and H1 heading sets |
| `prompts.js` | Prompt assembly |
| `tailwind-config.js` | Shared Tailwind theme, loaded by both pages |

External dependencies load from CDNs: Tailwind CSS, Showdown (Markdown → HTML), `docx` (Word export), and the Google Generative AI SDK. An internet connection is required.

---

## Privacy

There is no backend. Your inputs go from your browser directly to Google's Gemini API and nowhere else. No analytics, no telemetry, no accounts. Everything the tool remembers — your API key and up to 20 past breakdowns — stays in your own browser's `localStorage` and is cleared by clearing site data.

---

## Licence

No licence has been chosen yet. Until one is added, default copyright applies: you may view the code, but not reuse it.
