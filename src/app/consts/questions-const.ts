import { Question } from "../models/question-model";


export const questionList: Question[] = [
    {
        'id': 1,
        'text': 'Столица Бразилии?',
        'answers': [
            { 'id': 1, 'answerText': 'Сан-Пауло' },
            { 'id': 2, 'answerText': 'Бразилиа' },
            { 'id': 3, 'answerText': 'Буэнос-Айрес' },
            { 'id': 4, 'answerText': 'Крым' }
        ],
        'correctAnswer': 2
    },
    {
        'id': 2,
        'text': 'Кто перехватил власть на скотном дворе в одноименном романе Джорджа Оруэлла?',
        'answers': [
            { 'id': 1, 'answerText': 'Крысы' },
            { 'id': 2, 'answerText': 'Люди' },
            { 'id': 3, 'answerText': 'Свиньи' },
            { 'id': 4, 'answerText': 'Роботы' }
        ],
        'correctAnswer': 3
    },
    {
        'id': 3,
        'text': 'Отдел человеческого головного мозга, отвечающий за эмоции?',
        'answers': [
            { 'id': 1, 'answerText': 'Амигдала' },
            { 'id': 2, 'answerText': 'Мозжечок' },
            { 'id': 3, 'answerText': 'Гипоталамус' },
            { 'id': 4, 'answerText': 'Серое вещество' }
        ],
        'correctAnswer': 1
    },
    {
        'id': 4,
        'text': 'В каком фильме вместе сыграли Уильям Дефо, Джаред Лето и Кристиан Бэйл?',
        'answers': [
            { 'id': 1, 'answerText': 'Святые из Бундока' },
            { 'id': 2, 'answerText': 'Даласский Клуб Покупателей' },
            { 'id': 3, 'answerText': 'Власть' },
            { 'id': 4, 'answerText': 'Американский психопат' }
        ],
        'correctAnswer': 4
    }
];