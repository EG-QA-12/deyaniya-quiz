import type { CategoryData } from './types';

export const round1: CategoryData[] = [
  {
    name: 'Адреса и города',
    icon: '🗺️',
    questions: [
      {
        id: 'r1-c1-100', round: 1, category: 'Адреса и города', categoryIcon: '🗺️', value: 100,
        text: 'В каком городе в день Пятидесятницы сошёл Дух Святой?',
        answer: 'Иерусалим (Деян. 2:1)', isCatInBag: false,
      },
      {
        id: 'r1-c1-200', round: 1, category: 'Адреса и города', categoryIcon: '🗺️', value: 200,
        text: 'В каком городе ученики впервые были названы «христианами»?',
        answer: 'Антиохия (Деян. 11:26)', isCatInBag: false,
      },
      {
        id: 'r1-c1-300', round: 1, category: 'Адреса и города', categoryIcon: '🗺️', value: 300,
        text: 'На какой улице в Дамаске жил Савл после ослепления?',
        answer: 'На Прямой улице (Деян. 9:11)', isCatInBag: false,
      },
      {
        id: 'r1-c1-400', round: 1, category: 'Адреса и города', categoryIcon: '🗺️', value: 400,
        text: 'В каком городе Павел нашёл жертвенник «Неведомому Богу»?',
        answer: 'Афины (Деян. 17:23)', isCatInBag: false,
      },
      {
        id: 'r1-c1-500', round: 1, category: 'Адреса и города', categoryIcon: '🗺️', value: 500,
        text: 'На каком острове местные жители сначала приняли Павла за убийцу, а потом за бога?',
        answer: 'Мальта (Мелит) (Деян. 28:1-6)', isCatInBag: false,
      },
    ],
  },
  {
    name: 'Кто этот человек?',
    icon: '👤',
    questions: [
      {
        id: 'r1-c2-100', round: 1, category: 'Кто этот человек?', categoryIcon: '👤', value: 100,
        text: 'Он обратился по дороге в Дамаск и стал великим апостолом язычников.',
        answer: 'Савл / Павел (Деян. 9:3-6)', isCatInBag: false,
      },
      {
        id: 'r1-c2-200', round: 1, category: 'Кто этот человек?', categoryIcon: '👤', value: 200,
        text: 'Этот человек продал поле и принёс деньги апостолам — его прозвали «сын утешения».',
        answer: 'Варнава (Деян. 4:36-37)', isCatInBag: false,
      },
      {
        id: 'r1-c2-300', round: 1, category: 'Кто этот человек?', categoryIcon: '👤', value: 300,
        text: 'Эта торговница пурпуром стала первой обращённой в Европе.',
        answer: 'Лидия (Деян. 16:14)', isCatInBag: false,
      },
      {
        id: 'r1-c2-400', round: 1, category: 'Кто этот человек?', categoryIcon: '👤', value: 400,
        text: 'Этот благочестивый сотник из Кесарии стал первым язычником-христианином.',
        answer: 'Корнилий (Деян. 10:1)', isCatInBag: false,
      },
      {
        id: 'r1-c2-500', round: 1, category: 'Кто этот человек?', categoryIcon: '👤', value: 500,
        text: 'Этот учёный из Александрии говорил о Христе, но знал лишь крещение Иоанново.',
        answer: 'Аполлос (Деян. 18:24-25)', isCatInBag: false,
      },
    ],
  },
  {
    name: 'Магия цифр',
    icon: '🔢',
    questions: [
      {
        id: 'r1-c3-100', round: 1, category: 'Магия цифр', categoryIcon: '🔢', value: 100,
        text: 'Сколько человек уверовало в день Пятидесятницы?',
        answer: 'Около 3 000 (Деян. 2:41)', isCatInBag: false,
      },
      {
        id: 'r1-c3-200', round: 1, category: 'Магия цифр', categoryIcon: '🔢', value: 200,
        text: 'Сколько мужей было избрано для служения вдовам?',
        answer: '7 (Деян. 6:3)', isCatInBag: false,
      },
      {
        id: 'r1-c3-300', round: 1, category: 'Магия цифр', categoryIcon: '🔢', value: 300,
        text: 'Сколько дней Савл не ел и не пил после встречи с Иисусом?',
        answer: '3 дня (Деян. 9:9)', isCatInBag: false,
      },
      {
        id: 'r1-c3-400', round: 1, category: 'Магия цифр', categoryIcon: '🔢', value: 400,
        text: 'Сколько человек было на корабле, потерпевшем крушение у берегов Мальты?',
        answer: '276 (Деян. 27:37)', isCatInBag: false,
      },
      {
        id: 'r1-c3-500', round: 1, category: 'Магия цифр', categoryIcon: '🔢', value: 500,
        text: 'Сколько воинов охраняло Павла по дороге из Иерусалима в Кесарию?',
        answer: '470 (70 + 200 + 200) (Деян. 23:23)', isCatInBag: false,
      },
    ],
  },
  {
    name: 'Чудеса и знамения',
    icon: '✨',
    questions: [
      {
        id: 'r1-c4-100', round: 1, category: 'Чудеса и знамения', categoryIcon: '✨', value: 100,
        text: 'Чьи платки и опоясания исцеляли больных в Ефесе?',
        answer: 'Павла (Деян. 19:12)', isCatInBag: false,
      },
      {
        id: 'r1-c4-200', round: 1, category: 'Чудеса и знамения', categoryIcon: '✨', value: 200,
        text: 'Пётр воскресил женщину-ученицу в Иоппии. Как её звали?',
        answer: 'Тавифа (Серна) (Деян. 9:36-40)', isCatInBag: false,
      },
      {
        id: 'r1-c4-300', round: 1, category: 'Чудеса и знамения', categoryIcon: '✨', value: 300,
        text: 'Что произошло с волхвом Елимой после слов Павла на Кипре?',
        answer: 'Он ослеп (Деян. 13:11)', isCatInBag: false,
      },
      {
        id: 'r1-c4-400', round: 1, category: 'Чудеса и знамения', categoryIcon: '✨', value: 400,
        text: 'Как Павел и Сила были освобождены из темницы в Филиппах?',
        answer: 'Землетрясение открыло двери (Деян. 16:26)', isCatInBag: false,
      },
      {
        id: 'r1-c4-500', round: 1, category: 'Чудеса и знамения', categoryIcon: '✨', value: 500,
        text: 'Что случилось с сыновьями Скевы, когда они попытались изгнать беса именем Иисуса?',
        answer: 'Бес одолел их — они выбежали голые и избитые (Деян. 19:15-16)', isCatInBag: false,
      },
    ],
  },
  {
    name: 'Угадай цитату',
    icon: '📜',
    questions: [
      {
        id: 'r1-c5-100', round: 1, category: 'Угадай цитату', categoryIcon: '📜', value: 100,
        text: '«Кто Ты, Господи?» — кто это сказал и где?',
        answer: 'Савл на дороге в Дамаск (Деян. 9:5)', isCatInBag: false,
      },
      {
        id: 'r1-c5-200', round: 1, category: 'Угадай цитату', categoryIcon: '📜', value: 200,
        text: '«Серебра и золота нет у меня, а что имею...» — что дальше?',
        answer: '«...то даю тебе: во имя Иисуса встань и ходи» (Деян. 3:6)', isCatInBag: false,
      },
      {
        id: 'r1-c5-300', round: 1, category: 'Угадай цитату', categoryIcon: '📜', value: 300,
        text: '«Веруй в Господа Иисуса Христа...» — кому это было сказано?',
        answer: 'Тюремщику в Филиппах после землетрясения (Деян. 16:31)', isCatInBag: false,
      },
      {
        id: 'r1-c5-400', round: 1, category: 'Угадай цитату', categoryIcon: '📜', value: 400,
        text: 'Какое изречение Иисуса привёл Павел в Милите, которого нет ни в одном Евангелии?',
        answer: '«Блаженнее давать, нежели принимать» (Деян. 20:35)', isCatInBag: false,
      },
      {
        id: 'r1-c5-500', round: 1, category: 'Угадай цитату', categoryIcon: '📜', value: 500,
        text: '«Трудно тебе идти против рожна» — что означает образ «рожна»?',
        answer: 'Острая палка погонщика скота — образ бессмысленного сопротивления Богу (Деян. 9:5; 26:14)', isCatInBag: false,
      },
    ],
  },
  {
    name: 'Дела церкви',
    icon: '🕊️',
    questions: [
      {
        id: 'r1-c6-100', round: 1, category: 'Дела церкви', categoryIcon: '🕊️', value: 100,
        text: 'Как апостолы выбирали замену Иуде?',
        answer: 'Бросили жребий — выпал Матфий (Деян. 1:26)', isCatInBag: false,
      },
      {
        id: 'r1-c6-200', round: 1, category: 'Дела церкви', categoryIcon: '🕊️', value: 200,
        text: 'Зачем Пётр и Иоанн пришли к уже крещёным верующим Самарии?',
        answer: 'Чтобы те получили Духа Святого (Деян. 8:14-17)', isCatInBag: false,
      },
      {
        id: 'r1-c6-300', round: 1, category: 'Дела церкви', categoryIcon: '🕊️', value: 300,
        text: 'Какой главный вопрос решал Иерусалимский собор?',
        answer: 'Нужно ли язычникам обрезываться и соблюдать закон Моисея (Деян. 15:1,5)', isCatInBag: false,
      },
      {
        id: 'r1-c6-400', round: 1, category: 'Дела церкви', categoryIcon: '🕊️', value: 400,
        text: 'Кто был отделён Духом Святым для первого миссионерского путешествия?',
        answer: 'Варнава и Савл (Деян. 13:2)', isCatInBag: false,
      },
      {
        id: 'r1-c6-500', round: 1, category: 'Дела церкви', categoryIcon: '🕊️', value: 500,
        text: 'Из пророчества какого пророка Иаков на соборе обосновал принятие язычников?',
        answer: 'Амоса (Деян. 15:16-17)', isCatInBag: false,
      },
    ],
  },
  {
    name: 'Друг или враг? — КОТ В МЕШКЕ',
    icon: '🎭',
    questions: [
      {
        id: 'r1-c7-100', round: 1, category: 'Друг или враг? — КОТ В МЕШКЕ', categoryIcon: '🎭', value: 100,
        text: 'Эти муж и жена утаили деньги от продажи имения и оба умерли в один день.',
        answer: 'Анания и Сапфира (Деян. 5:1-10)', isCatInBag: true,
      },
      {
        id: 'r1-c7-200', round: 1, category: 'Друг или враг? — КОТ В МЕШКЕ', categoryIcon: '🎭', value: 200,
        text: 'Этот фарисей произнёс мудрую речь в защиту апостолов: «Если от Бога — не разрушите».',
        answer: 'Гамалиил (Деян. 5:34-39)', isCatInBag: true,
      },
      {
        id: 'r1-c7-300', round: 1, category: 'Друг или враг? — КОТ В МЕШКЕ', categoryIcon: '🎭', value: 300,
        text: 'Этот серебряник в Ефесе поднял бунт против Павла.',
        answer: 'Димитрий (Деян. 19:24)', isCatInBag: true,
      },
      {
        id: 'r1-c7-400', round: 1, category: 'Друг или враг? — КОТ В МЕШКЕ', categoryIcon: '🎭', value: 400,
        text: 'Эта женщина-служанка не открыла дверь освобождённому Петру.',
        answer: 'Рода (Деян. 12:14)', isCatInBag: true,
      },
      {
        id: 'r1-c7-500', round: 1, category: 'Друг или враг? — КОТ В МЕШКЕ', categoryIcon: '🎭', value: 500,
        text: 'Этот проконсул Ахаии отказался судить Павла.',
        answer: 'Галлион (Деян. 18:12-16)', isCatInBag: true,
      },
    ],
  },
];
