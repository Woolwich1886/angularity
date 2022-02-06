import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { questionList } from '../consts/questions-const';
import { Question } from '../models/question-model';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private readonly questions$: Subject<Question[]>;
  private readonly isTestDone$: Subject<boolean>;

  private questions = questionList;

  result$: Observable<number>;
  res$: Observable<string>;

  constructor() {
    this.questions$ = new BehaviorSubject(this.questions);
    this.isTestDone$ = new BehaviorSubject<boolean>(false);
  }

  getQuestions(): Observable<Question[]> {
    return this.questions$.asObservable();
  }

  refreshQuestionsData(): void {
    return this.questions$.next(this.questions);
  }

  getIsTestDone(): Observable<boolean> {
    return this.isTestDone$.asObservable();
  }

  resetAnswers(): void {
    this.isTestDone$.next(false);
    this.questions.map(data => cancel(data));
    this.refreshQuestionsData();
  }

  needAnswers(): void {
    this.isTestDone$.next(true);
  }

  chooseAnswer(questionId: number, answerId: number): void {
    checkAnswer(this.questions, questionId, answerId);
    this.refreshQuestionsData();
  }
}

function cancel(question: Question): Question {
  question.choosenAnswer = undefined;
  question.isAnswerCorrect = undefined;
  return question;
}

function checkAnswer(questions: Question[], questionId: number, answerId: number): Question[] {
  const q = questions[questionId - 1];
  q.choosenAnswer = answerId;
  q.isAnswerCorrect = q.correctAnswer === q.choosenAnswer;
  return questions;
}
