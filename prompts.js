// Prompt templates for Essay Breakdown generation
// Centralized for easier iteration and JSON-mode support

const DEFAULT_HEADINGS = ['Abstract', 'Introduction', 'Main Body', 'Conclusion', 'References'];

/**
 * Build a markdown-style prompt for the Gemini API.
 * @param {Object} p
 * @param {string} p.essayQuestion
 * @param {string} p.detailedInstructions
 * @param {string} p.markingSheet
 * @param {number|string} p.wordCount
 * @param {string} p.essayStyle
 * @param {string[]} p.headings - Array of H1 heading titles
 * @param {string} p.styleDescription
 * @returns {string} Full prompt text
 */
function buildMarkdownPrompt(p) {
    const headingList = (p.headings || DEFAULT_HEADINGS).map(h => `"${h.split(' (')[0]}"`).join(', ');

    // The template body below is indented 16 spaces. Pad the continuation lines of injected
    // multi-line values (instructions, marking sheet) so the whole prompt lines up.
    const indentContinuation = (text) => String(text || '').replace(/\n/g, '\n' + ' '.repeat(16));

    // Patch 3 support: does this style actually declare a References heading?
    const hasReferences = (p.headings || DEFAULT_HEADINGS).some(h => /^references/i.test(h));

    // Patch 4: scale the worked example's counts to the user's budget so the example is never a bad
    // anchor (a hardcoded 1,500-word H1 is 75% of a 2,000-word target). Kept consistent: 35% = 12% + 23%.
    const wc = Number(p.wordCount) || 2000;
    const ex = {
        h1: Math.round(wc * 0.35),
        h2a: Math.round(wc * 0.12), h3a: Math.round(wc * 0.05),
        h2b: Math.round(wc * 0.23), h3b: Math.round(wc * 0.11)
    };

    return `

                CRITICAL INSTRUCTION: All generated content must be for UK localisation (British English Grammar, Pound Sterling, Metric/Imperial mix etc...). 

                THE STUDENT'S MATERIAL — the absolute priority of this task. This is the only source of subject matter; everything that follows is about how to present it:

                Essay Question:
                "${indentContinuation(p.essayQuestion)}"

                Details to be included:
                "${indentContinuation(p.detailedInstructions)}"

                ${p.markingSheet ? `
                Marking Sheet Criteria to consider:
                "${indentContinuation(p.markingSheet)}"
                ` : ''}

                CRITICAL: Do NOT write the essay. You are to provide a structured breakdown and guide on how to write the essay. Do not generate full paragraphs or complete sections of the essay. Instead, use bullet points and brief descriptions to outline the content for each section.

                CRITICAL — SOURCE OF TRUTH: The essay question and details at the top of this prompt are the ONLY source of subject matter. Never replace, reinterpret or switch to a different topic. Never invent findings, datasets, participants, results, statistics, named studies, legal cases or citations that are not stated in — or directly and necessarily implied by — that material. Where a section needs a specific figure, source or finding that has not been supplied, describe the kind of evidence the student should look for instead of fabricating it. Domain knowledge of methods, standards, frameworks and professional practice is welcome — invented subject matter and invented results are not.

                CRITICAL — STYLE MISMATCH: The selected essay style defines the SECTION LAYOUT only, never the subject. If the style does not naturally suit the question's discipline (for example a Lab / Experimental Report requested for a literary or historical question), keep the student's own topic and adapt the PURPOSE of each heading to the material available — Method becomes how the text or sources were selected and analysed, Results becomes the evidence found in them, Discussion becomes its interpretation. Populate every heading from the supplied question. Do NOT substitute a different topic, and do NOT invent a study, dataset or participants to satisfy an empirical heading.

                Analyse the essay question and its accompanying details at the top of this prompt to produce a detailed essay structure. The essay's total word count is ${p.wordCount} words.
                The essay structure must follow the ${p.essayStyle} format with the following H1 level headings: ${headingList}. Within these H1 headings, create a hierarchical structure using H2 and H3 level headings as appropriate to logically organise the response to the essay question.
                After each heading and subheading (H1, H2, and H3), provide an approximate word count in parenthesis, for example: (Approx. 300-350 words). The 'References' section and any 'Appendices' section must NOT have a word count.
                The essay's total is a HARD BUDGET of ${p.wordCount} words. Counting convention: a heading's word count is the TOTAL for that whole section INCLUDING all of its subheadings, so an H1's count must equal the sum of its H2s, and an H2's count must equal the sum of its H3s. Never double-count a parent and its children.
                Before you finish, add up the word counts of the content H1 sections ONLY (exclude References and Appendices) and check that the total falls within 7.5% of ${p.wordCount} — neither above nor below. Share the budget out in proportion to each section's importance in answering the question, and allocate no more than 40% of the total to any single section unless the question genuinely demands it. The word counts shown in the worked example below are illustrative of FORMAT only and are NOT sized to this essay — do not reuse, average or scale them.
                Under each heading and subheading, provide brief bullet points or a short paragraph outlining the key points, arguments, and evidence to be discussed in that section. These points should directly address the details provided with the essay question.

                CRITICAL: Every H1 and H2 section MUST contain substantive content. NEVER leave a section empty or with only a heading and no bullet points. If a section has subheadings, the parent section itself must still have its own introductory bullet points before the subheadings begin. A section with only subheadings and no content of its own is not acceptable.
                ${hasReferences ? `CRITICAL: The 'References' section MUST contain content. It must not be empty. If you cannot provide specific book titles or journal articles, then list the types of sources, databases, or categories of academic material the student should consult (e.g., peer-reviewed journal articles, government reports and white papers, academic commentaries, case law databases, etc.). Never leave the References section blank.` : `This style has no 'References' section — do not add one, and do not invent citations. Any sources or reading you recommend belong inside the relevant content section.`}

                CRITICAL: Tag each bullet point with its depth level using brackets at the start:
                - [D] = Descriptive (states what something is, defines a concept, reports a fact)
                - [A] = Analytical (examines why, compares, contrasts, identifies relationships, applies theory)
                - [E] = Evaluative (judges strength/weakness, weighs competing views, assesses significance, draws implications)
                Every section MUST contain at least 2 [A] or [E] tagged points. Sections with only [D] points are not acceptable. Aim for a mix across all three levels.
                Keep every tagged point as a bullet point. H2 and H3 headings are for thematic subsections only — never turn an individual [D] / [A] / [E] / [Why:] / [Counter:] point into a heading.

                CRITICAL: For each major claim or thesis point, the bullet points MUST include the strongest counter-argument or opposing view. Label it with [Counter:]. For example: "[Counter:] Critics of this position argue the opposite — the essay must then state how it answers them."

                CRITICAL: For each H1 section, the first bullet point MUST be a "[Why:]" line that explains why this section is essential to answering the essay question. This helps the student understand the purpose of each section.

                CRITICAL FORMATTING REQUIREMENTS:
                - Use single hash (#) ONLY for the H1 sections: ${headingList}
                - Use double hash (##) for H2 subsections
                - Use triple hash (###) for H3 sub-subsections
                - Each heading must start on a new line and be followed by a space
                - After each heading, include the approximate word count in parentheses, for example: "## Background (Approx. 300-350 words)"
                - Do not combine different heading levels on the same line
                - Under each heading, provide brief bullet points or a short paragraph outlining key points
                - IMPORTANT: H2 headings must be nested within their parent H1 headings, and H3 headings must be nested within their parent H2 headings
                - CRITICAL: When an H2 heading has child headings, those children must be H3 headings, not H2 headings
                - VERY IMPORTANT: The heading structure must follow this exact hierarchy:
                  * H1 headings (#) are the main sections: ${headingList}
                  * H2 headings (##) are subsections of H1 headings
                  * H3 headings (###) are subsections of H2 headings
                  * Never skip levels (no H1 directly followed by H3)
                  * Never have H2 headings as direct children of other H2 headings

                Here is an illustrative example of the required output LAYOUT. It shows the FORM only: nested H1 / H2 / H3 section headings, the approximate word count after each heading, and the [D] / [A] / [E] / [Why:] / [Counter:] tags applied to the individual bullet points. Its subject matter is a generic illustration that will NOT match the essay question at the top of this prompt, and its particular sections are not a required structure. Do NOT copy its sections, titles or arguments — derive every section, subheading and bullet point from the essay question and the details supplied at the top of this prompt, applying this layout and tagging pattern to the student's own content.

                # ${(p.headings || DEFAULT_HEADINGS)[2] || 'Main Body'} (Approx. ${ex.h1} words)

                [Why:] This section tests the core analytical skill of applying constitutional theory to real institutional arrangements.

                ## Section 1: Core Concepts (Approx. ${ex.h2a} words)

                [D] Define Montesquieu's triadic model of separated powers.
                [A] Compare this ideal with Bagehot's observation of fused powers in the UK Cabinet system.
                [E] Evaluate whether the UK's uncodified constitution makes strict separation impossible or merely different.

                ### Subsection 1.1: Key Definitions (Approx. ${ex.h3a} words)
                [D] Define parliamentary sovereignty and the rule of law as foundational principles.
                [A] Explain how these principles interact with — and sometimes contradict — the separation of powers.
                [Counter:] Critics argue that parliamentary sovereignty nullifies any meaningful separation of powers entirely.

                ## Section 2: Case Studies (Approx. ${ex.h2b} words)

                [D] Outline the key facts of Miller (No. 1) and Miller (No. 2).
                [A] Analyse how the Supreme Court's decisions policed the boundaries between executive and legislative power.
                [E] Assess whether these cases strengthen or weaken the case for a UK separation of powers.

                ### Subsection 2.1: The First Case (Approx. ${ex.h3b} words)
                [D] Summarise the constitutional issues raised by the Article 50 notification.
                [A] Contrast the government's position (prerogative power) with the Court's finding (parliamentary authority).
                [E] Judge the significance of this decision for the separation of powers doctrine.

                Everything you need is in the essay question and details at the top of this prompt. Answer those; use the material above for FORM only.
            `;
}

