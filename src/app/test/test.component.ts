import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { questionList } from '../consts/questions-const';
import { Question } from '../models/question-model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
  isFinished: boolean;
  questions$: Observable<Question[]>;
  totalQuestions: Observable<number>;
  result$: Observable<number>;
  res$: Observable<string>;

  constructor() { }

  ngOnInit(): void {
    this.questions$ = of(questionList);
    this.isFinished = false;
    this.totalQuestions = this.questions$.pipe(map(value => value.length));
  }

  resetAnswers(): void {
    this.isFinished = false;
    let temp: Question[] = [];
    this.questions$.pipe(map(value => value.map(x => cancel(x)))).subscribe(value => temp = value).unsubscribe();
    this.questions$ = of(temp);
  }

  needAnswers(): void {
    this.isFinished = true;
    this.result$ = this.questions$.pipe(map(value => value.reduce((total, q) => q.isAnswerCorrect ? ++total : total, 0)));
    this.res$ = combineLatest([this.result$, this.totalQuestions]).pipe(map(([...values]) => `Правильных ответов: ${values[0]} из ${values[1]}`));
    this.result$.subscribe(x => console.log(x));
    this.res$.subscribe(x => console.log(x));
  }

  chooseAnswer(questionId: number, answerId: number): void {
    let temp: Question[] = [];
    this.questions$.pipe(map(value => checkAnswer(value, questionId, answerId))).subscribe(value => temp = value).unsubscribe();
    this.questions$ = of(temp);
    console.log(this.questions$);
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
  if (q.correctAnswer === q.choosenAnswer) {
    q.isAnswerCorrect = true;
  } else {
    q.isAnswerCorrect = false;
  }
  console.log(q.text, answerId);
  return questions;
}