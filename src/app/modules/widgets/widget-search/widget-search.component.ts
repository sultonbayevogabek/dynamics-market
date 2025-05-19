import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-widget-search',
  templateUrl: './widget-search.component.html'
})
export class WidgetSearchComponent implements OnInit {
  searchControl = new FormControl(null);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const searchParam = this.activatedRoute.snapshot.queryParams['search'];
    if (searchParam) {
      this.searchControl.setValue(searchParam);
    }
  }

  async onSubmit() {
    let searchValue: string = this.searchControl.value?.trim();

    await this.router.navigate([], {
      queryParams: {
        search: searchValue || null
      },
      relativeTo: this.activatedRoute
    });
  }
}
