import { botUtils } from '../botUtils.js'
import { text } from "../consts/text.js"
import { pictures } from "../consts/media.js"
import { callbackData } from "../consts/callbackData.js"
import { getStoryButtons, getTestButtons } from "./utils.js"

export class Chapter4Handler {
    handleCallbackQuery(qry, params) {
        console.log(`Chapter4Handler.handleCallbackQuery:`, JSON.stringify(qry))
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
        console.log(`Chapter4Handler.answerInlinePart1:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART3_TEST_0, `Назад`,
                    callbackData.GESAR_PART4_1_2, `Что было дальше?`
                ),
                picture: pictures.PART4_1_PIC,
                text: text.PART4_1_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART4_1_1, `Назад`,
                    callbackData.GESAR_PART4_2_1, `Они отправились в поход?`
                ),
                picture: pictures.PART4_1_PIC,
                text: text.PART4_1_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart2(qry, params) {
        console.log(`Chapter4Handler.answerInlinePart2:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART4_1_2, `Назад`,
                    callbackData.GESAR_PART4_2_2, `Началось сражение?`
                ),
                picture: pictures.PART4_2_PIC,
                text: text.PART4_2_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART4_2_1, `Назад`,
                    callbackData.GESAR_PART4_3_1, `Гал-Нурман сдался?`
                ),
                picture: pictures.PART4_2_PIC,
                text: text.PART4_2_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart3(qry, params) {
        console.log(`Chapter4Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART4_2_2, `Назад`,
                        callbackData.GESAR_PART4_3_2, `Неужели он проиграл?`
                    ),
                picture: pictures.PART4_3_PIC,
                text: text.PART4_3_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART4_3_1, `Назад`,
                        callbackData.GESAR_PART4_4_1, `Они успели помочь?`
                    ),
                picture: pictures.PART4_3_PIC,
                text: text.PART4_3_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart4(qry, params) {
        console.log(`Chapter4Handler.answerInlinePart4:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART4_3_2, `Назад`,
                        callbackData.GESAR_PART4_4_2, `Победа!`
                    ),
                picture: pictures.PART4_4_PIC,
                text: text.PART4_4_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART4_4_1, `Назад`,
                    callbackData.GESAR_PART4_TEST_0, `Дальше!`
                    ),
                picture: pictures.PART4_4_PIC,
                text: text.PART4_4_2_TEXT
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
                    callbackData.GESAR_PART4_4_2, `Назад`,
                    callbackData.GESAR_PART4_TEST_1, `Первый вопрос`
                ),
            picture: pictures.ARSALAN_FRONT,
            text: "_Вот мы и дошли до конца четвертой ветви. Теперь традиционные вопросы!_",
        }
    }

    getTest1Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `10 тысяч`, callbackData.GESAR_PART4_TEST_no,
                    `33 тысячи`, callbackData.GESAR_PART4_TEST_no,
                    `3 тысячи`, callbackData.GESAR_PART4_TEST_1_yes,
                    `200 тысяч`, callbackData.GESAR_PART4_TEST_no,
                ),
                text: "_Сколько превращений было в распоряжении Гал-Нурман Хана?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons:[
                        [
                            {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART4_TEST_2},
                        ]
                    ],
                    text: "_Абсолютно точно! В распоряжении Гал-Нурмана было десять тысяч коварств, три тысячи превращений и тридцать три тысячи разрушений._",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }

    getTest2Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `метеорит`, callbackData.GESAR_PART4_TEST_no,
                    `камень`, callbackData.GESAR_PART4_TEST_no,
                    `золото`, callbackData.GESAR_PART4_TEST_no,
                    `алмаз`, callbackData.GESAR_PART4_TEST_2_yes,
                ),
                text: "_Из какого материала был сделан камень, которым Заса-Мэргэн подбил Гал-Нурмана с небес?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons: getStoryButtons(
                        callbackData.GESAR_PART4_TEST_0, `Назад`,
                        callbackData.GESAR_PART5_1_1, `Ветвь 5`
                    ),
                    text: "Правильно! На этом четвертая Ветвь приключений Гэсэра заканчивается.",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }
}