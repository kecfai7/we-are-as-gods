import katex from 'katex';

/**
 * Safely render LaTeX string using KaTeX
 * Handles inline $...$ and block $$...$$ within text
 */
export function renderLatexInText(text) {
  if (!text || typeof text !== 'string') return text;

  // 1. First replace block math $$...$$
  let result = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
    try {
      return katex.renderToString(cleanLatex(formula), {
        displayMode: true,
        throwOnError: false
      });
    } catch (e) {
      return match;
    }
  });

  // 2. Then replace inline math $...$
  result = result.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
    try {
      return katex.renderToString(cleanLatex(formula), {
        displayMode: false,
        throwOnError: false
      });
    } catch (e) {
      return match;
    }
  });

  // 3. Convert markdown bold **text** to <strong>
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #FFFFFF; font-weight: 700;">$1</strong>');

  return result;
}

/**
 * Clean up common escaped LaTeX artifacts (e.g. broken tabs, carriage returns)
 */
export function cleanLatex(latexStr) {
  if (!latexStr || typeof latexStr !== 'string') return '';
  return latexStr
    .replace(/\r\n/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Render standalone formula for MATHEMATICAL MODEL box
 */
export function renderFormulaBox(formulaStr) {
  if (!formulaStr || typeof formulaStr !== 'string') return '';
  try {
    const clean = cleanLatex(formulaStr.replace(/^\$\$|\$\$$/g, '').replace(/^\$|\$$/g, ''));
    return katex.renderToString(clean, {
      displayMode: true,
      throwOnError: false
    });
  } catch (e) {
    return formulaStr;
  }
}
