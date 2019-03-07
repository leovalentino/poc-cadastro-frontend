import {Component, OnInit} from "@angular/core"
import { TokenStorageService } from "./auth/token-storage.service";

@Component({
  selector: 'mt-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  private roles: string[];
  private authority: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ADMINISTRADOR') {
          this.authority = 'administrador';
          return false;
         }
        this.authority = 'funcionario';
        return true;
      });
    }
  }

}
