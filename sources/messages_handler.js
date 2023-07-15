import {
    START_PIC, // BATTLE_SONG_PIC_ID
    BECOMING_AUDIO,
    GREETING_MESSAGE,
    BECOMING_AUDIO_MESSAGE,
    PART1_1_PIC,
    PART1_1_TEXT,
    PART1_2_PIC,
    PART1_2_1_TEXT,
    PART1_2_2_TEXT,
    PART1_3_PIC,
    PART1_3_TEXT,
    ARSALAN_FRONT, START_TEXT,
} from "./const.js"
import fs from "fs";


export class MessagesHandler {
    constructor(bot, db) {
        this.bot = bot;
        this.db = db;
    }

    callbackData = {
        GESAR_EPOS:             "gesar_epos",
        ZOV_DOBRA:              "zov_dobra",
        START_QUEST:            "start_quest",
        ADD_KARMA:              "add_karma",
        GESAR_EPOS_DESCR:       "gesar_epos_descr",
        BACK_TO_START:          "back_to_start",
        BACK_TO_START_HARD:     "back_to_start_hard",
        BECOMING:               "becoming",
        BACK_TO_QUEST_START:    "back_to_quest_start",
        GESAR_PART1_1:          "gesar_part1_1",
        GESAR_PART1_2_1:        "gesar_part1_2_1",
        GESAR_PART1_2_2:        "gesar_part1_2_2",
        GESAR_PART1_3:          "gesar_part1_3",
        GESAR_PART1_TEST_0:     "gesar_part1_test_0",
        GESAR_PART1_TEST_1:     "gesar_part1_test_1",
        GESAR_PART1_TEST_no:    "gesar_part1_test_no",
        GESAR_PART1_TEST_1_yes: "gesar_part1_test_1_yes",
        GESAR_PART1_TEST_2:     "gesar_part1_test_2",
        GESAR_PART1_TEST_2_yes: "gesar_part1_test_2_yes",
        GESAR_PART2_1:           "gesar_part2_1",
    }

    start_menu_buttons = [
        [
            {text: `Об эпосе Гэсэр`, callback_data: this.callbackData.GESAR_EPOS},
            {text: `О проекте "Зов Добра"`, callback_data: this.callbackData.ZOV_DOBRA},
        ],
        [
            {text: `Начать квест`, callback_data: this.callbackData.START_QUEST}
        ]
    ]

    quest_started_buttons = [
        [
            {text: `Гэсэр. Становление`, callback_data: this.callbackData.BECOMING},
        ],
        [
            {text: `Путь Героя`, callback_data: this.callbackData.GESAR_PART1_1},
        ],
        [
            {text: `Назад`, callback_data: this.callbackData.BACK_TO_START_HARD},
        ]
    ]

    handleStart(chatId, username) {
        this.writeLog('', `user ${username} id ${chatId} send command 'start'`);

        this.db.addUser(chatId, username, (is_new_user) => {});

        this.sendPhoto(chatId, START_PIC, this.start_menu_buttons, START_TEXT)
    }

    answerGesarEpos(chatId, messageId) {
        const buttons = [
            [
                {text: `Видео "Земля Героев. Гэсэр."`,
                    url: "https://www.youtube.com/watch?v=Vz_XqIief0c&ab_channel=МояПланета"},
            ],
            [
                {text: `Эпос Гэсэр. Запев`,
                    url: "https://telegra.ph/EHPOS-GEHSEHR-ZAPEV-07-09"},
                {text: `Об Эпосе`,
                    url: "https://telegra.ph/BURYATSKIJ-GEROICHESKIJ-EHPOS-GEHSEHR-07-09"},
            ],
            [
                {text: `Книга`,
                    url: "https://taplink.cc/zovgesera", callback_data: this.callbackData.ADD_KARMA},
            ],
            [
                {text: `Назад`, callback_data: this.callbackData.BACK_TO_START}
            ]
        ]
        this.editReplyMarkupOnly(chatId, messageId, buttons)
    }

    answerAboutZovDobra(chatId, messageId) {
        const buttons = [
            [
                {text: `Видео о проекте`, url: "https://www.youtube.com/watch?v=QrXqdpT5z_4"},
            ],
            [
                {text: `Чат сообщества`, url: "https://t.me/agregator_zovdobra"},
                {text: `Бот проекта`, url: "https://t.me/ZovDobraBot"},
            ],
            [
                {text: `Назад`, callback_data: this.callbackData.BACK_TO_START}
            ]
        ]
        this.editReplyMarkupOnly(chatId, messageId, buttons)
    }

