// Находим элементы на странице
const hint = document.getElementById('hint');
const path = document.getElementById('line-path');

// Стартовые координаты (центр экрана)
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

// Текущие координаты для плавности (инерции)
let currentX = targetX;
let currentY = targetY;

// --- ОТСЛЕЖИВАНИЕ ДВИЖЕНИЙ ---
// Для компьютера (мышь)
document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    hideHint();
});

// Для iPhone (палец)
document.addEventListener('touchmove', (e) => {
    targetX = e.touches[0].clientX;
    targetY = e.touches[0].clientY;
    hideHint();
}, { passive: true });

// --- АНИМАЦИЯ ЛИНИИ ---
function animateLine() {
    // Плавное приближение текущих координат к целевым (эффект невесомости)
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Строим кривую Безье (Q), которая начинается в левом верхнем углу, 
    // изгибается к нашему пальцу (currentX, currentY) и заканчивается в правом нижнем.
    const d = `M 0 0 Q ${currentX} ${currentY} ${width} ${height}`;
    
    path.setAttribute('d', d);
    
    // Повторяем кадр за кадром
    requestAnimationFrame(animateLine);
}

// --- ЛОГИКА ПОДСКАЗКИ ---
let hintTimeout;

// Скрываем подсказку при взаимодействии
function hideHint() {
    if (hint.style.opacity === '0') return;
    hint.style.opacity = '0';
    
    // Возвращаем подсказку, если пользователь замер на 4 секунды
    clearTimeout(hintTimeout);
    hintTimeout = setTimeout(() => {
        hint.style.opacity = '1';
    }, 4000);
}

// Скрываем при первом касании
document.addEventListener('touchstart', hideHint, { passive: true });
document.addEventListener('mousedown', hideHint);

// Запускаем анимацию линии
animateLine();