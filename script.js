const REPLACE_CHAR_LIST = {
    'ー': '｜', // 縦棒
    '（': '︵', // 縦書き用の括弧
    '）': '︶',
    '「': '﹁',
    '」': '﹂',
    '〈': '︿',
    '〉': '﹀',
    '［': '〚',
    '］': '〛',
    '｛': '︷',
    '｝': '︸',
  }

  function toFullWidth(str) {
    return str.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 0x21 && code <= 0x7E) {
        return String.fromCharCode(code + 0xFEE0);
      }
      return char;
    }).join('');
  }
  
  function charToPush(line, ind) {
    if (line.length <= ind) {
      return '　'
    } else {
      let c = line[ind]
        return REPLACE_CHAR_LIST[c] || toFullWidth(c)
    }
  }
  
  function transposeText(text) {
    const originalLines = text.split("\n")
    const longest_char_number = originalLines.reduce(
        (max, cur) => max < cur.length ? cur.length : max, 0)
    
    const transposed = Array.from({ length: longest_char_number }, () => [])
    originalLines.reverse().forEach((originalLine, lineNum) => {
        for (let i = 0; i < longest_char_number; i++) {
        if (originalLine.length > 0) {
          transposed[i].push(charToPush(originalLine, i))
        }
        if (lineNum < originalLines.length - 1) {
          transposed[i].push('　')
        }
      }
    })
    return transposed.map(line => line.join("")).join("\n")
  }
  
  document.getElementById('converted').value = transposeText(document.getElementById('target').value)
  
  document.getElementById('target').addEventListener("change", function(e) {
    const transposed = transposeText(e.target.value)
      console.log(e.target.value, transposed)
    const convertedArea = document.getElementById("converted")
    convertedArea.value = transposed
  })