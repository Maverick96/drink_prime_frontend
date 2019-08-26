import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeadsService } from '../shared/services/leads.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css']
})
export class LeadListComponent implements OnInit, OnDestroy {

  constructor(private leadService: LeadsService,
    private toastrService: ToastrService,
    private router: Router) {
    this.sortBy = this.columnList[0];
    this.limit = this.paginationList[0];
  }
  leadList$: Subscription;
  offset: number = 0;
  limit: number;
  currentPage: number = 1;
  leadListData: any[] = [];
  sortBy: any = {};
  totalItems: number = 0;
  columnList: any[] = [
    {
      text: 'LeadId',
      id: 'leadId',
      sortAsc: true
    },
    {
      text: 'Name',
      id: 'name',
      sortAsc: true
    },
    {
      text: 'Enquiry Date',
      id: 'createdAt',
      sortAsc: true
    },
    {
      text: 'Mobile',
      id: 'mobile',
      sortAsc: true
    }

  ]
  paginationList: number[] = [5, 10, 20, 50, 100];

  ngOnInit() {
    this.fetchList();
  }

  fetchList() {
    console.log("FETCH ")
    let sort = this.sortBy['id'];
    if (!this.sortBy['sortAsc']) {
      sort = '-' + sort;
    }

    this.leadList$ = this.leadService.getLeadsList(sort, this.offset, this.limit).subscribe(res => {
      console.log(res)
      if (res['data']) {
        this.leadListData = res['data'];
        this.totalItems = res['total'];
      } else {
        this.leadListData = [];
        this.totalItems = 0;
      }

    },
      err => {
        this.toastrService.error("Lead List Failed", '', {
          timeOut: 3000
        })
        console.error(err)
      })
  }

  openDetails(id) {
    console.log(id);
    this.router.navigate(['lead-details', id])
  }

  changeSort(column) {
    if (column['id'] === this.sortBy['id']) {
      this.sortBy['sortAsc'] = !this.sortBy['sortAsc'];
    } else {
      this.sortBy = column;
    }
    this.fetchList();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.offset = (this.currentPage - 1) * this.limit;
      this.fetchList();
    }
  }

  nextPage() {
    if (this.currentPage * this.limit < this.totalItems) {
      this.offset = this.currentPage * this.limit;
      this.currentPage++;
      this.fetchList();
    }
  }

  changePagination(event) {
    this.offset = 0;
    this.sortBy = this.columnList[0];
    this.fetchList();
  }

  ngOnDestroy() {
    if (this.leadList$) {
      this.leadList$.unsubscribe();
    }
  }

}
