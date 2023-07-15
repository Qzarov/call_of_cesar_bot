import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import {DataBase} from './sources/db.js'
import {MessagesHandler} from './sources/messages_handler.js'

dotenv.config()


const BOT_TOKEN = process.env.BOT_TOKEN;

const db = new DataBase();
const bot = new TelegramBot(BOT_TOKEN, {polling: true});
const tgMsgHandler = new MessagesHandler(bot, db)


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

    console.log()

    if (sender.action === tgMsgHandler.callbackData
        .GESAR_EPOS) {
        tgMsgHandler.answerGesarEpos(opts.chat_id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .ZOV_DOBRA) {
        tgMsgHandler.answerAboutZovDobra(opts.chat_id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .BACK_TO_START) {
        tgMsgHandler.answerInlineBackToStart(opts.chat_id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .BACK_TO_START_HARD) {
        tgMsgHandler.answerInlineBackToStartHard(opts.chat_id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .START_QUEST) {
        tgMsgHandler.answerInlineStartQuest(opts.chat_id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .BECOMING) {
        tgMsgHandler.answerInlineBecoming(opts.chat_id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .BACK_TO_QUEST_START) {
        tgMsgHandler.answerInlineBackToQuestStart(sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART1_1) {
        tgMsgHandler.answerInlinePart1_1(sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART1_2_1) {
        tgMsgHandler.answerInlinePart1_2_1(sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART1_2_2) {
        tgMsgHandler.answerInlinePart1_2_2(sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART1_3) {
        tgMsgHandler.answerInlinePart1_3(sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART1_TEST_0) {
        tgMsgHandler.answerInlinePart1_TEST_0(sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART1_TEST_1) {
        tgMsgHandler.answerInlinePart1_TEST_1(sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART1_TEST_no) {
        tgMsgHandler.answerInlinePart1_TEST_no(sender.callback_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART1_TEST_1_yes) {
        tgMsgHandler.answerInlinePart1_TEST_1_yes(sender.callback_id, sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART1_TEST_2) {
        tgMsgHandler.answerInlinePart1_TEST_2(sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART1_TEST_2_yes) {
        tgMsgHandler.answerInlinePart1_TEST_2_yes(sender.callback_id, sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .GESAR_PART2_1) {
        tgMsgHandler.answerInlinePart2_1(sender.id, opts.message_id)

    } else if (sender.action === tgMsgHandler.callbackData
        .ADD_KARMA) {
        const karma = 10;
        tgMsgHandler.answerInlineAddKarma(callback_id, sender.id, karma)
    }

});