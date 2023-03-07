# movies-explorer-api

## В настоящем репозитории представлен back-end дипломного проекта курса Яндекс Практикума.

- Бэкенд написан на NodeJS.
- Данные хранятся на сервере в базе данных Express.
- Для взаимодействия с сервером используется библиотека Mongoose.
- Запросы к серверу и его ответы на них, в том числе ошибки, логируются в мидлваре библиотеками winston и express-winston.

### Функционал

- регистрация пользователя;
- авторизация пользователя;
- пользователь авторизуется файлом cookie сразу после регистрации, дальнейшая авторизация проходит либо верификацией этого файла в мидлваре, либо авторизацией в соответствующей форме на странице логина.
- сохранение фильма в собственной коллекции пользователя;
- удаление фильма из коллекции пользователя;
- выдача всей коллекции фильмов пользователя;
- выдача данных текущего пользователя;
- редактирование данных текущего пользователя.

### Роутинг

- неавторизованным пользователям закрыт доступ к данным и действиям, предназначенным только авторизованному пользователю;
- авторизация пользователя осуществляется верификацией файла cookie, срок действия которого истекает через 7 дней.
- выход из профиля обновляет файл cookie на новый с нулевым сроком действия.

### Валидация

- входящие данные валидируются как в модели сервера, так и перед серверной обработкой с помощью библиотеки celebrate и Joi;
- валидируется не только пользовательский ввод, но и такие форматы как URL, id и email.

### Безопасность

- пароль хранится в базе данных в зашифрованном виде, работу с паролями осуществляет библиотека bcryptjs;
- файлы cookie недоступны через javascript установкой флага httpOnly: true, и от CSRF-запроса флагом samesite: true;
- секретный ключ для генерации токена сгенерирован модулем crypto и хранится в переменных окружения;
- заголовки безопасности автоматически выставляет модуль helmet;
- мидлвер express-rate-limit ограничивает количество обращений на сервер от одного ip до 300 за 15 минут;

[Ссылка на репозиторий с front-end'ом проекта](https://github.com/Ivan1Vasilyev/movies-explorer-frontend)

[Ссылка на проект](https://shaloban.students.nomoredomains.club/)
