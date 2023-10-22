import dotenv from 'dotenv';

import { bot } from './sources/botUtils.js'
import { tgMsgHandler } from './sources/messages_handler.js'
import { callbackData } from "./sources/consts/callbackData.js"
dotenv.config()


bot.on('message', async (msg) => {
    // console.log(`message received: ${msg.photo}, ${msg.video}, ${msg.document}, ${msg.animation}`)
})

bot.on('text', async (msg) => {
    const chat_id = msg.chat.id;
    const text = msg.text;
    const from_user = {
        id: msg.from.id,
        username: msg.from.username,
    }
    console.log(`@${from_user.username} прислал сообщение:\n ${text}`)

    if (!chat_id) {
        console.log('chat_id in msg is null');
        return;
    }

    if (text[0] === "/") {
        const arr = text.split(" ");
        const command = arr[0];

        if (command === '/start') {
            tgMsgHandler.handleStart(chat_id, from_user.username);
        }
    } else if (text.toLowerCase().includes("отзыв")) {

        const feedback = `@${from_user.username} прислал:\n ${text}`
        await bot.sendMessage(process.env.REVIEW_GROUP_ID, feedback)

        const answer = "Спасибо за ваш отзыв!"
        await bot.sendMessage(from_user.id, answer)
    } else {
        const answer = "Я не понимаю вас 😢"
        await bot.sendMessage(from_user.id, answer)
    }

});


bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const sender = {
        id: callbackQuery.from.id,
        username: callbackQuery.from.username,
        action: callbackQuery.data,
        callback_id: callbackQuery.id,
    };
    const msg = callbackQuery.message;
    let opts = {
        caption: msg.text ? msg.text : msg.caption,
        chat_id: msg.chat.id,
        message_id: msg.message_id,
        text_type: `caption`,
        inline_message_id: callbackQuery.inline_message_id
    };

    const params = {
        chatId: sender.id,
        messageId: opts.message_id,
        callbackId: sender.callback_id
    }

    try {
        if (sender.action.indexOf(':') >= 0) {
            const qry = sender.action.split(':')
            if (!qry.length) {
                throw error(`Error: length of callbackQuery.data ${sender.action} invalid`)
            }

            if (qry[0] === "gesar") {
                tgMsgHandler.chapterHandler.handleCallbackQuery(qry.slice(1), params)
            }


        }
    } catch (error) {
        console.log(`Error: ${error}`)
    }


    console.log(`Got callback_query "${sender.action}" from ${opts.chat_id}`)
    try {
        switch (sender.action) {
            case callbackData.GESAR_EPOS:
                tgMsgHandler.answerGesarEpos(opts.chat_id, opts.message_id)
                break

            case callbackData.ZOV_DOBRA:
                tgMsgHandler.answerAboutZovDobra(opts.chat_id, opts.message_id)
                break

            case callbackData.TABLE_OF_CONTENTS:
                tgMsgHandler.answerTableOfContents(opts.chat_id, opts.message_id)
                break

            case callbackData.START_QUEST:
                tgMsgHandler.answerInlineStartQuest(opts.chat_id, opts.message_id)
                break

            case callbackData.GESAR_EPOS_DESCR:

                break

            case callbackData.BACK_TO_START:
                tgMsgHandler.answerInlineBackToStart(opts.chat_id, opts.message_id)
                break

            case callbackData.BACK_TO_START_HARD:
                tgMsgHandler.answerInlineBackToStartHard(opts.chat_id, opts.message_id)
                break

            case callbackData.BECOMING:
                tgMsgHandler.answerInlineBecoming(opts.chat_id, opts.message_id)
                break

            case callbackData.BACK_TO_QUEST_START:
                tgMsgHandler.answerInlineBackToQuestStart(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_1_1:
                tgMsgHandler.answerInlinePart4_1_1(sender.id, opts.message_id)
                // tgMsgHandler.answerInlineQuestEnd(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_1_2:
                tgMsgHandler.answerInlinePart4_1_2(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_2_1:
                tgMsgHandler.answerInlinePart4_2_1(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_2_2:
                tgMsgHandler.answerInlinePart4_2_2(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_3_1:
                tgMsgHandler.answerInlinePart4_3_1(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_3_2:
                tgMsgHandler.answerInlinePart4_3_2(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_4_1:
                tgMsgHandler.answerInlinePart4_4_1(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_4_2:
                tgMsgHandler.answerInlinePart4_4_2(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_TEST_0:
                tgMsgHandler.answerInlinePart4_TEST_0(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_TEST_1:
                tgMsgHandler.answerInlinePart4_TEST_1(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_TEST_no:
                tgMsgHandler.answerInlinePart4_TEST_no(sender.callback_id)
                break

            case callbackData.GESAR_PART4_TEST_1_yes:
                tgMsgHandler.answerInlinePart4_TEST_1_yes(sender.callback_id, sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_TEST_2:
                tgMsgHandler.answerInlinePart4_TEST_2(sender.id, opts.message_id)
                break

            case callbackData.GESAR_PART4_TEST_2_yes:
                tgMsgHandler.answerInlinePart4_TEST_2_yes(sender.callback_id, sender.id, opts.message_id)
                break

            case callbackData.QUEST_END:
                tgMsgHandler.answerInlineQuestEnd(sender.id, opts.message_id)
                break

            case callbackData.ADD_KARMA:
                const karma = 10;
                tgMsgHandler.answerInlineAddKarma(callback_id, sender.id, karma)
                break
       }
    } catch (error) {
        console.log(`Error occured while handling callback_query: ${error}`)
    }
});