/**
 * Build a JSON-mode prompt that asks Gemini for structured output.
 * @param {Object} p — same params as buildMarkdownPrompt
 * @returns {{ contents: Array, generationConfig: Object }}
 */
function buildJsonPrompt(p) {
    const headingList = (p.headings || DEFAULT_HEADINGS).map(h => h.split(' (')[0]);

    const systemInstruction = `You are an expert essay breakdown assistant. You MUST respond with valid JSON only, no markdown, no explanation. Generate a structured essay breakdown following this exact JSON schema:
{
  "sections": [
    {
      "heading": "string (H1 title)",
      "wordCount": "string (e.g. '300-400 words')",
      "points": ["string (bullet point)"],
      "subSections": [
        {
          "heading": "string (H2 title)",
          "wordCount": "string",
          "points": ["string"],
          "subSubSections": [
            {
              "heading": "string (H3 title)",
              "wordCount": "string",
              "points": ["string"]
            }
          ]
        }
      ]
    }
  ]
}

Rules:
- The H1 headings MUST be exactly: ${headingList.join(', ')}
- Do NOT write full essay paragraphs. Each section should have bullet-point outlines.
- Use UK localisation (British English).
- The total word count across all sections should be approximately ${p.wordCount} words.
- The 'References' section should NOT have a word count.`;

    const userPrompt = `Essay Question: "${p.essayQuestion}"

Details to include:
"${p.detailedInstructions}"

${p.markingSheet ? `Marking Sheet Criteria:\n"${p.markingSheet}"` : ''}

Generate a structured essay breakdown in the JSON format specified.`;

    return {
        systemInstruction: { role: 'system', parts: [{ text: systemInstruction }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }]
    };
}
