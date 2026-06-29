interface CategoryIconProps {
  name: string;
  size?: number;
}

// Маппинг названий категорий на имена файлов
const iconMap: Record<string, string> = {
  // Раунд 1 — оригинальные
  'Адреса и города': 'adresa-i-goroda',
  'Кто этот человек?': 'kto-eto-chelovek',
  'Цифры': 'cifry',
  'Чудеса и знамения': 'chudesa-i-znameniya',
  'Угадай цитату': 'ugadaj-citatu',
  'Дела церкви': 'dela-cerkvi',
  'Друг или враг? — КОТ В МЕШКЕ': 'kot-v-meshke',

  // Раунд 2
  'География миссии': 'adresa-i-goroda',          // совпадает
  'День Пятидесятницы': 'chudesa-i-znameniya',     // совпадает
  'Персонажи власти': 'personazhi-vlasti',         // новая
  'Заверши событие': 'zavershi-sobytie',           // новая
  'Пророки и Писания': 'proroki-i-pisaniya',       // новая
  'Тюрьмы и побеги': 'tyurmy-i-pobegi',            // новая
  'КОТ В МЕШКЕ': 'kot-v-meshke',                   // совпадает

  // Раунд 3
  'Богословие в действии': 'bogoslovie-v-dejstvii', // новая
  'Миссионерские путешествия': 'adresa-i-goroda',   // совпадает
  'Первые и единственные': 'pervye-i-edinstvennye',  // новая
  'Неожиданные повороты': 'neozhidannye-povoroty',   // новая
  'Молниеносный раунд': 'molnienosnyj-raund',        // новая
  'Свяжи события': 'svyazi-sobytiya',               // новая
};

export function CategoryIcon({ name, size = 48 }: CategoryIconProps) {
  const fileName = iconMap[name];
  if (!fileName) {
    // Fallback — первая буква
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
    <img
      src={`${import.meta.env.BASE_URL}images/categories/${fileName}.jpg`}
      alt={name}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}
    />
  );
}