    answerInlineBackToStart(chatId, messageId) {
        this.editReplyMarkupOnly(chatId, messageId, this.start_menu_buttons)
    }

    answerInlineBackToStartHard(chatId, messageId) {
        this.deleteAndSendPhoto(chatId, messageId, START_PIC, this.start_menu_buttons, START_TEXT)
    }

    answerInlineStartQuest(chatId, messageId) {
        this.deleteAndSendPhoto(chatId, messageId, START_PIC, this.quest_started_buttons, GREETING_MESSAGE)
    }

    answerInlineBecoming(chatId, messageId) {
        const buttons = [
            [
                {text: `Путь Героя`, callback_data: this.callbackData.GESAR_PART1_1},
            ],
            [
                {text: `Назад`, callback_data: this.callbackData.BACK_TO_QUEST_START},
            ]
        ]
        this.deleteAndSendAudio(chatId, messageId, BECOMING_AUDIO, buttons, BECOMING_AUDIO_MESSAGE)
    }

    answerInlineBackToQuestStart(chatId, messageId) {
        this.deleteAndSendPhoto(chatId, messageId, START_PIC, this.quest_started_buttons, GREETING_MESSAGE)
    }

    answerInlinePart1_1(chatId, messageId) {
        const buttons = [
            [
                {text: `Назад`, callback_data: this.callbackData.BACK_TO_QUEST_START},
                {text: `Главное меню`, callback_data: this.callbackData.BACK_TO_START_HARD},
            ],
            [
                {text: `Что же случилось?`, callback_data: this.callbackData.GESAR_PART1_2_1},
            ]
        ]
        this.deleteAndSendPhoto(chatId, messageId, PART1_1_PIC, buttons, PART1_1_TEXT)
    }

    answerInlinePart1_2_1(chatId, messageId) {
        const buttons = [
            [
                {text: `Назад`, callback_data: this.callbackData.BACK_TO_QUEST_START},
                {text: `Главное меню`, callback_data: this.callbackData.BACK_TO_START_HARD},
            ],
            [
                {text: `Далее`, callback_data: this.callbackData.GESAR_PART1_2_2},
            ]
        ]
        this.deleteAndSendPhoto(chatId, messageId, PART1_2_PIC, buttons, PART1_2_1_TEXT)
    }

    answerInlinePart1_2_2(chatId, messageId) {
        const buttons = [
            [
                {text: `Назад`, callback_data: this.callbackData.GESAR_PART1_2_1},
                {text: `Главное меню`, callback_data: this.callbackData.BACK_TO_START_HARD},
            ],
            [
                {text: `Что сделали небожители?`, callback_data: this.callbackData.GESAR_PART1_3},
            ]
        ]
        this.editReplyMarkupAndCaption(chatId, messageId, buttons, PART1_2_2_TEXT)
    }

    answerInlinePart1_3(chatId, messageId) {
        const buttons = [
            [
                {text: `Назад`, callback_data: this.callbackData.GESAR_PART1_2_1},
                {text: `Главное меню`, callback_data: this.callbackData.BACK_TO_START_HARD},
            ],
            // [
            //     {text: `Видео Ветвь 1`, url: "https://www.youtube.com/watch?v=GtsAWH2FM0w"},
            // ],
            [
                {text: `Вперед!`, callback_data: this.callbackData.GESAR_PART1_TEST_0},
            ]
        ]
        this.deleteAndSendPhoto(chatId, messageId, PART1_3_PIC, buttons, PART1_3_TEXT)
    }

