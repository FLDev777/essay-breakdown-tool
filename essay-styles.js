// Essay style definitions — shared between index.html and breakdown.html
// Load via <script src="essay-styles.js"></script> before the code that references `essayStyles`

const essayStyles = [
    {
        name: "Standard Essay",
        description: "Present a focused, evidence-based argument that answers a set question and demonstrates critical engagement with published sources.",
        headings: [
            "Abstract (concise summary of aim, thesis, route, conclusion)",
            "Introduction (context, question, thesis, sign-post)",
            "Main Body (themed, claim-evidence-analysis paragraphs)",
            "Conclusion (synthesis, wider implications, no new data)",
            "References (single alphabetised list in mandated style)"
        ]
    },
    {
        name: "Reflective Essay (Pure Experiential Reflection)",
        description: "Critically explore a personal / professional experience for growth and behavioural change, using internal evidence (your own feelings, actions and outcomes). Sections follow Gibbs' Reflective Cycle; Driscoll's \"What? / So What? / Now What?\" and Kolb's cycle are equally valid alternatives.",
        headings: [
            "Introduction (purpose, scope, learning aim, chosen reflective framework)",
            "Description – What Happened (objective and chronological, no analysis)",
            "Feelings – What Were You Thinking and Feeling?",
            "Evaluation – What Was Good and What Was Bad?",
            "Analysis – Making Sense of the Experience",
            "Conclusion – What Else Could You Have Done?",
            "Action Plan – What Will You Do Differently Next Time?",
            "References"
        ]
    },
    {
        name: "Reflective Essay (Academic / Theoretical Reflection)",
        description: "Bridge real-world experience with published theory: validate and evaluate your practice against academic evidence. Sections follow PEEL-R (Point, Evidence, Explanation, Link, Reflection); Schön's reflection-in-action vs reflection-on-action and an integrated Gibbs structure are equally valid alternatives.",
        headings: [
            "Introduction (purpose, scope, thesis / learning aim, theoretical framework chosen)",
            "Description of the Experience (brief, chronological, factual)",
            "Theoretical Framework (models selected – e.g. Gibbs, Schön, PEEL-R)",
            "Analysis – Point, Evidence, Explanation (literature applied to the experience)",
            "Link – Connecting Theory to Your Specific Practice",
            "Reflection – What the Theory Reveals About Your Practice",
            "Conclusion – Evidence-Based Lessons Learnt",
            "Action Plan – Specific, Evidence-Based Steps for Future Practice",
            "References"
        ]
    },
    {
        name: "Literature Review",
        description: "Map, critique and synthesise the existing research on a narrow topic to identify gaps your study will fill.",
        headings: [
            "Introduction (topic rationale, review question, objectives)",
            "Search Strategy (databases, keywords, inclusion / exclusion criteria)",
            "Thematic Review of the Literature (sub-headed by themes, not by authors)",
            "Critical Discussion / Synthesis (compare methods, findings, theoretical lenses)",
            "Identification of Gap(s) & Significance",
            "Conclusion (summary + how the gap justifies further research)",
            "References"
        ]
    },
    {
        name: "Persuasive / Viewpoint Essay",
        description: "Construct a sustained, rhetorical argument taking a clear stance on a contemporary social issue or prompt.",
        headings: [
            "Headline / Title (engaging, memorable statement of intent)",
            "Introduction (hook, context, core thesis / viewpoint)",
            "Body Paragraphs (counter-argument rebuttal, evidence, rhetorical devices)",
            "Climax Paragraph (call to action, moral imperative, emotional peak)",
            "Conclusion (summary of position, memorable closing thought)"
        ]
    },
    {
        name: "Transactional Writing",
        description: "Adapt a viewpoint or argument into a specific real-world format tailored to audience and purpose.",
        headings: [
            "Header / Address Block (formal letter addresses, article title/subheadings, speech greeting, leaflet panels)",
            "Opening / Hook (establish context, purpose for writing, tone setting)",
            "Structured Development (bullet points, clear paragraphs, persuasive devices)",
            "Audience Engagement (direct address, rhetorical questions, tailored register)",
            "Sign-off / Resolution (call to action, formal valediction or closing statement)"
        ]
    },
    {
        name: "Descriptive Writing",
        description: "Craft immersive, sensory-driven prose focused on setting, atmosphere, or character without relying on a plot.",
        headings: [
            "Opening / Wide Shot (establishing setting, dominant atmosphere, mood)",
            "Sensory Zoom-In (focus on specific physical details, textures, sounds, light)",
            "Shift in Perspective or Time (change in focus, movement, atmospheric shift)",
            "Micro Detail (close focus on a symbolic object or minute movement)",
            "Final Framing (return to overall scene with altered mood or lingering image)"
        ]
    },
    {
        name: "Narrative Writing",
        description: "Develop a structured fictional narrative focusing on character, conflict, tension, and resolution.",
        headings: [
            "Exposition / Drop into Action (character, setting, immediate tension)",
            "Inciting Incident / Rising Action (complication, building stakes)",
            "Climax / Turning Point (peak tension, confrontation, key decision)",
            "Falling Action (immediate aftermath, impact of climax)",
            "Resolution / Reflection (changed status quo, resonance)"
        ]
    },
    {
        name: "Literary Analysis Essay",
        description: "Evaluate how an author uses language, structure, and historical/social context to convey themes in prose, drama, or poetry.",
        headings: [
            "Introduction (author, text title, core theme, thesis statement)",
            "Concept Paragraph 1 (focus on key quote / method at start of text)",
            "Concept Paragraph 2 (development of theme, structural shift, contextual links)",
            "Concept Paragraph 3 (climax of theme, alternative interpretation, language zoom-in)",
            "Conclusion (authorial message, moral intention, thematic takeaway)"
        ]
    },
    {
        name: "Comparative Essay",
        description: "Synthesise two texts side-by-side to analyze similarities and differences in perspective, language, and technique.",
        headings: [
            "Introduction (introduce both texts, core thematic link, comparative thesis)",
            "Comparative Point 1 (Point-Evidence-Analysis for Text A, linked directly to Text B)",
            "Comparative Point 2 (Point-Evidence-Analysis for Text B, contrasting or aligning with Text A)",
            "Comparative Point 3 (methods, structure, or contextual contrasts across both texts)",
            "Conclusion (synthesis of key findings, overall evaluation of authorial approaches)"
        ]
    },
    {
        name: "Research Proposal",
        description: "Convince a reader that your planned study is original, feasible and ethically sound.",
        headings: [
            "Title Page & Working Title",
            "Abstract / Executive Summary",
            "Introduction & Rationale (inc. research problem)",
            "Literature Review (brief, focused)",
            "Aims & Research Question(s) / Hypotheses",
            "Methodology (approach, design, participants, instruments, procedure)",
            "Data Analysis Plan",
            "Ethical Considerations & Risk Assessment",
            "Timeline / Gantt Chart",
            "References"
        ]
    },
    {
        name: "Lab / Experimental Report",
        description: "Document an experiment so it could be replicated and its findings evaluated.",
        headings: [
            "Abstract",
            "Introduction (background, theoretical context, hypotheses)",
            "Method (participants, materials, design, procedure)",
            "Results (descriptive & inferential stats, tables / figures)",
            "Discussion (interpret findings, compare to past studies, limitations)",
            "Conclusion (brief practical or theoretical implications)",
            "References",
            "Appendices (raw data, calculations, ethics form)"
        ]
    },
    {
        name: "Case-Study Analysis",
        description: "Apply relevant theories to a real-world entity, event or patient to diagnose problems and recommend evidence-based solutions.",
        headings: [
            "Introduction (outline the case, state aims)",
            "Case Description (concise facts, context, stakeholders)",
            "Problem Identification / Diagnosis (main issues, priorities)",
            "Theoretical Framework (models or legal principles used)",
            "Analysis (systematically apply theory to each issue)",
            "Options & Recommendations (costed, ethical, feasible)",
            "Implementation Plan (who, when, how, KPIs)",
            "Conclusion",
            "References",
            "Appendices (financials, SWOT, PESTLE, etc.)"
        ]
    }
];