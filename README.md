# Проект ya-middle-messenger
## Описание
- Проект уровня middle мессенджер


## Ссылки
- [Макет](https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&node-type=canvas&t=MCYvBYcriLqDxmgU-0)
- [Демо проекта](https://670c2027da100bcfd705ed15--ansnekit.netlify.app/)


## Функциональность
В проекте используется шаблон handlebars с компиляцией на стороне фронта. 
Базовые компоненты наследуются от класса BaseComponent. Компонент компилируется в строку. Строка компилируется в Element и вставляется на страницу

Создан сервис HTTPTransport для настройки XMLHTTPRequest

В проекте используется ESLint + Prettier

## Страницы
### Страницы открываются в навигации в Header navigation link
- [Логин]()
- [Регистрация]()
- [Чаты]()
- [Профиль]()
- [404 ошибка]()
- [500 ошибка]()


## Технологии
- NodeJs LTS 20
- NPM 10.9
- Handlebars 4.7
- PostCSS
- Сборщик Vite
- Typescript 5.5


## Команды
Запуск проекта `npm run dev`

Сборка статики `npm run build`

Сборка для production `npm run start`
