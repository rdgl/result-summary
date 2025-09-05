async function initSummary() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error('Failed to load data.json: ' + res.status);
    const data = await res.json();

    const list = document.getElementById('categories');
    if (!list) return;

    // Clear any existing items
    list.innerHTML = '';

    let total = 0;
    data.forEach(item => {
      const { category, score, icon } = item;
      total += score;
      const li = document.createElement('li');
      li.className = `category ${category.toLowerCase()}`;
      li.innerHTML = `
        <div class="label">
          <img class="icon" src="${icon.replace('./','')}" alt="" />
          <span class="name">${category}</span>
        </div>
        <div class="marks" aria-label="${score} out of 100">
          <span class="value">${score}</span>
          <span class="slash">/</span>
          <span class="total">100</span>
        </div>`;
      list.appendChild(li);
    });

    // Update main score (average rounded) if element exists
    const scoreValue = document.querySelector('.score-value');
    if (scoreValue && data.length) {
      const avg = Math.round(total / data.length);
      scoreValue.textContent = avg;
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', initSummary);
