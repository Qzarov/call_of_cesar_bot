import {
    START_PIC,
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
    ARSALAN_FRONT,
    START_TEXT,
    PART2_1_2_TEXT,
    PART2_1_PIC,
    PART2_1_1_TEXT,
    PART2_2_1_TEXT,
    PART2_2_2_TEXT,
    PART2_3_1_TEXT,
    PART2_3_PIC,
    PART2_2_PIC,
    PART2_3_2_TEXT,
    PART2_4_PIC,
    PART2_4_1_TEXT,
    PART2_4_2_TEXT,
    TEST_QUERY_no,
    TEST_QUERY_yes,
    PART3_1_PIC,
    PART3_1_1_TEXT,
    PART3_2_1_TEXT,
    PART3_2_PIC,
    PART3_2_2_TEXT,
    PART3_3_PIC,
    PART3_3_1_TEXT,
    PART3_3_2_TEXT,
    PART3_3_3_TEXT,
    PART3_1_2_TEXT,
    TABLE_OF_CONTENTS_TEXT,
    QUEST_END,
    PART4_1_PIC,
    PART4_1_2_TEXT,
    PART4_1_1_TEXT,
    PART4_2_1_TEXT,
    PART4_2_PIC,
    PART4_3_PIC,
    PART4_3_1_TEXT,
    PART4_3_2_TEXT, PART4_4_1_TEXT, PART4_4_PIC, PART4_2_2_TEXT, PART4_4_2_TEXT, ABOUT_EPOS,
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
        TABLE_OF_CONTENTS:      "table_of_contents",
        START_QUEST:            "start_quest",
        ADD_KARMA:              "add_karma",
        GESAR_EPOS_DESCR:       "gesar_epos_descr",
        BECOMING:               "becoming",
        BACK_TO_START:          "back_to_start",
        BACK_TO_START_HARD:     "back_to_start_hard",
        BACK_TO_QUEST_START:    "back_to_quest_start",
        QUEST_END:              "quest_end",

        // PART 1
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

        // PART 2
        GESAR_PART2_1_1:        "gesar_part2_1_1",
        GESAR_PART2_1_2:        "gesar_part2_1_2",
        GESAR_PART2_2_1:        "gesar_part2_2_1",
        GESAR_PART2_2_2:        "gesar_part2_2_2",
        GESAR_PART2_3_1:        "gesar_part2_3_1",
        GESAR_PART2_3_2:        "gesar_part2_3_2",
        GESAR_PART2_4_1:        "gesar_part2_4_1",
        GESAR_PART2_4_2:        "gesar_part2_4_2",
        GESAR_PART2_TEST_0:     "gesar_part2_test_0",
        GESAR_PART2_TEST_1:     "gesar_part2_test_1",
        GESAR_PART2_TEST_no:    "gesar_part2_test_no",
        GESAR_PART2_TEST_1_yes: "gesar_part2_test_1_yes",
        GESAR_PART2_TEST_2:     "gesar_part2_test_2",
        GESAR_PART2_TEST_2_yes: "gesar_part2_test_2_yes",

        // PART 3
        GESAR_PART3_1_1:        "gesar_part3_1_1",
        GESAR_PART3_1_2:        "gesar_part3_1_2",
        GESAR_PART3_2_1:        "gesar_part3_2_1",
        GESAR_PART3_2_2:        "gesar_part3_2_2",
        GESAR_PART3_3_1:        "gesar_part3_3_1",
        GESAR_PART3_3_2:        "gesar_part3_3_2",
        GESAR_PART3_3_3:        "gesar_part3_3_3",
        GESAR_PART3_TEST_0:     "gesar_part3_test_0",
        GESAR_PART3_TEST_1:     "gesar_part3_test_1",
        GESAR_PART3_TEST_no:    "gesar_part3_test_no",
        GESAR_PART3_TEST_1_yes: "gesar_part3_test_1_yes",
        GESAR_PART3_TEST_2:     "gesar_part3_test_2",
        GESAR_PART3_TEST_2_yes: "gesar_part3_test_2_yes",

        // PART 4
        GESAR_PART4_1_1:        "gesar_part4_1_1",
        GESAR_PART4_1_2:        "gesar_part4_1_2",
        GESAR_PART4_2_1:        "gesar_part4_2_1",
        GESAR_PART4_2_2:        "gesar_part4_2_2",
        GESAR_PART4_3_1:        "gesar_part4_3_1",
        GESAR_PART4_3_2:        "gesar_part4_3_2",
        GESAR_PART4_4_1:        "gesar_part4_4_1",
        GESAR_PART4_4_2:        "gesar_part4_4_2",
        GESAR_PART4_TEST_0:     "gesar_part4_test_0",
        GESAR_PART4_TEST_1:     "gesar_part4_test_1",
        GESAR_PART4_TEST_no:    "gesar_part4_test_no",
        GESAR_PART4_TEST_1_yes: "gesar_part4_test_1_yes",
        GESAR_PART4_TEST_2:     "gesar_part4_test_2",
        GESAR_PART4_TEST_2_yes: "gesar_part4_test_2_yes",
    }

    start_menu_buttons = [
        [
            {text: `Об эпосе Гэсэр`, callback_data: this.callbackData.GESAR_EPOS},
            {text: `О проекте "Зов Добра"`, callback_data: this.callbackData.ZOV_DOBRA},
        ],
        [
            {text: `Оглавление`, callback_data: this.callbackData.TABLE_OF_CONTENTS},
        ],
        [
            {text: `Начать квест`, callback_data: this.callbackData.START_QUEST}
        ]
    ]

    quest_started_buttons = [
        [
            {text: `Путь Героя`, callback_data: this.callbackData.GESAR_PART1_1},
            {text: `Гэсэр. Становление`, callback_data: this.callbackData.BECOMING},
        ],
        [
            {text: `Назад`, callback_data: this.callbackData.BACK_TO_START_HARD},
        ]
    ]

    main_menu_button = {text: `Главное меню`, callback_data: this.callbackData.BACK_TO_START_HARD}

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
                {text: `Эпос Гэсэр. Запев`, url: "https://telegra.ph/EHPOS-GEHSEHR-ZAPEV-07-09"},
                {text: `Описание`, url: "https://telegra.ph/BURYATSKIJ-GEROICHESKIJ-EHPOS-GEHSEHR-07-09"},
            ],
            [
                {text: `Времён связующая нить`, url: "https://youtube.com/playlist?list=PLQc9jctpUJHv_U2b-jiehYYcOShZJzoxr"},
            ],
            [
                {text: `Собрание изданий`, url: "https://taplink.cc/zovgesera", callback_data: this.callbackData.ADD_KARMA},
            ],
            [
                {text: `Назад`, callback_data: this.callbackData.BACK_TO_START}
            ]
        ]
        this.editReplyMarkupAndCaption(chatId, messageId, buttons, ABOUT_EPOS)
    }

    answerAboutZovDobra(chatId, messageId) {
        const buttons = [
            [
                {text: `Видео о проекте`, url: "https://www.youtube.com/watch?v=QrXqdpT5z_4"},
            ],
            [
                {text: `Чат сообщества`, url: "https://t.me/agregator_zovdobra"},
                {text: `Бот Добра`, url: "https://t.me/ZovDobraBot"},
            ],
            [
                {text: `Назад`, callback_data: this.callbackData.BACK_TO_START}
            ]
        ]
        this.editReplyMarkupOnly(chatId, messageId, buttons)
    }

    answerTableOfContents(chatId, messageId) {
        const buttons = [
            [
                {text: `Ветвь 1`, callback_data: this.callbackData.GESAR_PART1_1},
                {text: `Ветвь 2`, callback_data: this.callbackData.GESAR_PART2_1_1},
            ],
            [
                {text: `Ветвь 3`, callback_data: this.callbackData.GESAR_PART3_1_1},
                {text: `Ветвь 4`, callback_data: this.callbackData.GESAR_PART4_1_1},
            ],
            [
                {text: `Ветвь 5`, url: "https://telegra.ph/Vetv-pyataya-Pobeda-Gehsehra-nad-chudovishchem-Orgoli--hozyainom-tajgi-07-18"},
                {text: `Ветвь 6`, url: "https://telegra.ph/Vetv-shestaya-Gehsehr-ubivaet-chudovishche-SHehrehm-Minata-07-18"},
            ],
            [
                {text: `Ветвь 7`, url: "https://telegra.ph/Vetv-sedmaya-Kak-Gehsehr-pobedil-dyavola-Abarga-Sehsehna-07-18"},
                {text: `Ветвь 8`, url: "https://telegra.ph/Vetv-vosmaya-O-pobede-Gehsehra-nad-kovarnym-Lojr-Lobsogoldoem-07-18"},

            ],
            [
                {text: `Ветвь 9 (появится позднее)`, callback_data: this.callbackData.BACK_TO_START},
            ],
            [
                {text: `Назад`, callback_data: this.callbackData.BACK_TO_START}
            ]
        ]
        this.editReplyMarkupAndCaption(chatId, messageId, buttons, TABLE_OF_CONTENTS_TEXT)
    }

    answerInlineBackToStart(chatId, messageId) {
        this.editReplyMarkupAndCaption(chatId, messageId, this.start_menu_buttons, START_TEXT)
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
        const buttons = this.getStoryButtons(
            this.callbackData.BACK_TO_QUEST_START, `Назад`,
            this.callbackData.GESAR_PART1_2_1, `Далее`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART1_1_PIC, buttons, PART1_1_TEXT)
    }

    answerInlinePart1_2_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.BACK_TO_QUEST_START, `Назад`,
            this.callbackData.GESAR_PART1_2_2, `Далее`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART1_2_PIC, buttons, PART1_2_1_TEXT)
    }

    answerInlinePart1_2_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART1_2_1, `Назад`,
            this.callbackData.GESAR_PART1_3, `Что сделали небожители?`
        )
        this.editReplyMarkupAndCaption(chatId, messageId, buttons, PART1_2_2_TEXT)
    }

    answerInlinePart1_3(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART1_2_1, `Назад`,
            this.callbackData.GESAR_PART1_TEST_0, `Вперед!`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART1_3_PIC, buttons, PART1_3_TEXT)
    }

    answerInlinePart1_TEST_0(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART1_3, `Назад`,
            this.callbackData.GESAR_PART1_TEST_1, `Первый вопрос`
        )
        const caption = "_Давай проверим твою внимательность. Ответь на два вопроса " +
            "по Ветви 1._"
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
        const caption = "_Кем был главный герой, до того, как спустился на землю?_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart1_TEST_no(callback_d) {
        this.answerCallback(callback_d, TEST_QUERY_no)
    }

    answerInlinePart1_TEST_1_yes(callback_d, chatId, messageId) {
        this.answerCallback(callback_d, TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Следующий вопрос`, callback_data: this.callbackData.GESAR_PART1_TEST_2},
            ]
        ]
        const caption =
            "_Главный герой Гэсэр действительно был богатырем, который спустился " +
            "на землю, чтобы спасти людей от злых сил._"
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
        const caption = "_Как звали верховного Тэнгрия, отца всех богов?_"

        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart1_TEST_2_yes(callbackId, chatId, messageId) {
        this.answerCallback(callbackId, TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Навстречу приключениям! (Ветвь 2)`, callback_data: this.callbackData.GESAR_PART2_1_1},
            ],
            [
                {text: `Видео-чтение о Ветви 1`, url: "https://www.youtube.com/watch?v=GtsAWH2FM0w"},
            ],
            [
                {text: `Назад`, callback_data: this.callbackData.GESAR_PART1_TEST_0},
                this.main_menu_button
            ],
        ]
        const caption = "_Отлично! Испытание по Ветви 1 пройдено, продолжай Путь Героя!_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_1_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART1_TEST_0, `Назад`,
            this.callbackData.GESAR_PART2_1_2, `Что было дальше?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART2_1_PIC, buttons, PART2_1_1_TEXT)
    }

    answerInlinePart2_1_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART2_1_1, `Назад`,
            this.callbackData.GESAR_PART2_2_1, `В гости к Саргалу`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART2_1_PIC, buttons, PART2_1_2_TEXT)
    }

    answerInlinePart2_2_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART2_1_2, `Назад`,
            this.callbackData.GESAR_PART2_2_2, `На состязания!`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART2_2_PIC, buttons, PART2_2_1_TEXT)
    }

    answerInlinePart2_2_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART2_2_1, `Назад`,
            this.callbackData.GESAR_PART2_3_1, `За второй женой!`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART2_2_PIC, buttons, PART2_2_2_TEXT)
    }

    answerInlinePart2_3_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART2_2_2, `Назад`,
            this.callbackData.GESAR_PART2_3_2, `Тэнгрии услышали?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART2_3_PIC, buttons, PART2_3_1_TEXT)
    }

    answerInlinePart2_3_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART2_3_1, `Назад`,
            this.callbackData.GESAR_PART2_4_1, `Что потом сделал Гэсэр?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART2_3_PIC, buttons, PART2_3_2_TEXT)
    }

    answerInlinePart2_4_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART2_3_2, `Назад`,
            this.callbackData.GESAR_PART2_4_2, `Третья жена?!`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART2_4_PIC, buttons, PART2_4_1_TEXT)
    }

    answerInlinePart2_4_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART2_4_1, `Назад`,
            this.callbackData.GESAR_PART2_TEST_0, `Тоже хочу дворец...`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART2_4_PIC, buttons, PART2_4_2_TEXT)
    }

    answerInlinePart2_TEST_0(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART2_4_1, `Назад`,
            this.callbackData.GESAR_PART2_TEST_1, `Первый вопрос`
        )
        const caption = "_На этом вторая ветвь подходит к концу, пора переходить к вопросам!_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_TEST_1(chatId, messageId) {
        const buttons = [
            [
                {text: `Он родился крепышом`, callback_data: this.callbackData.GESAR_PART2_TEST_no},
                {text: `В детстве был сопливым`, callback_data: this.callbackData.GESAR_PART2_TEST_1_yes},
            ],
            [
                {text: `Из-за буйного нрава`, callback_data: this.callbackData.GESAR_PART2_TEST_no},
                {text: `Был красивым`, callback_data: this.callbackData.GESAR_PART2_TEST_no},
            ]
        ]
        const caption = "_Почему небесного богатыря Бухэ-Бэлигтэ, будущего Гэсэра, прозвали в детстве Нюсата-Нюргай?_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_TEST_no(callbackId) {
        this.answerCallback(callbackId, TEST_QUERY_no)
    }

    answerInlinePart2_TEST_1_yes(callback_d, chatId, messageId) {
        this.answerCallback(callback_d, TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Следующий вопрос`, callback_data: this.callbackData.GESAR_PART2_TEST_2},
            ]
        ]
        const caption =
            "_Это правда, богатырь Гэсэр в детстве был сопливым мальчиком!_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_TEST_2(chatId, messageId) {
        const buttons = [
            [
                {text: `Для величия`, callback_data: this.callbackData.GESAR_PART2_TEST_2_yes},
                {text: `Для истории`, callback_data: this.callbackData.GESAR_PART2_TEST_no},
            ],
            [
                {text: `Для защиты`, callback_data: this.callbackData.GESAR_PART2_TEST_no},
                {text: `Для славы`, callback_data: this.callbackData.GESAR_PART2_TEST_no},
            ]
        ]
        const caption = "_Для чего Нюсата-Нюргай получил на горе Сумбэр имя Гэсэр?_" +
            "\n" +
            "Подсказка: _«Если внимателен ты был путник, то историю эту услышать ты должен был…»_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart2_TEST_2_yes(callback_d, chatId, messageId) {
        this.answerCallback(callback_d, TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Продолжить приключения! (Ветвь 3)`, callback_data: this.callbackData.GESAR_PART3_1_1},
            ],
            [
                {text: `Назад`, callback_data: this.callbackData.GESAR_PART2_TEST_0},
                this.main_menu_button
            ]
        ]
        const caption =
            "_Отлично! Вместе с богатырём Гэсэром вы прошли испытание по Ветви 2, так держать!_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart3_1_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART2_TEST_0, `Назад`,
            this.callbackData.GESAR_PART3_1_2, `Что было дальше?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART3_1_PIC, buttons, PART3_1_1_TEXT)
    }

    answerInlinePart3_1_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART3_1_1, `Назад`,
            this.callbackData.GESAR_PART3_2_1, `На совет Тэнгриев`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART3_1_PIC, buttons, PART3_1_2_TEXT)
    }

    answerInlinePart3_2_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART3_1_2, `Назад`,
            this.callbackData.GESAR_PART3_2_2, `Подлый Архан!`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART3_2_PIC, buttons, PART3_2_1_TEXT)
    }

    answerInlinePart3_2_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART3_2_1, `Назад`,
            this.callbackData.GESAR_PART3_3_1, `Что стало с Арханом?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART3_2_PIC, buttons, PART3_2_2_TEXT)
    }

    answerInlinePart3_3_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART3_2_2, `Назад`,
            this.callbackData.GESAR_PART3_3_2, `Что сделал Архан-Шудхэр?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART3_3_PIC, buttons, PART3_3_1_TEXT)
    }

    answerInlinePart3_3_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART3_3_1, `Назад`,
            this.callbackData.GESAR_PART3_3_3, `У них получилось?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART3_3_PIC, buttons, PART3_3_2_TEXT)
    }

    answerInlinePart3_3_3(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART3_3_2, `Назад`,
            this.callbackData.GESAR_PART3_TEST_0, `Вот это история...`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART3_3_PIC, buttons, PART3_3_3_TEXT)
    }

    answerInlinePart3_TEST_0(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART3_3_3, `Назад`,
            this.callbackData.GESAR_PART3_TEST_1, `Первый вопрос`
        )
        const caption = "_Вот мы и дошли до конца третьей ветви. Теперь традиционные вопросы!_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart3_TEST_1(chatId, messageId) {
        const buttons = [
            [
                {text: `Туловище`, callback_data: this.callbackData.GESAR_PART3_TEST_no},
                {text: `Голова`, callback_data: this.callbackData.GESAR_PART3_TEST_1_yes},
            ],
            [
                {text: `Нога`, callback_data: this.callbackData.GESAR_PART3_TEST_no},
                {text: `Рука`, callback_data: this.callbackData.GESAR_PART3_TEST_no},
            ]
        ]
        const caption = "_Из какой части тела Атай-Улана появился злобный демон Архан-Шудхэр?_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart3_TEST_no(callbackId) {
        this.answerCallback(callbackId, TEST_QUERY_no)
    }

    answerInlinePart3_TEST_1_yes(callbackId, chatId, messageId) {
        this.answerCallback(callbackId, TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Следующий вопрос`, callback_data: this.callbackData.GESAR_PART3_TEST_2},
            ]
        ]
        const caption =
            "_Да! Демон Архан-Шудхэр появился из головы Атай-Улана!_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart3_TEST_2(chatId, messageId) {
        const buttons = [
            [
                {text: `Завидовал силе Гэсэра`, callback_data: this.callbackData.GESAR_PART3_TEST_no},
                {text: `Не мог простить обид`, callback_data: this.callbackData.GESAR_PART3_TEST_no},
            ],
            [
                {text: `Из-за жажды золота`, callback_data: this.callbackData.GESAR_PART3_TEST_no},
                {text: `Уведённые жёны`, callback_data: this.callbackData.GESAR_PART3_TEST_2_yes},
            ]
        ]
        const caption = "_Почему дядя Гэсэра Хара-Зутан пошел на предательство и сговор с Архан-Шудхэром?_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart3_TEST_2_yes(callbackId, chatId, messageId) {
        this.answerCallback(callbackId, TEST_QUERY_yes)

        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART3_TEST_0, `Назад`,
            this.callbackData.GESAR_PART4_1_1, `Идем дальше! (Ветвь 4)!`
        )
        const caption =
            "_Бок о бок с Гэсэром вы прошли уже три ветви! Но приключения только начинаются!_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart4_1_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART3_TEST_0, `Назад`,
            this.callbackData.GESAR_PART4_1_2, `Что было дальше?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART4_1_PIC, buttons, PART4_1_1_TEXT)
    }

    answerInlinePart4_1_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART4_1_1, `Назад`,
            this.callbackData.GESAR_PART4_2_1, `Они отправились в поход?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART4_1_PIC, buttons, PART4_1_2_TEXT)
    }

    answerInlinePart4_2_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART4_1_2, `Назад`,
            this.callbackData.GESAR_PART4_2_2, `Началось сражение?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART4_2_PIC, buttons, PART4_2_1_TEXT)
    }

    answerInlinePart4_2_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART4_2_1, `Назад`,
            this.callbackData.GESAR_PART4_3_1, `Гал-Нурман сдался?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART4_2_PIC, buttons, PART4_2_2_TEXT)
    }

    answerInlinePart4_3_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART4_2_2, `Назад`,
            this.callbackData.GESAR_PART4_3_2, `Неужели он проиграл?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART4_3_PIC, buttons, PART4_3_1_TEXT)
    }

    answerInlinePart4_3_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART4_3_1, `Назад`,
            this.callbackData.GESAR_PART4_4_1, `Они успели помочь?`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART4_3_PIC, buttons, PART4_3_2_TEXT)
    }

    answerInlinePart4_4_1(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART4_3_2, `Назад`,
            this.callbackData.GESAR_PART4_4_2, `Победа!`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART4_4_PIC, buttons, PART4_4_1_TEXT)
    }

    answerInlinePart4_4_2(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART4_4_1, `Назад`,
            this.callbackData.GESAR_PART4_TEST_0, `Дальше!`
        )
        this.deleteAndSendPhoto(chatId, messageId, PART4_4_PIC, buttons, PART4_4_2_TEXT)
    }

    answerInlinePart4_TEST_0(chatId, messageId) {
        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART4_4_2, `Назад`,
            this.callbackData.GESAR_PART4_TEST_1, `Первый вопрос`
        )
        const caption = "_Вот мы и дошли до конца четвертой ветви. Теперь традиционные вопросы!_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart4_TEST_1(chatId, messageId) {
        const buttons = [
            [
                {text: `10 тысяч`, callback_data: this.callbackData.GESAR_PART4_TEST_no},
                {text: `33 тысячи`, callback_data: this.callbackData.GESAR_PART4_TEST_no},
            ],
            [
                {text: `3 тысячи`, callback_data: this.callbackData.GESAR_PART4_TEST_1_yes},
                {text: `200 тысяч`, callback_data: this.callbackData.GESAR_PART4_TEST_no},
            ]
        ]
        const caption = "_Сколько превращений было в распоряжении Гал-Нурман Хана?_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart4_TEST_no(callbackId) {
        this.answerCallback(callbackId, TEST_QUERY_no)
    }

    answerInlinePart4_TEST_1_yes(callbackId, chatId, messageId) {
        this.answerCallback(callbackId, TEST_QUERY_yes)

        const buttons = [
            [
                {text: `Следующий вопрос`, callback_data: this.callbackData.GESAR_PART4_TEST_2},
            ]
        ]
        const caption =
            "_Абсолютно точно! В распоряжении Гал-Нурмана  было десять тысяч коварств, три тысячи превращений и тридцать три тысячи разрушений._"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart4_TEST_2(chatId, messageId) {
        const buttons = [
            [
                {text: `метеорит`, callback_data: this.callbackData.GESAR_PART4_TEST_no},
                {text: `камень`, callback_data: this.callbackData.GESAR_PART4_TEST_no},
            ],
            [
                {text: `золото`, callback_data: this.callbackData.GESAR_PART4_TEST_no},
                {text: `алмаз`, callback_data: this.callbackData.GESAR_PART4_TEST_2_yes},
            ]
        ]
        const caption = "_Из какого материала был сделан камень, которым Заса-Мэргэн подбил Гал-Нурмана с небес?_"
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }

    answerInlinePart4_TEST_2_yes(callbackId, chatId, messageId) {
        this.answerCallback(callbackId, TEST_QUERY_yes)

        const buttons = this.getStoryButtons(
            this.callbackData.GESAR_PART4_TEST_0, `Назад`,
            this.callbackData.QUEST_END, `Конец?`
        )
        const caption =
            "Правильно! На этом четвертая Ветвь приключений Гэсэра заканчивается."
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, caption)
    }


    answerInlineQuestEnd(chatId, messageId) {
        const buttons = [
            [
                {text: `Зов Добра`, url: "https://t.me/agregator_zovdobra/39"},
                {text: `Песня о Гэсэре`, url: "https://www.youtube.com/watch?v=uBJpeLkFKJ8"},
            ],
            [
                {text: `Назад`, callback_data: this.callbackData.GESAR_PART3_TEST_2_yes},
                {text: `В главное меню`, callback_data: this.callbackData.BACK_TO_START_HARD},
            ]
        ]
        this.deleteAndSendPhoto(chatId, messageId, ARSALAN_FRONT, buttons, QUEST_END)
    }

    answerInlineAddKarma(callback_d, chat_id, karma) {
        this.addKarma(chat_id, karma)
        let answer = `Мы начислили тебе ${karma} Karma. \n\n`;
        this.bot.answerCallbackQuery(callback_d, {text: answer}).then(r => r)
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
                this.main_menu_button
            ]
        ]
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
            parse_mode: `Markdown`,
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
