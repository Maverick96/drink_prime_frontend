import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeadsService } from '../shared/services/leads.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.css']
})
export class LeadDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private leadService: LeadsService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private toastrService: ToastrService
  ) {
    const path = this.router.url.split('/')[1];
    console.log(path)
    if (path === 'lead-details') {
      this.isCreate = false;
      this.fetchDetails();
    } else {
      this.isCreate = true;
      this.createEmptyForm();
    }
  }
  leadDetails$: Subscription;
  createLead$: Subscription;
  leadId: number;
  createLeadForm: FormGroup;
  isCreate: boolean = false;
  isFormCreated: boolean = false;

  formValues = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    area: ''
  };
  ngOnInit() {
  }

  createEmptyForm() {
    this.createForm(this.formValues);
  }

  createForm(values) {
    this.createLeadForm = this.fb.group({
      name: [values.name, [Validators.required]],
      email: [values.email, [Validators.required, Validators.email]],
      mobile: [values.mobile, [Validators.required]],
      address: [values.address, Validators.required],
      area: [values.area, Validators.required]
    });
    this.isFormCreated = true;
  }

  fetchDetails() {
    this.leadId = this.route.snapshot.params['id'];
    const payload = {
      leadId: this.leadId
    }
    this.leadDetails$ = this.leadService.getLeadDetails(payload).subscribe(res => {
      console.log(res);
      if (res['data']['name']) {
        this.createForm(res['data'])
      } else {
        this.createEmptyForm();
      }
    },
      err => {
        this.createEmptyForm();
        console.error(err)
      })
  }

  back() {
    this.location.back();
  }

  onSubmit() {
    if (this.createLeadForm.valid && this.isCreate) {
      this.createLead$ = this.leadService.createLead(this.createLeadForm.value)
        .subscribe(res => {
          console.log(res)
          if (res['success']) {
            this.toastrService.success("Lead Creation Successfully", '', {
              timeOut: 3000
            });
            this.router.navigate(['lead-list'])
          } else {
            this.toastrService.error("Lead Creation Failed", '', {
              timeOut: 5000
            });
          }
        },
          err => {
            this.toastrService.error("Lead Creation Failed", '', {
              timeOut: 5000
            });
            console.error(err)
          })

    }
  }

  ngOnDestroy() {
    if (this.leadDetails$) {
      this.leadDetails$.unsubscribe();
    }
    if (this.createLead$) {
      this.createLead$.unsubscribe();
    }
  }

}
