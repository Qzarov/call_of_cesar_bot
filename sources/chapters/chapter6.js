import { botUtils } from '../botUtils.js'
import { text } from "../consts/text.js"
import { pictures } from "../consts/media.js"
import { callbackData } from "../consts/callbackData.js"
import { getStoryButtons, getTestButtons } from "./utils.js"

export class Chapter6Handler {
    handleCallbackQuery(qry, params) {
        console.log(`Chapter5Handler.handleCallbackQuery:`, JSON.stringify(qry))
        if (qry.length >= 1) {
            switch (qry[0]) {
                case "1":
                    this.answerInlinePart1(qry.slice(1), params)
                    break
                case "2":
                    this.answerInlinePart2(qry.slice(1), params)
                    break
                case "3":
                    this.answerInlinePart3(qry.slice(1), params)
                    break
                case "test":
                    this.answerInlineTest(qry.slice(1), params)
                    break
            }
        }
    }

    answerInlinePart1(qry, params) {
        console.log(`Chapter6Handler.answerInlinePart1:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART5_TEST_0, `Назад`,
                    callbackData.GESAR_PART6_1_2, `Какие беды он принес?`
                ),
                picture: pictures.PART6_1_PIC,
                text: text.PART6_1_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART6_1_1, `Назад`,
                    callbackData.GESAR_PART6_2_1, `Что было дальше?`
                ),
                picture: pictures.PART6_1_PIC,
                text: text.PART6_1_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart2(qry, params) {
        console.log(`Chapter6Handler.answerInlinePart2:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART6_1_2, `Назад`,
                    callbackData.GESAR_PART6_2_2, `Какое сильное чудище!`
                ),
                picture: pictures.PART6_2_PIC,
                text: text.PART6_2_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART6_2_1, `Назад`,
                    callbackData.GESAR_PART6_3_1, `Они помогли ему?`
                ),
                picture: pictures.PART6_2_PIC,
                text: text.PART6_2_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart3(qry, params) {
        console.log(`Chapter6Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART6_2_2, `Назад`,
                        callbackData.GESAR_PART6_3_2, `И правда чудотворный`
                    ),
                picture: pictures.PART6_3_PIC,
                text: text.PART6_3_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART6_3_1, `Назад`,
                        callbackData.GESAR_PART6_TEST_0, `Наконец-то!`
                    ),
                picture: pictures.PART6_3_PIC,
                text: text.PART6_3_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlineTest(qry, params) {
        let answerData = {}

        if (qry[0] === "0") {
            answerData = this.getTest0Data(qry)
        } else if (qry[0] === "1") {
            answerData = this.getTest1Data(qry, params)
        } else if (qry[0] === "2") {
            answerData = this.getTest2Data(qry, params)
        } else if (qry[0] === "no") {
            botUtils.answerCallback(params.callbackId, text.TEST_QUERY_no)
            return
        }

        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    getTest0Data(query) {
        return {
            buttons: getStoryButtons(
                    callbackData.GESAR_PART6_3_2, `Назад`,
                    callbackData.GESAR_PART6_TEST_1, `Первый вопрос`
                ),
            picture: pictures.ARSALAN_FRONT,
            text: "_Мы и дошли до конца шестой ветви. К вопросам?_",
        }
    }

    getTest1Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `На окраинах земель Хонин-хото`, callbackData.GESAR_PART6_TEST_no,
                    `Близ горы Сумбэр`, callbackData.GESAR_PART6_TEST_no,
                    `В Средиземном царстве`, callbackData.GESAR_PART6_TEST_no,
                    `В краю дальше от счастья`, callbackData.GESAR_PART6_TEST_1_yes,
                ),
                text: "_Где обитало свирепое чудовище Шэрэм-Мината? _",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons:[
                        [
                            {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART6_TEST_2},
                        ]
                    ],
                    text: "_Свирепое чудовище Шэрэм-Мината обитало в краю ближе к смерти, дальше от счастья_",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }

    getTest2Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Бронза`, callbackData.GESAR_PART6_TEST_no,
                    `Кевлар`, callbackData.GESAR_PART6_TEST_no,
                    `Чугун`, callbackData.GESAR_PART6_TEST_2_yes,
                    `Сталь`, callbackData.GESAR_PART6_TEST_no,
                ),
                text: "_Из чего было сделано главное оружие демона Шэрэм-Мината, которым он уничтожал все живое? _",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons: getStoryButtons(
                        callbackData.GESAR_PART6_TEST_0, `Назад`,
                        callbackData.GESAR_PART7_1_1, `Ветвь 6`
                    ),
                    text: "Правильно! Вот и пятая Ветвь приключений Гэсэра позади.",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }
}