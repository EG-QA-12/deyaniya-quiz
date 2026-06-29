import React from 'react';

interface CategoryIconProps {
  name: string;
  size?: number;
}

// SVG-иконки для категорий 1-го раунда в библейском стиле
const icons: Record<string, React.ReactNode> = {
  'Адреса и города': (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Древняя карта */}
      <rect x="20" y="20" width="160" height="160" rx="8" fill="#1a1a2e" stroke="#c9a84c" strokeWidth="2"/>
      {/* Контур земли */}
      <path d="M40 100 Q60 60 80 80 Q100 50 120 70 Q140 40 160 60" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M40 100 Q60 120 80 110 Q100 130 120 120 Q140 140 160 130" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.6"/>
      {/* Города */}
      <circle cx="60" cy="80" r="4" fill="#c9a84c"/>
      <text x="60" y="72" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="serif">Иер.</text>
      <circle cx="100" cy="70" r="4" fill="#c9a84c"/>
      <text x="100" y="62" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="serif">Ант.</text>
      <circle cx="140" cy="60" r="4" fill="#c9a84c"/>
      <text x="140" y="52" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="serif">Рим</text>
      {/* Компас */}
      <circle cx="160" cy="170" r="12" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.5"/>
      <line x1="160" y1="160" x2="160" y2="180" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
      <line x1="150" y1="170" x2="170" y2="170" stroke="#c9a84c" strokeWidth="1" opacity="0.5"/>
      <text x="160" y="157" textAnchor="middle" fill="#c9a84c" fontSize="6" opacity="0.5">N</text>
    </svg>
  ),
  'Кто этот человек?': (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Силуэт апостола */}
      <rect x="20" y="20" width="160" height="160" rx="8" fill="#1a1a2e" stroke="#c9a84c" strokeWidth="2"/>
      {/* Нимб */}
      <circle cx="100" cy="70" r="30" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <circle cx="100" cy="70" r="28" stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity="0.2"/>
      {/* Голова */}
      <ellipse cx="100" cy="70" rx="14" ry="16" fill="#c9a84c" opacity="0.3"/>
      {/* Тело в одеянии */}
      <path d="M80 90 L70 160 L130 160 L120 90 Z" fill="#c9a84c" opacity="0.2" stroke="#c9a84c" strokeWidth="1"/>
      {/* Свиток в руке */}
      <rect x="115" y="100" width="6" height="30" rx="2" fill="#c9a84c" opacity="0.4" transform="rotate(15, 118, 115)"/>
      {/* Крест */}
      <line x1="100" y1="30" x2="100" y2="50" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
      <line x1="90" y1="40" x2="110" y2="40" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
    </svg>
  ),
  'Цифры': (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Свиток с цифрами */}
      <rect x="20" y="20" width="160" height="160" rx="8" fill="#1a1a2e" stroke="#c9a84c" strokeWidth="2"/>
      {/* Свиток */}
      <rect x="40" y="40" width="120" height="120" rx="4" fill="#2a1a0e" stroke="#c9a84c" strokeWidth="1.5"/>
      {/* Верхний валик */}
      <rect x="35" y="35" width="130" height="8" rx="4" fill="#c9a84c" opacity="0.6"/>
      {/* Нижний валик */}
      <rect x="35" y="157" width="130" height="8" rx="4" fill="#c9a84c" opacity="0.6"/>
      {/* Цифры */}
      <text x="100" y="75" textAnchor="middle" fill="#c9a84c" fontSize="18" fontFamily="serif" fontWeight="bold">100</text>
      <text x="100" y="100" textAnchor="middle" fill="#c9a84c" fontSize="18" fontFamily="serif" fontWeight="bold">200</text>
      <text x="100" y="125" textAnchor="middle" fill="#c9a84c" fontSize="18" fontFamily="serif" fontWeight="bold">500</text>
      {/* Декоративные линии */}
      <line x1="60" y1="82" x2="140" y2="82" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3"/>
      <line x1="60" y1="107" x2="140" y2="107" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  ),
  'Чудеса и знамения': (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Свет с небес */}
      <rect x="20" y="20" width="160" height="160" rx="8" fill="#1a1a2e" stroke="#c9a84c" strokeWidth="2"/>
      {/* Лучи света */}
      <line x1="100" y1="20" x2="60" y2="100" stroke="#c9a84c" strokeWidth="1.5" opacity="0.4"/>
      <line x1="100" y1="20" x2="80" y2="100" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5"/>
      <line x1="100" y1="20" x2="100" y2="100" stroke="#c9a84c" strokeWidth="2" opacity="0.6"/>
      <line x1="100" y1="20" x2="120" y2="100" stroke="#c9a84c" strokeWidth="1.5" opacity="0.5"/>
      <line x1="100" y1="20" x2="140" y2="100" stroke="#c9a84c" strokeWidth="1.5" opacity="0.4"/>
      {/* Источник света */}
      <circle cx="100" cy="30" r="12" fill="#c9a84c" opacity="0.3"/>
      <circle cx="100" cy="30" r="8" fill="#c9a84c" opacity="0.5"/>
      <circle cx="100" cy="30" r="4" fill="#c9a84c" opacity="0.8"/>
      {/* Звёзды */}
      <circle cx="50" cy="40" r="1.5" fill="#c9a84c" opacity="0.4"/>
      <circle cx="150" cy="35" r="1.5" fill="#c9a84c" opacity="0.4"/>
      <circle cx="70" cy="25" r="1" fill="#c9a84c" opacity="0.3"/>
      <circle cx="130" cy="28" r="1" fill="#c9a84c" opacity="0.3"/>
      {/* Земля внизу */}
      <path d="M40 160 Q60 150 80 155 Q100 145 120 155 Q140 150 160 160" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.3"/>
    </svg>
  ),
  'Угадай цитату': (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Развёрнутый свиток */}
      <rect x="20" y="20" width="160" height="160" rx="8" fill="#1a1a2e" stroke="#c9a84c" strokeWidth="2"/>
      {/* Свиток */}
      <path d="M30 50 Q100 40 170 50 L170 150 Q100 160 30 150 Z" fill="#2a1a0e" stroke="#c9a84c" strokeWidth="1.5"/>
      {/* Верхний валик */}
      <rect x="25" y="45" width="150" height="10" rx="5" fill="#c9a84c" opacity="0.5"/>
      {/* Нижний валик */}
      <rect x="25" y="145" width="150" height="10" rx="5" fill="#c9a84c" opacity="0.5"/>
      {/* Текст */}
      <text x="100" y="85" textAnchor="middle" fill="#c9a84c" fontSize="9" fontFamily="serif" opacity="0.8">«И будете Мне</text>
      <text x="100" y="100" textAnchor="middle" fill="#c9a84c" fontSize="9" fontFamily="serif" opacity="0.8">свидетелями...»</text>
      <text x="100" y="120" textAnchor="middle" fill="#c9a84c" fontSize="7" fontFamily="serif" opacity="0.4">Деян. 1:8</text>
      {/* Кавычка */}
      <text x="45" y="80" fill="#c9a84c" fontSize="20" fontFamily="serif" opacity="0.3">«</text>
    </svg>
  ),
  'Дела церкви': (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Голубь — символ Святого Духа */}
      <rect x="20" y="20" width="160" height="160" rx="8" fill="#1a1a2e" stroke="#c9a84c" strokeWidth="2"/>
      {/* Голубь */}
      <g transform="translate(100, 90)">
        {/* Тело */}
        <ellipse cx="0" cy="0" rx="25" ry="15" fill="#c9a84c" opacity="0.3" stroke="#c9a84c" strokeWidth="1.5"/>
        {/* Крылья */}
        <path d="M-15 -5 Q-30 -25 -5 -20 Q5 -18 0 -5" fill="#c9a84c" opacity="0.2" stroke="#c9a84c" strokeWidth="1"/>
        <path d="M15 -5 Q30 -25 5 -20 Q-5 -18 0 -5" fill="#c9a84c" opacity="0.2" stroke="#c9a84c" strokeWidth="1"/>
        {/* Голова */}
        <circle cx="20" cy="-5" r="8" fill="#c9a84c" opacity="0.3" stroke="#c9a84c" strokeWidth="1"/>
        {/* Клюв */}
        <polygon points="28,-5 35,-3 28,-1" fill="#c9a84c" opacity="0.5"/>
        {/* Оливковая ветвь */}
        <path d="M25 5 Q35 10 40 15" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.6"/>
        <ellipse cx="40" cy="15" rx="4" ry="2" fill="#c9a84c" opacity="0.4"/>
        <ellipse cx="35" cy="10" rx="3" ry="2" fill="#c9a84c" opacity="0.4"/>
      </g>
      {/* Нимб над голубем */}
      <circle cx="100" cy="65" r="20" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.3"/>
      {/* Пламя (Пятидесятница) */}
      <path d="M85 130 Q90 120 95 130 Q100 115 105 130 Q110 120 115 130" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.4"/>
    </svg>
  ),
  'Друг или враг? — КОТ В МЕШКЕ': (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Кот в мешке — таинственный сундук */}
      <rect x="20" y="20" width="160" height="160" rx="8" fill="#1a1a2e" stroke="#c9a84c" strokeWidth="2"/>
      {/* Сундук */}
      <rect x="40" y="80" width="120" height="80" rx="4" fill="#2a1a0e" stroke="#c9a84c" strokeWidth="2"/>
      {/* Крышка */}
      <path d="M35 80 Q100 60 165 80" stroke="#c9a84c" strokeWidth="2" fill="none"/>
      {/* Замок */}
      <rect x="90" y="100" width="20" height="15" rx="3" fill="#c9a84c" opacity="0.5"/>
      <circle cx="100" cy="108" r="3" fill="#1a1a2e" stroke="#c9a84c" strokeWidth="1"/>
      {/* Вопросительный знак */}
      <text x="100" y="65" textAnchor="middle" fill="#c9a84c" fontSize="40" fontFamily="serif" fontWeight="bold" opacity="0.8">?</text>
      {/* Свечение */}
      <circle cx="100" cy="55" r="35" stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity="0.2"/>
      {/* Декоративные линии на сундуке */}
      <line x1="50" y1="110" x2="150" y2="110" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3"/>
      <line x1="50" y1="130" x2="150" y2="130" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  ),
};

export function CategoryIcon({ name, size = 48 }: CategoryIconProps) {
  const icon = icons[name];
  if (!icon) {
    // Fallback — просто буква
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          background: '#1a1a2e',
          border: '1px solid #c9a84c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c9a84c',
          fontSize: size * 0.4,
          fontWeight: 'bold',
          fontFamily: 'serif',
        }}
      >
        {name[0]}
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size }}>
      {React.cloneElement(icon as React.ReactElement, {
        width: size,
        height: size,
      })}
    </div>
  );
}
