import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouteConfig } from "@angular/router-deprecated";

import { NavBarComponent } from "./navbar/navBar.Component";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { PostsComponent } from "./posts/posts.component";
import { AddOrUpdateUserComponent } from "./users/addOrUpdateUser";

@RouteConfig([
    { path: "/", name: "Home", component: HomeComponent },

    { path: "/users", name: "Users", component: UsersComponent },
    { path: "/user/new", name: "NewUser", component: AddOrUpdateUserComponent },
    { path: "/user/edit/:id", name: "EditUser", component: AddOrUpdateUserComponent },

    { path: "/posts", name: "Posts", component: PostsComponent },
    { path: "/*other", name: "Other", redirectTo: ["Home"] }
])

@Component({
    selector: "my-app",
    templateUrl: "app/app.template.html",
    directives: [NavBarComponent, RouterOutlet]
})
export class AppComponent implements OnInit {

    ngOnInit() {
    }

}