import { botUtils } from '../botUtils.js'
import { text } from "../consts/text.js"
import { pictures } from "../consts/media.js"
import { callbackData } from "../consts/callbackData.js"
import { getStoryButtons, getTestButtons } from "./utils.js"

export class Chapter3Handler {
    handleCallbackQuery(qry, params) {
        console.log(`Chapter3Handler.handleCallbackQuery:`, JSON.stringify(qry))
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
        console.log(`Chapter3Handler.answerInlinePart1:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART2_TEST_0, `Назад`, 
                        callbackData.GESAR_PART3_1_2, `Что было дальше?`
                    ),
                picture: pictures.PART3_1_PIC,
                text: text.PART3_1_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART3_1_1, `Назад`,
                        callbackData.GESAR_PART3_2_1, `На совет Тэнгриев`
                    ),
                picture: pictures.PART3_1_PIC,
                text: text.PART3_1_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart2(qry, params) {
        console.log(`Chapter3Handler.answerInlinePart2:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART3_1_2, `Назад`,
                        callbackData.GESAR_PART3_2_2, `Подлый Архан!`
                    ),
                picture: pictures.PART3_2_PIC,
                text: text.PART3_2_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART3_2_1, `Назад`,
                        callbackData.GESAR_PART3_3_1, `Что стало с Арханом?`
                    ),
                picture: pictures.PART3_2_PIC,
                text: text.PART3_2_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart3(qry, params) {
        console.log(`Chapter3Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART3_2_2, `Назад`,
                        callbackData.GESAR_PART3_3_2, `Что сделал Архан-Шудхэр?`
                    ),
                picture: pictures.PART3_3_PIC,
                text: text.PART3_3_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART3_3_1, `Назад`,
                        callbackData.GESAR_PART3_3_3, `У них получилось?`
                    ),
                picture: pictures.PART3_3_PIC,
                text: text.PART3_3_2_TEXT
            }
        } else if (qry[0] === "3") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART3_3_2, `Назад`,
                        callbackData.GESAR_PART3_TEST_0, `Вот это история...`
                    ),
                picture: pictures.PART3_3_PIC,
                text: text.PART3_3_3_TEXT
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
                    callbackData.GESAR_PART3_3_3, `Назад`,
                    callbackData.GESAR_PART3_TEST_1, `Первый вопрос`
                ),
            picture: pictures.ARSALAN_FRONT,
            text: "_Вот мы и дошли до конца третьей ветви. Теперь традиционные вопросы!_",
        }
    }

    getTest1Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Туловище`, callbackData.GESAR_PART3_TEST_no,
                    `Голова`, callbackData.GESAR_PART3_TEST_1_yes, 
                    `Нога`, callbackData.GESAR_PART3_TEST_no,
                    `Рука`, callbackData.GESAR_PART3_TEST_no
                ),
                text: "_Из какой части тела Атай-Улана появился злобный демон Архан-Шудхэр?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons:[
                        [
                            {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART3_TEST_2},
                        ]
                    ],
                    text: "_Да! Демон Архан-Шудхэр появился из головы Атай-Улана!_",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }

    getTest2Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Завидовал силе Гэсэра`, callbackData.GESAR_PART3_TEST_no,
                    `Не мог простить обид`, callbackData.GESAR_PART3_TEST_no, 
                    `Из-за жажды золота`, callbackData.GESAR_PART3_TEST_no,
                    `Уведённые жёны`, callbackData.GESAR_PART3_TEST_2_yes
                ),
                text: "_Почему дядя Гэсэра Хара-Зутан пошел на предательство и сговор с Архан-Шудхэром?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons: getStoryButtons(
                        callbackData.GESAR_PART3_TEST_0, `Назад`,
                        callbackData.GESAR_PART4_1_1, `Идем дальше! (Ветвь 4)!`
                    ),
                    text: "_Бок о бок с Гэсэром вы прошли уже три ветви! Но приключения только начинаются!_",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }
}