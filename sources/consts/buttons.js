import { callbackData } from "./callbackData.js"

const start_menu_buttons = [
    [
        {text: `Об эпосе Гэсэр`, callback_data: callbackData.GESAR_EPOS},
        {text: `О проекте "Зов Добра"`, callback_data: callbackData.ZOV_DOBRA},
    ],
    [
        {text: `Оглавление`, callback_data: callbackData.TABLE_OF_CONTENTS},
    ],
    [
        {text: `Начать квест`, callback_data: callbackData.START_QUEST}
    ]
]

const quest_started_buttons = [
    [
        {text: `Путь Героя`, callback_data: callbackData.GESAR_PART1_1},
        {text: `Гэсэр. Становление`, callback_data: callbackData.BECOMING},
    ],
    [
        {text: `Назад`, callback_data: callbackData.BACK_TO_START_HARD},
    ]
]

const main_menu_button = {text: `Главное меню`, callback_data: callbackData.BACK_TO_START_HARD}

const answer_gesar_epos = [
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
        {text: `Собрание изданий`, url: "https://taplink.cc/zovgesera", callback_data: callbackData.ADD_KARMA},
    ],
    [
        {text: `Назад`, callback_data: callbackData.BACK_TO_START}
    ]
]

const about_zov_dobra = [
    [
        {text: `Видео о проекте`, url: "https://www.youtube.com/watch?v=QrXqdpT5z_4"},
    ],
    [
        {text: `Чат сообщества`, url: "https://t.me/agregator_zovdobra"},
        {text: `Бот Добра`, url: "https://t.me/ZovDobraBot"},
    ],
    [
        {text: `Назад`, callback_data: callbackData.BACK_TO_START}
    ]
]

const table_of_contents = [
    [
        {text: `Ветвь 1`, callback_data: callbackData.GESAR_PART1_1},
        {text: `Ветвь 2`, callback_data: callbackData.GESAR_PART2_1_1},
    ],
    [
        {text: `Ветвь 3`, callback_data: callbackData.GESAR_PART3_1_1},
        {text: `Ветвь 4`, callback_data: callbackData.GESAR_PART4_1_1},
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
        {text: `Ветвь 9 (появится позднее)`, callback_data: callbackData.BACK_TO_START},
    ],
    [
        {text: `Назад`, callback_data: callbackData.BACK_TO_START}
    ]
]

export const buttons = {
    start_menu_buttons,
    quest_started_buttons,
    main_menu_button,
    answer_gesar_epos,
    about_zov_dobra,
    table_of_contents,
}