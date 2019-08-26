import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoading: boolean;
  loader$: Subscription;
  constructor(private loadingService: LoaderService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.subscribeToLoaderService();
  }

  subscribeToLoaderService() {
    this.loader$ = this.loadingService.getLoaderState().subscribe(val => {
      this.isLoading = val;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.loader$) {
      this.loader$.unsubscribe();
    }
  }
}
