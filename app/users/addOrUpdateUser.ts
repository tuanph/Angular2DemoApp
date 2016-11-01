import { Component, OnInit } from "@angular/core";
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { RouterLink } from '@angular/router-deprecated';
import { BasicValidators } from "../share/validators/basicValidators";
import { CanDeactivate, Router, RouteParams } from '@angular/router-deprecated';
import { UsersService } from "./users.service";
import { UserModel } from "./userModel";

@Component({
    templateUrl: "app/users/addOrUpdateUser.html",
    directives: [RouterLink],
    providers: [UsersService]
})

export class AddOrUpdateUserComponent implements CanDeactivate, OnInit {
    public form: ControlGroup;
    pageTitle = "Add User";
    isSaved: boolean = false;
    user: UserModel = new UserModel();

    constructor(private fb: FormBuilder, private _router: Router,
        private _usersService: UsersService,
        private _routeParams: RouteParams) {

        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', BasicValidators.emailFormat],
            phone: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []
            })
        });
    }

    ngOnInit() {
        var id = this._routeParams.get("id");
        this.pageTitle = id ? "Edit User" : "New User";
        if (!id)
            return;

        this._usersService.getUser(id)
            .subscribe(
            user => this.user = user,
            response => {
                if (response.status == 404) {
                    //this._router.navigate(['NotFound']);// not implement now
                }
            });
    }


    routerCanDeactivate() {
        if (this.form.dirty && !this.isSaved)
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        return true;
    }

    save() {

        var result;
        if (this.user.id)
            result = this._usersService.updateUser(this.user);
        else
            result = this._usersService.addUser(this.user)

        result.subscribe(x => {
            this.isSaved = true;
            this._router.navigate(['Users']);
        });
    }

}