import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";



export const SHARED_MODULES = [
  TranslateModule,
  CommonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  RouterModule
];
