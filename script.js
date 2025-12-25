// فالوراز - اسکریپت کامل با Gemini API

const GEMINI_API_KEY = 'AIzaSyCSAwrjw_mffIUnDS01hAJr-h4OkMgbZmU';

async function getGeminiInterpretation(prompt) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'تعبیر آماده نشد، دوباره امتحان کن ✨';
  } catch (err) {
    return 'اتصال مشکل داره، اینترنت رو چک کن.';
  }
}

function getPersianSign(sign) {
  const signs = { aries: 'حمل', taurus: 'ثور', gemini: 'جوزا', cancer: 'سرطان', leo: 'اسد', virgo: 'سنبله', libra: 'میزان', scorpio: 'عقرب', sagittarius: 'قوس', capricorn: 'جدی', aquarius: 'دلو', pisces: 'حوت' };
  return signs[sign] || 'حمل';
}

async function dailyHoroscope() {
  const sign = document.getElementById('daily-sign')?.value || 'aries';
  const result = document.getElementById('daily-result');
  result.innerHTML = '<span class="loading">ستارگان در حال حرف زدن هستن...</span>';

  const prompt = `فال روزانه برج ${getPersianSign(sign)} را به فارسی روان، شاعرانه و پر از انرژی مثبت بنویس. شامل خلق‌وخو، عشق، شغل، مالی، رنگ و عدد شانس و پیام امیدبخش. سبک گرم و دلگرم‌کننده.`;

  const interpretation = await getGeminiInterpretation(prompt);
  result.innerHTML = `<strong>فال امروز برج \( {getPersianSign(sign)}:</strong><br><br> \){interpretation}`;
}

async function submitCoffee() {
  const description = document.getElementById('coffee-description')?.value.trim();
  const result = document.getElementById('coffee-result');
  if (!description) {
    result.innerHTML = 'شکل‌ها رو توصیف کن رفیق ☕';
    return;
  }
  result.innerHTML = '<span class="loading">فنجون داره راز فاش می‌کنه...</span>';

  const prompt = `تعبیر فال قهوه با شکل‌های: "${description}". فارسی روان، شاعرانه، بسیار مثبت و امیدبخش. معنی شکل‌ها، پیشگویی، پیشنهاد انرژی مثبت و پیام نهایی دلگرم‌کننده.`;

  const interpretation = await getGeminiInterpretation(prompt);
  result.innerHTML = `<strong>تعبیر فال قهوه:</strong><br><br>${interpretation}`;
}

// دارک/لایت + swipe (همون قبلی)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
  }
}

// swipe کد قبلی رو نگه دار
