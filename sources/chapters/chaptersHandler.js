import { Chapter1Handler } from "./chapter1.js"
import { Chapter2Handler } from "./chapter2.js"
import { Chapter3Handler } from "./chapter3.js"
import { Chapter4Handler } from "./chapter4.js"
import { Chapter5Handler } from "./chapter5.js"
import { Chapter6Handler } from "./chapter6.js"
import { Chapter7Handler } from "./chapter7.js"
import { Chapter8Handler } from "./chapter8.js"

const chapters = {
    chapter1: "part1",
    chapter2: "part2",
    chapter3: "part3",
    chapter4: "part4",
    chapter5: "part5",
    chapter6: "part6",
    chapter7: "part7",
    chapter8: "part8",
    // chapter9: "part9",
}

export class ChaptersHandler {
    constructor() {
        this.chapter1 = new Chapter1Handler()
        this.chapter2 = new Chapter2Handler()
        this.chapter3 = new Chapter3Handler()
        this.chapter4 = new Chapter4Handler()
        this.chapter5 = new Chapter5Handler()
        this.chapter6 = new Chapter6Handler()
        this.chapter7 = new Chapter7Handler()
        this.chapter8 = new Chapter8Handler()
    }

    handleCallbackQuery(qry, params) {
        console.log(`ChaptersHandler.handleCallbackQuery:`, JSON.stringify(qry))
        if (qry.length >= 1) {
            switch (qry[0]) {
                case chapters.chapter1:
                    this.chapter1.handleCallbackQuery(qry.slice(1), params)
                    break
                case chapters.chapter2:
                    this.chapter2.handleCallbackQuery(qry.slice(1), params)
                    break
                case chapters.chapter3:
                    this.chapter3.handleCallbackQuery(qry.slice(1), params)
                    break
                case chapters.chapter4:
                    this.chapter4.handleCallbackQuery(qry.slice(1), params)
                    break
                case chapters.chapter5:
                    this.chapter5.handleCallbackQuery(qry.slice(1), params)
                    break
                case chapters.chapter6:
                    this.chapter6.handleCallbackQuery(qry.slice(1), params)
                    break                
                case chapters.chapter7:
                    this.chapter7.handleCallbackQuery(qry.slice(1), params)
                    break
                case chapters.chapter8:
                    this.chapter8.handleCallbackQuery(qry.slice(1), params)
                    break
            }
        }
    }

    
}