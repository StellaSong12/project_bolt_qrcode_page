import { diffLines, Change } from 'diff';

export interface DiffResult {
  type: 'add' | 'remove' | 'equal';
  value: string;
  lineNumber: {
    old?: number;
    new?: number;
  };
  isContext?: boolean;
  isCollapsible?: boolean;
  sectionId?: string;
  hiddenLines?: DiffResult[];
}

const CONTEXT_LINES = 3;
const MIN_COLLAPSE_LINES = 8;

export function computeTextDiff(text1: string, text2: string): DiffResult[] {
  const changes = diffLines(text1, text2);
  const result: DiffResult[] = [];
  
  let oldLineNumber = 1;
  let newLineNumber = 1;
  
  // First pass: Create diff results with line numbers
  changes.forEach((change: Change) => {
    const lines = change.value.split('\n').filter(line => line !== '');
    
    lines.forEach(line => {
      const diffResult: DiffResult = {
        type: change.added ? 'add' : change.removed ? 'remove' : 'equal',
        value: line,
        lineNumber: {}
      };

      if (!change.added) {
        diffResult.lineNumber.old = oldLineNumber++;
      }
      if (!change.removed) {
        diffResult.lineNumber.new = newLineNumber++;
      }

      result.push(diffResult);
    });
  });

  // Second pass: Add context and collapse unchanged sections
  const finalResult: DiffResult[] = [];
  let currentEqualSection: DiffResult[] = [];
  let lastChangeIndex = -1;

  for (let i = 0; i < result.length; i++) {
    const diff = result[i];

    if (diff.type !== 'equal') {
      // Process any accumulated equal lines before a change
      if (currentEqualSection.length > 0) {
        if (currentEqualSection.length > MIN_COLLAPSE_LINES) {
          // Add context before
          const contextBefore = currentEqualSection.slice(0, CONTEXT_LINES);
          finalResult.push(...contextBefore.map(d => ({ ...d, isContext: true })));

          // Add collapsible section
          const hiddenLines = currentEqualSection.slice(CONTEXT_LINES, -CONTEXT_LINES);
          if (hiddenLines.length > 0) {
            const sectionId = `section-${i}`;
            finalResult.push({
              type: 'equal',
              value: `${hiddenLines.length} identical lines`,
              lineNumber: {},
              isCollapsible: true,
              sectionId,
              hiddenLines,
              isContext: true
            });
          }

          // Add context after
          const contextAfter = currentEqualSection.slice(-CONTEXT_LINES);
          finalResult.push(...contextAfter.map(d => ({ ...d, isContext: true })));
        } else {
          // If the section is small enough, include all lines
          finalResult.push(...currentEqualSection.map(d => ({ ...d, isContext: true })));
        }
        currentEqualSection = [];
      }

      finalResult.push(diff);
      lastChangeIndex = finalResult.length - 1;
    } else {
      currentEqualSection.push(diff);
    }
  }

  // Handle any remaining equal lines at the end
  if (currentEqualSection.length > 0) {
    if (currentEqualSection.length > MIN_COLLAPSE_LINES) {
      const contextBefore = currentEqualSection.slice(0, CONTEXT_LINES);
      finalResult.push(...contextBefore.map(d => ({ ...d, isContext: true })));

      const hiddenLines = currentEqualSection.slice(CONTEXT_LINES, -CONTEXT_LINES);
      if (hiddenLines.length > 0) {
        const sectionId = 'section-end';
        finalResult.push({
          type: 'equal',
          value: `${hiddenLines.length} identical lines`,
          lineNumber: {},
          isCollapsible: true,
          sectionId,
          hiddenLines,
          isContext: true
        });
      }

      const contextAfter = currentEqualSection.slice(-CONTEXT_LINES);
      finalResult.push(...contextAfter.map(d => ({ ...d, isContext: true })));
    } else {
      finalResult.push(...currentEqualSection.map(d => ({ ...d, isContext: true })));
    }
  }

  return finalResult;
}