    answerInlinePart1_TEST_0(chatId, messageId) {
        const buttons = [
            [
                {text: `Назад`, callback_data: this.callbackData.GESAR_PART1_3},
                {text: `Главное меню`, callback_data: this.callbackData.BACK_TO_START_HARD},
            ],
            [
                {text: `Первый вопрос`, callback_data: this.callbackData.GESAR_PART1_TEST_1},
            ]
        ]
        const caption = "_Давай проверим твою внимательность. Ответь правильно на два вопроса " +
            "по Ветви 1 и получи +20 к своей Карме._"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart1_TEST_1(chatId, messageId) {
        const buttons = [
            [
                {text: `Крестьянином`, callback_data: this.callbackData.GESAR_PART1_TEST_no},
                {text: `Волшебником`, callback_data: this.callbackData.GESAR_PART1_TEST_no},
            ],
            [
                {text: `Богатырем`, callback_data: this.callbackData.GESAR_PART1_TEST_1_yes},
                {text: `Князем`, callback_data: this.callbackData.GESAR_PART1_TEST_no},
            ]
        ]
        const caption = "Кем был главный герой, до того, как спустился на землю?"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart1_TEST_no(callback_d) {
        let answer = `Ответ неправильный`;
        this.answerCallback(callback_d, answer)
    }

    answerInlinePart1_TEST_1_yes(callback_d, chatId, messageId) {
        this.answerCallback(callback_d, `Правильно!`)

        const buttons = [
            [
                {text: `Следующий вопрос`, callback_data: this.callbackData.GESAR_PART1_TEST_2},
            ]
        ]
        const caption =
            "Главный герой Гэсэр действительно был богатырем, который спустился на землю и показал " +
            "всем, где раки зимуют"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart1_TEST_2(chatId, messageId) {
        const buttons = [
            [
                {text: `Хан-Хурмас`, callback_data: this.callbackData.GESAR_PART1_TEST_no},
                {text: `Эсэгэ-Малан`, callback_data: this.callbackData.GESAR_PART1_TEST_2_yes},
            ],
            [
                {text: `Бухэ-Бэлигтэ`, callback_data: this.callbackData.GESAR_PART1_TEST_no},
                {text: `Атай-Улан`, callback_data: this.callbackData.GESAR_PART1_TEST_no},
            ]
        ]
        const caption = "Как звали верховного Тэнгрия, отца всех богов? "

        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart1_TEST_2_yes(callbackId, chatId, messageId) {
        this.answerCallback(callbackId, `Правильно!`)

        const buttons = [
            [
                {text: `Назад`, callback_data: this.callbackData.GESAR_PART1_TEST_2},
                {text: `Главное меню`, callback_data: this.callbackData.BACK_TO_START_HARD},
            ],
            [
                {text: `Навстречу приключениям! (Ветвь 2)`, callback_data: this.callbackData.GESAR_PART1_TEST_2},
            ]
        ]
        const caption = "Верховного Тэнгрия действительно звали Эсэгэ-Малан, классный мужик"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_1(callback_d, chatId, messageId) {

    }

    answerInlineAddKarma(callback_d, chat_id, karma) {
        this.addKarma(chat_id, karma)
        let answer = `Мы начислили тебе ${karma} Karma. \n\n`;
        this.bot.answerCallbackQuery(callback_d, {text: answer}).then(r => r)
    }

    addKarma(chatId, karma) {
        this.db.updateKarma(chatId, karma)
    }

    sendPhoto(chatId, photo_path, buttons, caption) {
        const photo = fs.createReadStream(photo_path)
        this.bot.sendPhoto(chatId, photo, {
            caption: caption,
            parse_mode: `Markdown`,
            reply_markup: {
                inline_keyboard: buttons
            }
        }).then(r => r)
    }

    deleteAndSendPhoto(chatId, messageId, photo_path, buttons, caption) {
        this.bot.deleteMessage(chatId, messageId).then(r => r)

        const photo = fs.createReadStream(photo_path)
        this.bot.sendPhoto(chatId, photo, {
            caption: caption,
            parse_mode: `Markdown`,
            reply_markup: {
                inline_keyboard: buttons
            }
        }).then(r => r)
    }

    deleteAndSendAudio(chatId, messageId, audio_path, buttons, caption) {
        this.bot.deleteMessage(chatId, messageId).then(r => r)

        const audio = fs.createReadStream(audio_path)
        this.bot.sendAudio(chatId, audio, {
            caption: caption,
            parse_mode: `Markdown`,
            reply_markup: {
                inline_keyboard: buttons
            }
        }).then(r => r)
    }

    editReplyMarkupOnly(chatId, messageId, buttons) {
        const reply_markup = {
            inline_keyboard: buttons
        }
        const message_id_spec = {
            chat_id: chatId,
            message_id: messageId
        }
        this.bot.editMessageReplyMarkup(reply_markup, message_id_spec).then(r => r)
    }

    editReplyMarkupAndCaption(chatId, messageId, buttons, caption) {
        const reply_markup = {
            inline_keyboard: buttons
        }
        const message_id_spec = {
            chat_id: chatId,
            message_id: messageId
        }

        this.bot.editMessageReplyMarkup(reply_markup, message_id_spec).then(r => r)
        this.bot.editMessageCaption(caption, message_id_spec).then(r => r)
    }

    answerCallback(callbackId, message) {
        this.bot.answerCallbackQuery(callbackId, {text: message}).then(r => r)
    }

    writeLog(file, message) {
        console.log(`${new Date()} ${message}`)
    }

}
