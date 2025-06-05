const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const charCountNoSpaces = document.getElementById('charCountNoSpaces');
const sentenceCount = document.getElementById('sentenceCount');
const copyBtn = document.getElementById('copyBtn');
const resetBtn = document.getElementById('resetBtn');
const toast = document.getElementById('toast');

function updateCounts() {
  const text = textInput.value;

  // Word count
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  wordCount.textContent = words;

  // Character count (with spaces)
  charCount.textContent = text.length;

  // Character count (without spaces)
  charCountNoSpaces.textContent = text.replace(/\s/g, '').length;

  // Sentence count
  const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  sentenceCount.textContent = sentences;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

textInput.addEventListener('input', updateCounts);
textInput.addEventListener('paste', () => {
  setTimeout(updateCounts, 10);
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(textInput.value);
    showToast('Text copied to clipboard!');
  } catch (err) {
    textInput.select();
    document.execCommand('copy');
    showToast('Text copied to clipboard!');
  }
});

resetBtn.addEventListener('click', () => {
  textInput.value = '';
  updateCounts();
  textInput.focus();
  showToast('Text cleared!');
});

updateCounts();
textInput.focus();
