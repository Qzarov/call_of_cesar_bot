import { text } from "./consts/text.js"
import { pictures, audio } from "./consts/media.js"
import { callbackData } from "./consts/callbackData.js"
import { BotUtils } from "./botUtils.js"
import { buttons } from "./consts/buttons.js"


export class MessagesHandler {
    constructor(bot, db) {
        this.bot = new BotUtils(bot);
        this.db = db;
    }

    handleStart(chatId, username) {
        this.writeLog('', `user ${username} id ${chatId} send command 'start'`);

        this.db.addUser(chatId, username, (is_new_user) => {});
        this.bot.sendPhoto(chatId, pictures.START_PIC, buttons.start_menu_buttons, text.START_TEXT)
    }

    answerGesarEpos(chatId, messageId) {
        this.bot.editReplyMarkupAndCaption(chatId, messageId, buttons.answer_gesar_epos, text.ABOUT_EPOS)
    }

    answerAboutZovDobra(chatId, messageId) {
        this.bot.editReplyMarkupAndCaption(chatId, messageId, buttons.about_zov_dobra, text.ABOUT_ZOV_DOBRA)
    }

    answerTableOfContents(chatId, messageId) {
        this.bot.editReplyMarkupAndCaption(chatId, messageId, buttons.table_of_contents, text.TABLE_OF_CONTENTS_TEXT)
    }

    answerInlineBackToStart(chatId, messageId) {
        this.bot.editReplyMarkupAndCaption(chatId, messageId, buttons.start_menu_buttons, text.START_TEXT)
    }

