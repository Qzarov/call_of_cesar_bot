import { Chapter1Handler } from "./chapter1.js"
import { Chapter2Handler } from "./chapter2.js"
import { Chapter3Handler } from "./chapter3.js"

const chapters = {
    chapter1: "part1",
    chapter2: "part2",
    chapter3: "part3",
    chapter4: "part4",
    // chapter5: "part5",
    // chapter6: "part6",
    // chapter7: "part7",
    // chapter8: "part8",
    // chapter9: "part9",
}

export class ChaptersHandler {
    constructor() {
        this.chapter1 = new Chapter1Handler()
        this.chapter2 = new Chapter2Handler()
        this.chapter3 = new Chapter3Handler()
        // this.chapter4 = new Chapter4Handler()
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
            }
        }
    }

    
}