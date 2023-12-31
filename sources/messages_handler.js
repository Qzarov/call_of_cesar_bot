import { text } from "./consts/text.js"
import { pictures, audio } from "./consts/media.js"
import { callbackData } from "./consts/callbackData.js"
import { botUtils } from "./botUtils.js"
import { constButtons } from "./consts/buttons.js"
import { ChaptersHandler } from "./chapters/chaptersHandler.js"
import { db } from './db.js'

class MessagesHandler {
    constructor() {
        this.chapterHandler = new ChaptersHandler()
    }

    handleStart(chatId, username) {
        this.writeLog('', `user ${username} id ${chatId} send command 'start'`);

        db.addUser(chatId, username, (is_new_user) => {});
        botUtils.sendPhoto(chatId, pictures.START_PIC, constButtons.start_menu_buttons, text.START_TEXT)
    }

    answerGesarEpos(chatId, messageId) {
        botUtils.editReplyMarkupAndCaption(chatId, messageId, constButtons.answer_gesar_epos, text.ABOUT_EPOS)
    }

    answerAboutZovDobra(chatId, messageId) {
        botUtils.editReplyMarkupAndCaption(chatId, messageId, constButtons.about_zov_dobra, text.ABOUT_ZOV_DOBRA)
    }

    answerTableOfContents(chatId, messageId) {
        botUtils.editReplyMarkupAndCaption(chatId, messageId, constButtons.table_of_contents, text.TABLE_OF_CONTENTS_TEXT)
    }

    answerInlineBackToStart(chatId, messageId) {
        botUtils.editReplyMarkupAndCaption(chatId, messageId, constButtons.start_menu_buttons, text.START_TEXT)
    }

    answerInlineBackToStartHard(chatId, messageId) {
        botUtils.deleteAndSendPhoto(chatId, messageId, pictures.START_PIC, constButtons.start_menu_buttons, text.START_TEXT)
    }

    answerInlineStartQuest(chatId, messageId) {
        botUtils.deleteAndSendPhoto(chatId, messageId, pictures.START_PIC, constButtons.quest_started_buttons, text.GREETING_MESSAGE)
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
        botUtils.deleteAndSendAudio(chatId, messageId, audio.BECOMING_AUDIO, buttons, text.BECOMING_AUDIO_MESSAGE)
    }

    answerInlineBackToQuestStart(chatId, messageId) {
        botUtils.deleteAndSendPhoto(chatId, messageId, pictures.START_PIC, constButtons.quest_started_buttons, text.GREETING_MESSAGE)
    }

    answerInlineQuestEnd(chatId, messageId) {
        const buttons = [
            [
                {text: `Зов Добра`, url: "https://t.me/agregator_zovdobra/39"},
                {text: `Песня о Гэсэре`, url: "https://www.youtube.com/watch?v=uBJpeLkFKJ8"},
            ],
            [
                {text: `Назад`, callback_data: callbackData.GESAR_PART8_TEST_0},
                {text: `В главное меню`, callback_data: callbackData.BACK_TO_START_HARD},
            ]
        ]
        botUtils.deleteAndSendPhoto(chatId, messageId, pictures.ARSALAN_FRONT, buttons, text.QUEST_END)
    }

    answerInlineAddKarma(callback_d, chat_id, karma) {
        this.addKarma(chat_id, karma)
        let answer = `Мы начислили тебе ${karma} Karma. \n\n`;
        botUtils.bot.answerCallbackQuery(callback_d, {text: answer}).then(r => r)
    }


    /*
    *   Service functions
    */

    addKarma(chatId, karma) {
        db.updateKarma(chatId, karma)
    }

    getStoryButtons(prev_step, prev_step_text, next_step, next_step_text) {
        return [
            [
                {text: next_step_text, callback_data: next_step},
            ],
            [
                {text: prev_step_text, callback_data: prev_step},
                constButtons.main_menu_button
            ]
        ]
    }

    writeLog(file, message) {
        console.log(`${new Date()} ${message}`)
    }

}

export const tgMsgHandler = new MessagesHandler()