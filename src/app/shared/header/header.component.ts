import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink, RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
nombreUsuario:string = '';
bandera:boolean = false;

constructor(private loginService:LoginService,private router: Router) { }

  ngOnInit(): void {
    //console.log(this.loginService.getTokenDecoded());

    if (this.loginService.getTokenDecoded().sub=="Admin") {
      //console.log('entra');
      this.bandera = true;

      this.nombreUsuario = this.loginService.getTokenDecoded().sub;

    }

    //this.bandera = this.loginService.isAuthenticated();
  }

  logOut() {
    this.loginService.removeLocalStorge();
    this.router.navigate(['/login']);
  }

}
