import { Component, OnInit } from "@angular/core";
import { UsersService } from "./users.service";
import { RouterLink } from "@angular/router-deprecated";
@Component({
    selector: "users",
    templateUrl: "app/users/users.component.html",
    directives: [RouterLink],
    providers: [UsersService]
})
export class UsersComponent implements OnInit {

    users: any[];

    constructor(private _service: UsersService) {

    }
    ngOnInit() {
        this._service.getUsers()
            .subscribe(users => this.users = users);
    }

    deleteUser(user) {
        if (confirm("Are you sure you want to delete " + user.name + "?")) {
            var index = this.users.indexOf(user)
            // Here, with the splice method, we remove 1 object
            // at the given index.
            this.users.splice(index, 1);

            this._service.deleteUser(user.id)
                .subscribe(null,
                err => {
                    alert("Could not delete the user.");
                    // Revert the view back to its original state
                    // by putting the user object at the index
                    // it used to be.
                    this.users.splice(index, 0, user);
                });
        }
    }
}