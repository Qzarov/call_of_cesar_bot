

export class MessagesHandler {
    constructor(bot, db) {
        this.bot = bot;
        this.db = db;
    }

    callbackData = {
        START: "start_quest",
        ADD_KARMA: "add_karma",
        GESAR_PART1: "gesar_part1"
    }

    handleStart(chatId, username) {
        this.writeLog('', `user ${username} id ${chatId} send command 'start'`);
        this.db.addUser(chatId, username, (is_new_user) => {});
        let answer = `Добро пожаловать в квест-бот о приключениях Гэсэра! 🎉`;
        const buttons = [
            [
                {text: `Об эпосе Гэсэр`, url: `https://www.youtube.com/watch?v=tgoMOaVuedU`},
                {text: `Видео "Земля Героев. Гэсэр"`, url: `https://www.youtube.com/watch?v=tgoMOaVuedU`},
            ],
            [
                {text: `Бот "Зов Добра"`, url: `https://t.me/ZovDobraBot`},
                {text: `О проекте "Зов Добра"`, url: `https://t.me/ZovDobraBot`},
            ],
            [
                {text: `Начать квест`, callback_data: this.callbackData.START}
            ]
        ]
        this.bot.sendMessage(chatId, answer, {
            reply_markup: {
                inline_keyboard: buttons
            }
        }).then();
    }

    answerInlineStart(chatId, username) {
        this.writeLog('', `user ${username} send command 'start'`)
        let answer = `Готов встать на Путь Героя и начать путешествие?`;
        const buttons = [
            [
                {text: `Путь героя`, callback_data: this.callbackData.ADD_KARMA},
                {text: `Эпос "Гэсэр. Становление"`, callback_data: this.callbackData.GESAR_PART1},
            ]
        ]
        this.bot.sendMessage(chatId, answer, {
            reply_markup: {
                inline_keyboard: buttons
            }
        }).then(r => r)
    }

    answerInlineAddKarma(chatId, karma) {
        this.db.updateKarma(chatId, karma)
        let answer = `Мы начислили тебе ${karma} Karma. \n\n` +
                     `Готов встать на Путь Героя и начать путешествие?`;
        const buttons = [
            [
                {text: `Путь героя`, callback_data: this.callbackData.ADD_KARMA},
                {text: `Эпос "Гэсэр. Становление"`, callback_data: this.callbackData.GESAR_PART1},
            ]
        ]
        this.bot.sendMessage(chatId, answer, {
            reply_markup: {
                inline_keyboard: buttons
            }
        }).then(r => r)
    }

    answerInlinePart1(chatId) {
        let answer = `Продолжение следует`;
        const buttons = [
            [
                {text: `Путь героя`, callback_data: this.callbackData.ADD_KARMA},
                {text: `Эпос "Гэсэр. Становление"`, callback_data: this.callbackData.GESAR_PART1},
            ]
        ]
        this.bot.sendMessage(chatId, answer, {
            reply_markup: {
                inline_keyboard: buttons
            }
        }).then(r => r)
    }

    writeLog(file, message) {
        console.log(`${new Date()} ${message}`)
    }

}
