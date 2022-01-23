import { Answer } from "./anwser-model";

export interface Question {
    /**
     * Порядковый номер вопроса
     */
    id: number;

    /**
     * Текст вопроса
    */
    text: string;

    /**
     * Ответы
     */
    answers: Answer[];

    /**
     * Номер выбранного ответа
     */
    choosenAnswer?: number;

    /**
     * Номер правильного ответа
     */
    correctAnswer: number;

    /**
     * Номер выбранного ответа
     */
    isAnswerCorrect?: boolean;
}