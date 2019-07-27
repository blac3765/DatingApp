import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private router:Router, public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
	this.authService.login(this.model).subscribe(next => {
	  this.alertify.success('Logged in successfully');
	}, error => {
	  this.alertify.error(error);
  }, () => {
	  this.router.navigate(['/matches']);
  });
  }

  loggedIn() {
	return this.authService.loggedIn();
  }

  logout() {
	localStorage.removeItem('token');
	this.alertify.message('Logged Out');
	this.router.navigate(['/home']);
  }
}
