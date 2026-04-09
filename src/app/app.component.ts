import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SHARED_IMPORTS } from './shared/shared-imports';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SHARED_IMPORTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'proyecto-introduccion';
  private loadingService = inject(LoadingService);

  // Expose the loading$ observable for the template
  loading$ = this.loadingService.loading$;
}
