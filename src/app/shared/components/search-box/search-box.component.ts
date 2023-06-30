import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, Subject, Subscription} from "rxjs";

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debounce: Subject<string> = new Subject<string>();
  private debounceSubscription?: Subscription;
  @Input()
  placeholder: string = '';
  @Input()
  initialValue: string = '';
  @Output()
  onValue: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.debounceSubscription = this.debounce
      .pipe(
        debounceTime(800)
      )
      .subscribe(value => this.onDebounce.emit(value));
  }

  ngOnDestroy(): void {
    this.debounceSubscription?.unsubscribe();
  }

  searchTerm(value: string) {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.debounce.next(searchTerm);
  }
}
