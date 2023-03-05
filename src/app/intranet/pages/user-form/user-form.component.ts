import { Component, OnInit } from '@angular/core';
import { IdI, UserI } from 'src/app/modeles/id-i';
import { UserService } from '../../services/user.service';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: UserI = <UserI>{};
  userId: IdI = <IdI>{};
  id:string=''

  constructor(public userService:UserService, private route:ActivatedRoute, private router:Router) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams
      .subscribe(params => {
          console.log(params);
          this.id = params['id'];
        }
      );
    if(this.id)
    {
      await this.userService.getUserByUid(this.id)
      this.user=this.userService.user
      console.log(this.user)
    }
  }

  updateUser():void{
    this.userService.updateFireUser(this.user).then(r=>console.log(r))
    this.router.navigateByUrl('/intranet/userManagement')
  }
  createUser(): void {
    if (this.userService.idInListUsers(this.user.uid)){
      console.log("In the list");
      alert("User already exists");
    }else{
      this.userService.createAuthUser(this.user, this.userId);
      this.router.navigateByUrl('/intranet/userManagement')
    }
  }
}
