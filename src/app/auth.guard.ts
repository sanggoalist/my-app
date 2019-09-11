import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private cookieService: CookieService, private router: Router,
    public dialog: MatDialog){}
  canActivate(): boolean{
    var isExpired = this.isExpired();
    if (!isExpired){
      this.openDialog("Please login again!");
      this.dialog.afterAllClosed.subscribe(res =>{
        this.router.navigate(["/login"]);
      })
    }
    return isExpired;
  }
  isExpired(): boolean {
    return this.cookieService.check("sang-app-chat");
  }
  openDialog(mes: string): void {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      width: '250px',
      data: {code: 1, name: mes}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
