export function renderMarkdown(md: string): string {
  const lines = md.split('\n');
  let html = '';
  let inTable = false;
  let inList = false;
  let inOrdered = false;
  let tableHeader = false;

  const inline = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  };

  const closeList = () => {
    if (inList) {
      html += inOrdered ? '</ol>' : '</ul>';
      inList = false;
      inOrdered = false;
    }
  };

  const closeTable = () => {
    if (inTable) {
      html += '</tbody></table>';
      inTable = false;
      tableHeader = false;
    }
  };

  for (const line of lines) {
    // Headings
    if (line.startsWith('### ')) {
      closeList();
      closeTable();
      html += `<h3>${inline(line.slice(4))}</h3>`;
      continue;
    }
    if (line.startsWith('## ')) {
      closeList();
      closeTable();
      html += `<h2>${inline(line.slice(3))}</h2>`;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      closeList();
      closeTable();
      html += `<blockquote>${inline(line.slice(2))}</blockquote>`;
      continue;
    }

    // Table
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      closeList();
      const cells = line.trim().split('|').slice(1, -1).map((c) => c.trim());

      // Separator row (|---|---|)
      if (cells.every((c) => /^-+$/.test(c))) {
        tableHeader = false;
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableHeader = true;
        html += '<table><thead><tr>';
        cells.forEach((c) => { html += `<th>${inline(c)}</th>`; });
        html += '</tr></thead><tbody>';
        tableHeader = false;
        continue;
      }

      html += '<tr>';
      cells.forEach((c) => { html += `<td>${inline(c)}</td>`; });
      html += '</tr>';
      continue;
    }

    if (inTable && line.trim() === '') {
      closeTable();
      continue;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      closeTable();
      if (!inList || inOrdered) {
        closeList();
        html += '<ul>';
        inList = true;
        inOrdered = false;
      }
      html += `<li>${inline(line.slice(2))}</li>`;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      closeTable();
      if (!inList || !inOrdered) {
        closeList();
        html += '<ol>';
        inList = true;
        inOrdered = true;
      }
      html += `<li>${inline(line.replace(/^\d+\.\s/, ''))}</li>`;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      closeList();
      closeTable();
      continue;
    }

    // Paragraph
    closeList();
    closeTable();
    html += `<p>${inline(line)}</p>`;
  }

  closeList();
  closeTable();
  return html;
}