    answerInlineBackToStartHard(chatId, messageId) {
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.START_PIC, buttons.start_menu_buttons, text.START_TEXT)
    }

    answerInlineStartQuest(chatId, messageId) {
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.START_PIC, buttons.quest_started_buttons, text.GREETING_MESSAGE)
    }

    answerInlineBecoming(chatId, messageId) {
        const buttons = [
            [
                {text: `Путь Героя`, callback_data: callbackData.GESAR_PART1_1},
            ],
            [
                {text: `Назад`, callback_data: callbackData.BACK_TO_QUEST_START},
            ]
        ]
        this.bot.deleteAndSendAudio(chatId, messageId, audio.BECOMING_AUDIO, buttons, text.BECOMING_AUDIO_MESSAGE)
    }

    answerInlineBackToQuestStart(chatId, messageId) {
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.START_PIC, buttons.quest_started_buttons, text.GREETING_MESSAGE)
    }

    answerInlinePart1_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.BACK_TO_QUEST_START, `Назад`,
            callbackData.GESAR_PART1_2_1, `Далее`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART1_1_PIC, buttons, text.PART1_1_TEXT)
    }

    answerInlinePart1_2_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.BACK_TO_QUEST_START, `Назад`,
            callbackData.GESAR_PART1_2_2, `Далее`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART1_2_PIC, buttons, text.PART1_2_1_TEXT)
    }

    answerInlinePart1_2_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART1_2_1, `Назад`,
            callbackData.GESAR_PART1_3, `Что сделали небожители?`
        )
        this.bot.editReplyMarkupAndCaption(chatId, messageId, buttons, text.PART1_2_2_TEXT)
    }

    answerInlinePart1_3(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART1_2_1, `Назад`,
            callbackData.GESAR_PART1_TEST_0, `Вперед!`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART1_3_PIC, buttons, text.PART1_3_TEXT)
    }

    answerInlinePart1_TEST_0(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART1_3, `Назад`,
            callbackData.GESAR_PART1_TEST_1, `Первый вопрос`
        )
        const caption = "_Давай проверим твою внимательность. Ответь на два вопроса " +
            "по Ветви 1._"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart1_TEST_1(chatId, messageId) {
        const buttons = [
            [
                {text: `Крестьянином`, callback_data: callbackData.GESAR_PART1_TEST_no},
                {text: `Волшебником`, callback_data: callbackData.GESAR_PART1_TEST_no},
            ],
            [
                {text: `Богатырем`, callback_data: callbackData.GESAR_PART1_TEST_1_yes},
                {text: `Князем`, callback_data: callbackData.GESAR_PART1_TEST_no},
            ]
        ]
        const caption = "_Кем был главный герой, до того, как спустился на землю?_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart1_TEST_no(callback_d) {
        this.bot.answerCallback(callback_d, text.text.TEST_QUERY_no)
    }

    answerInlinePart1_TEST_1_yes(callback_d, chatId, messageId) {
        this.bot.answerCallback(callback_d, text.text.TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART1_TEST_2},
            ]
        ]
        const caption =
            "_Главный герой Гэсэр действительно был богатырем, который спустился " +
            "на землю, чтобы спасти людей от злых сил._"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart1_TEST_2(chatId, messageId) {
        const buttons = [
            [
                {text: `Хан-Хурмас`, callback_data: callbackData.GESAR_PART1_TEST_no},
                {text: `Эсэгэ-Малан`, callback_data: callbackData.GESAR_PART1_TEST_2_yes},
            ],
            [
                {text: `Бухэ-Бэлигтэ`, callback_data: callbackData.GESAR_PART1_TEST_no},
                {text: `Атай-Улан`, callback_data: callbackData.GESAR_PART1_TEST_no},
            ]
        ]
        const caption = "_Как звали верховного Тэнгрия, отца всех богов?_"

        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart1_TEST_2_yes(callbackId, chatId, messageId) {
        this.bot.answerCallback(callbackId, text.text.TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Навстречу приключениям! (Ветвь 2)`, callback_data: callbackData.GESAR_PART2_1_1},
            ],
            [
                {text: `Видео-чтение о Ветви 1`, url: "https://www.youtube.com/watch?v=GtsAWH2FM0w"},
            ],
            [
                {text: `Назад`, callback_data: callbackData.GESAR_PART1_TEST_0},
                buttons.main_menu_button
            ],
        ]
        const caption = "_Отлично! Испытание по Ветви 1 пройдено, продолжай Путь Героя!_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_1_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART1_TEST_0, `Назад`,
            callbackData.GESAR_PART2_1_2, `Что было дальше?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART2_1_PIC, buttons, text.PART2_1_1_TEXT)
    }

    answerInlinePart2_1_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART2_1_1, `Назад`,
            callbackData.GESAR_PART2_2_1, `В гости к Саргалу`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART2_1_PIC, buttons, text.PART2_1_2_TEXT)
    }

    answerInlinePart2_2_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART2_1_2, `Назад`,
            callbackData.GESAR_PART2_2_2, `На состязания!`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART2_2_PIC, buttons, text.PART2_2_1_TEXT)
    }

    answerInlinePart2_2_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART2_2_1, `Назад`,
            callbackData.GESAR_PART2_3_1, `За второй женой!`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART2_2_PIC, buttons, text.PART2_2_2_TEXT)
    }

    answerInlinePart2_3_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART2_2_2, `Назад`,
            callbackData.GESAR_PART2_3_2, `Тэнгрии услышали?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART2_3_PIC, buttons, text.PART2_3_1_TEXT)
    }

    answerInlinePart2_3_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART2_3_1, `Назад`,
            callbackData.GESAR_PART2_4_1, `Что потом сделал Гэсэр?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART2_3_PIC, buttons, text.PART2_3_2_TEXT)
    }

    answerInlinePart2_4_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART2_3_2, `Назад`,
            callbackData.GESAR_PART2_4_2, `Третья жена?!`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART2_4_PIC, buttons, text.PART2_4_1_TEXT)
    }

    answerInlinePart2_4_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART2_4_1, `Назад`,
            callbackData.GESAR_PART2_TEST_0, `Тоже хочу дворец...`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART2_4_PIC, buttons, text.PART2_4_2_TEXT)
    }

    answerInlinePart2_TEST_0(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART2_4_1, `Назад`,
            callbackData.GESAR_PART2_TEST_1, `Первый вопрос`
        )
        const caption = "_На этом вторая ветвь подходит к концу, пора переходить к вопросам!_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_TEST_1(chatId, messageId) {
        const buttons = [
            [
                {text: `Он родился крепышом`, callback_data: callbackData.GESAR_PART2_TEST_no},
                {text: `В детстве был сопливым`, callback_data: callbackData.GESAR_PART2_TEST_1_yes},
            ],
            [
                {text: `Из-за буйного нрава`, callback_data: callbackData.GESAR_PART2_TEST_no},
                {text: `Был красивым`, callback_data: callbackData.GESAR_PART2_TEST_no},
            ]
        ]
        const caption = "_Почему небесного богатыря Бухэ-Бэлигтэ, будущего Гэсэра, прозвали в детстве Нюсата-Нюргай?_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_TEST_no(callbackId) {
        this.bot.answerCallback(callbackId, text.text.TEST_QUERY_no)
    }

    answerInlinePart2_TEST_1_yes(callback_d, chatId, messageId) {
        this.bot.answerCallback(callback_d, text.text.TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART2_TEST_2},
            ]
        ]
        const caption =
            "_Это правда, богатырь Гэсэр в детстве был сопливым мальчиком!_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_TEST_2(chatId, messageId) {
        const buttons = [
            [
                {text: `Для величия`, callback_data: callbackData.GESAR_PART2_TEST_2_yes},
                {text: `Для истории`, callback_data: callbackData.GESAR_PART2_TEST_no},
            ],
            [
                {text: `Для защиты`, callback_data: callbackData.GESAR_PART2_TEST_no},
                {text: `Для славы`, callback_data: callbackData.GESAR_PART2_TEST_no},
            ]
        ]
        const caption = "_Для чего Нюсата-Нюргай получил на горе Сумбэр имя Гэсэр?_" +
            "\n" +
            "Подсказка: _«Если внимателен ты был путник, то историю эту услышать ты должен был…»_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_TEST_2_yes(callback_d, chatId, messageId) {
        this.bot.answerCallback(callback_d, text.TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Продолжить приключения! (Ветвь 3)`, callback_data: callbackData.GESAR_PART3_1_1},
            ],
            [
                {text: `Назад`, callback_data: callbackData.GESAR_PART2_TEST_0},
                buttons.main_menu_button
            ]
        ]
        const caption =
            "_Отлично! Вместе с богатырём Гэсэром вы прошли испытание по Ветви 2, так держать!_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart3_1_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART2_TEST_0, `Назад`,
            callbackData.GESAR_PART3_1_2, `Что было дальше?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART3_1_PIC, buttons, text.PART3_1_1_TEXT)
    }

    answerInlinePart3_1_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART3_1_1, `Назад`,
            callbackData.GESAR_PART3_2_1, `На совет Тэнгриев`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART3_1_PIC, buttons, text.PART3_1_2_TEXT)
    }

    answerInlinePart3_2_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART3_1_2, `Назад`,
            callbackData.GESAR_PART3_2_2, `Подлый Архан!`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART3_2_PIC, buttons, text.PART3_2_1_TEXT)
    }

    answerInlinePart3_2_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART3_2_1, `Назад`,
            callbackData.GESAR_PART3_3_1, `Что стало с Арханом?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART3_2_PIC, buttons, text.PART3_2_2_TEXT)
    }

    answerInlinePart3_3_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART3_2_2, `Назад`,
            callbackData.GESAR_PART3_3_2, `Что сделал Архан-Шудхэр?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART3_3_PIC, buttons, text.PART3_3_1_TEXT)
    }

    answerInlinePart3_3_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART3_3_1, `Назад`,
            callbackData.GESAR_PART3_3_3, `У них получилось?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART3_3_PIC, buttons, text.PART3_3_2_TEXT)
    }

    answerInlinePart3_3_3(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART3_3_2, `Назад`,
            callbackData.GESAR_PART3_TEST_0, `Вот это история...`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART3_3_PIC, buttons, text.PART3_3_3_TEXT)
    }

    answerInlinePart3_TEST_0(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART3_3_3, `Назад`,
            callbackData.GESAR_PART3_TEST_1, `Первый вопрос`
        )
        const caption = "_Вот мы и дошли до конца третьей ветви. Теперь традиционные вопросы!_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart3_TEST_1(chatId, messageId) {
        const buttons = [
            [
                {text: `Туловище`, callback_data: callbackData.GESAR_PART3_TEST_no},
                {text: `Голова`, callback_data: callbackData.GESAR_PART3_TEST_1_yes},
            ],
            [
                {text: `Нога`, callback_data: callbackData.GESAR_PART3_TEST_no},
                {text: `Рука`, callback_data: callbackData.GESAR_PART3_TEST_no},
            ]
        ]
        const caption = "_Из какой части тела Атай-Улана появился злобный демон Архан-Шудхэр?_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart3_TEST_no(callbackId) {
        this.bot.answerCallback(callbackId, text.TEST_QUERY_no)
    }

    answerInlinePart3_TEST_1_yes(callbackId, chatId, messageId) {
        this.bot.answerCallback(callbackId, text.TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART3_TEST_2},
            ]
        ]
        const caption =
            "_Да! Демон Архан-Шудхэр появился из головы Атай-Улана!_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart3_TEST_2(chatId, messageId) {
        const buttons = [
            [
                {text: `Завидовал силе Гэсэра`, callback_data: callbackData.GESAR_PART3_TEST_no},
                {text: `Не мог простить обид`, callback_data: callbackData.GESAR_PART3_TEST_no},
            ],
            [
                {text: `Из-за жажды золота`, callback_data: callbackData.GESAR_PART3_TEST_no},
                {text: `Уведённые жёны`, callback_data: callbackData.GESAR_PART3_TEST_2_yes},
            ]
        ]
        const caption = "_Почему дядя Гэсэра Хара-Зутан пошел на предательство и сговор с Архан-Шудхэром?_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart3_TEST_2_yes(callbackId, chatId, messageId) {
        this.bot.answerCallback(callbackId, text.TEST_QUERY_yes)

        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART3_TEST_0, `Назад`,
            callbackData.GESAR_PART4_1_1, `Идем дальше! (Ветвь 4)!`
        )
        const caption =
            "_Бок о бок с Гэсэром вы прошли уже три ветви! Но приключения только начинаются!_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart4_1_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART3_TEST_0, `Назад`,
            callbackData.GESAR_PART4_1_2, `Что было дальше?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART4_1_PIC, buttons, text.PART4_1_1_TEXT)
    }

    answerInlinePart4_1_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART4_1_1, `Назад`,
            callbackData.GESAR_PART4_2_1, `Они отправились в поход?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART4_1_PIC, buttons, text.PART4_1_2_TEXT)
    }

    answerInlinePart4_2_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART4_1_2, `Назад`,
            callbackData.GESAR_PART4_2_2, `Началось сражение?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART4_2_PIC, buttons, text.PART4_2_1_TEXT)
    }

    answerInlinePart4_2_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART4_2_1, `Назад`,
            callbackData.GESAR_PART4_3_1, `Гал-Нурман сдался?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART4_2_PIC, buttons, text.PART4_2_2_TEXT)
    }

    answerInlinePart4_3_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART4_2_2, `Назад`,
            callbackData.GESAR_PART4_3_2, `Неужели он проиграл?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART4_3_PIC, buttons, text.PART4_3_1_TEXT)
    }

    answerInlinePart4_3_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART4_3_1, `Назад`,
            callbackData.GESAR_PART4_4_1, `Они успели помочь?`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART4_3_PIC, buttons, text.PART4_3_2_TEXT)
    }

    answerInlinePart4_4_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART4_3_2, `Назад`,
            callbackData.GESAR_PART4_4_2, `Победа!`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART4_4_PIC, buttons, text.PART4_4_1_TEXT)
    }

    answerInlinePart4_4_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART4_4_1, `Назад`,
            callbackData.GESAR_PART4_TEST_0, `Дальше!`
        )
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.PART4_4_PIC, buttons, text.PART4_4_2_TEXT)
    }

    answerInlinePart4_TEST_0(chatId, messageId) {
        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART4_4_2, `Назад`,
            callbackData.GESAR_PART4_TEST_1, `Первый вопрос`
        )
        const caption = "_Вот мы и дошли до конца четвертой ветви. Теперь традиционные вопросы!_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart4_TEST_1(chatId, messageId) {
        const buttons = [
            [
                {text: `10 тысяч`, callback_data: callbackData.GESAR_PART4_TEST_no},
                {text: `33 тысячи`, callback_data: callbackData.GESAR_PART4_TEST_no},
            ],
            [
                {text: `3 тысячи`, callback_data: callbackData.GESAR_PART4_TEST_1_yes},
                {text: `200 тысяч`, callback_data: callbackData.GESAR_PART4_TEST_no},
            ]
        ]
        const caption = "_Сколько превращений было в распоряжении Гал-Нурман Хана?_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart4_TEST_no(callbackId) {
        this.bot.answerCallback(callbackId, text.TEST_QUERY_no)
    }

    answerInlinePart4_TEST_1_yes(callbackId, chatId, messageId) {
        this.bot.answerCallback(callbackId, text.TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART4_TEST_2},
            ]
        ]
        const caption =
            "_Абсолютно точно! В распоряжении Гал-Нурмана  было десять тысяч коварств, три тысячи превращений и тридцать три тысячи разрушений._"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart4_TEST_2(chatId, messageId) {
        const buttons = [
            [
                {text: `метеорит`, callback_data: callbackData.GESAR_PART4_TEST_no},
                {text: `камень`, callback_data: callbackData.GESAR_PART4_TEST_no},
            ],
            [
                {text: `золото`, callback_data: callbackData.GESAR_PART4_TEST_no},
                {text: `алмаз`, callback_data: callbackData.GESAR_PART4_TEST_2_yes},
            ]
        ]
        const caption = "_Из какого материала был сделан камень, которым Заса-Мэргэн подбил Гал-Нурмана с небес?_"
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart4_TEST_2_yes(callbackId, chatId, messageId) {
        this.bot.answerCallback(callbackId, text.TEST_QUERY_yes)

        const buttons = this.getStoryButtons(
            callbackData.GESAR_PART4_TEST_0, `Назад`,
            callbackData.QUEST_END, `Конец?`
        )
        const caption =
            "Правильно! На этом четвертая Ветвь приключений Гэсэра заканчивается."
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, caption)
    }


    answerInlineQuestEnd(chatId, messageId) {
        const buttons = [
            [
                {text: `Зов Добра`, url: "https://t.me/agregator_zovdobra/39"},
                {text: `Песня о Гэсэре`, url: "https://www.youtube.com/watch?v=uBJpeLkFKJ8"},
            ],
            [
                {text: `Назад`, callback_data: callbackData.GESAR_PART3_TEST_2_yes},
                {text: `В главное меню`, callback_data: callbackData.BACK_TO_START_HARD},
            ]
        ]
        this.bot.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, text.QUEST_END)
    }

    answerInlineAddKarma(callback_d, chat_id, karma) {
        this.addKarma(chat_id, karma)
        let answer = `Мы начислили тебе ${karma} Karma. \n\n`;
        this.bot.bot.answerCallbackQuery(callback_d, {text: answer}).then(r => r)
    }


    /*
    *   Service functions
    */

    addKarma(chatId, karma) {
        this.db.updateKarma(chatId, karma)
    }

    getStoryButtons(prev_step, prev_step_text, next_step, next_step_text) {
        return [
            [
                {text: next_step_text, callback_data: next_step},
            ],
            [
                {text: prev_step_text, callback_data: prev_step},
                buttons.main_menu_button
            ]
        ]
    }

    writeLog(file, message) {
        console.log(`${new Date()} ${message}`)
    }

}
