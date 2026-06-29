interface CategoryIconProps {
  name: string;
  size?: number;
}

// Маппинг названий категорий на имена файлов
const iconMap: Record<string, string> = {
  'Адреса и города': 'adresa-i-goroda',
  'Кто этот человек?': 'kto-eto-chelovek',
  'Цифры': 'cifry',
  'Чудеса и знамения': 'chudesa-i-znameniya',
  'Угадай цитату': 'ugadaj-citatu',
  'Дела церкви': 'dela-cerkvi',
  'Друг или враг? — КОТ В МЕШКЕ': 'kot-v-meshke',
  'География миссии': 'adresa-i-goroda',
  'День Пятидесятницы': 'chudesa-i-znameniya',
  'Персонажи власти': 'kto-eto-chelovek',
  'Заверши событие': 'ugadaj-citatu',
  'Пророки и Писания': 'cifry',
  'Тюрьмы и побеги': 'kot-v-meshke',
  'КОТ В МЕШКЕ': 'kot-v-meshke',
  'Богословие в действии': 'dela-cerkvi',
  'Миссионерские путешествия': 'adresa-i-goroda',
  'Первые и единственные': 'cifry',
  'Неожиданные повороты': 'kot-v-meshke',
  'Молниеносный раунд': 'chudesa-i-znameniya',
  'Свяжи события': 'ugadaj-citatu',
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
