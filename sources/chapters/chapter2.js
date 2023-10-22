import { botUtils } from '../botUtils.js'
import { text } from "../consts/text.js"
import { pictures } from "../consts/media.js"
import { callbackData } from "../consts/callbackData.js"
import { getStoryButtons, getTestButtons } from "./utils.js"

export class Chapter2Handler {
    handleCallbackQuery(qry, params) {
        console.log(`Chapter1Handler.handleCallbackQuery:`, JSON.stringify(qry))
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
                case "4":
                    this.answerInlinePart4(qry.slice(1), params)
                    break
                case "test":
                    this.answerInlineTest(qry.slice(1), params)
                    break
            }
        }
    }

    answerInlinePart1(qry, params) {
        console.log(`Chapter2Handler.answerInlinePart1:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(callbackData.GESAR_PART1_TEST_0, `Назад`, callbackData.GESAR_PART2_1_2, `Что было дальше?`),
                picture: pictures.PART2_1_PIC,
                text: text.PART2_1_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(callbackData.GESAR_PART2_1_1, `Назад`, callbackData.GESAR_PART2_2_1, `В гости к Саргалу`),
                picture: pictures.PART2_1_PIC,
                text: text.PART1_2_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart2(qry, params) {
        console.log(`Chapter2Handler.answerInlinePart2:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(callbackData.GESAR_PART2_1_2, `Назад`, callbackData.GESAR_PART2_2_2, `На состязания!`),
                picture: pictures.PART2_2_PIC,
                text: text.PART2_2_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(callbackData.GESAR_PART2_2_1, `Назад`, callbackData.GESAR_PART2_3_1, `За второй женой!`),
                picture: pictures.PART2_2_PIC,
                text: text.PART2_2_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart3(qry, params) {
        console.log(`Chapter2Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART2_2_2, `Назад`, 
                        callbackData.GESAR_PART2_3_2, `Тэнгрии услышали?`
                    ),
                picture: pictures.PART2_3_PIC,
                text: text.PART2_3_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART2_3_1, `Назад`, 
                        callbackData.GESAR_PART2_4_1, `Что потом сделал Гэсэр?`
                    ),
                picture: pictures.PART2_3_PIC,
                text: text.PART2_3_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart4(qry, params) {
        console.log(`Chapter2Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART2_3_2, `Назад`,
                        callbackData.GESAR_PART2_4_2, `Третья жена?!`
                    ),
                picture: pictures.PART2_3_PIC,
                text: text.PART2_4_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART2_4_1, `Назад`,
                        callbackData.GESAR_PART2_TEST_0, `Тоже хочу дворец...`
                    ),
                picture: pictures.PART2_4_PIC,
                text: text.PART2_4_2_TEXT
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
                    callbackData.GESAR_PART2_4_1, `Назад`, 
                    callbackData.GESAR_PART2_TEST_1, `Первый вопрос`
                ),
            picture: pictures.ARSALAN_FRONT,
            text: "_На этом вторая ветвь подходит к концу, пора переходить к вопросам!_",
        }
    }

    getTest1Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Он родился крепышом`, callbackData.GESAR_PART2_TEST_no,
                    `В детстве был сопливым`, callbackData.GESAR_PART2_TEST_1_yes,
                    `Из-за буйного нрава`, callbackData.GESAR_PART2_TEST_no,
                    `Был красивым`, callbackData.GESAR_PART2_TEST_no,
                ),
                text: "_Почему небесного богатыря Бухэ-Бэлигтэ, будущего Гэсэра, прозвали в детстве Нюсата-Нюргай?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons:[
                        [
                            {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART2_TEST_2},
                        ]
                    ],
                    text: "_Это правда, богатырь Гэсэр в детстве был сопливым мальчиком!_",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }

    getTest2Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Для величия`, callbackData.GESAR_PART2_TEST_2_yes,
                    `Для истории`, callbackData.GESAR_PART2_TEST_no,
                    `Для защиты`, callbackData.GESAR_PART2_TEST_no,
                    `Для славы`, callbackData.GESAR_PART2_TEST_no,
                ),
                text: "_Для чего Нюсата-Нюргай получил на горе Сумбэр имя Гэсэр?_" +
                    "\n\n" +
                    "Подсказка: _«Если внимателен ты был путник, то историю эту услышать ты должен был…»_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons: getStoryButtons(
                        callbackData.GESAR_PART2_TEST_0, `Назад`,
                        callbackData.GESAR_PART3_1_1, `Продолжить приключения! (Ветвь 3)`
                    ),
                    text: "_Отлично! Вместе с богатырём Гэсэром вы прошли испытание по Ветви 2, так держать!_",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }
}