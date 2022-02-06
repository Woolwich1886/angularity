import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from '../models/question-model';
import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
  isFinished: Observable<boolean>;
  questions$: Observable<Question[]>;
  totalQuestions: Observable<number>;
  result$: Observable<number>;
  amount$: Observable<string>;

  constructor(private service: TestService) { }

  ngOnInit(): void {
    //TODO: использовать ngForm и FormArray, имплементация ControlValueAccessor???
    this.questions$ = this.service.getQuestions();
    this.isFinished = this.service.getIsTestDone();
    this.totalQuestions = this.questions$.pipe(map(value => value.length));
  }

  resetAnswers(): void {
    this.service.resetAnswers();
  }

  needAnswers(): void {
    this.service.needAnswers();
    this.result$ = this.questions$.pipe(map(value => value.reduce((total, q) => q.isAnswerCorrect ? ++total : total, 0)));
    this.amount$ = combineLatest([this.result$, this.totalQuestions])
      .pipe(map(([result, total]) => `Правильных ответов: ${result} из ${total}`));
  }

  chooseAnswer(questionId: number, answerId: number): void {
    this.service.chooseAnswer(questionId, answerId);
  }
}