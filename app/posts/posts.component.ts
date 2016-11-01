import { Component, OnInit } from "@angular/core";
import { PostsService } from './posts.service';
import { SpinnerComponent } from "../share/ui/spinner.component";
import { UsersService } from "../users/users.service";
import { PaginationComponent } from '../share/ui/pagination.component';


@Component({
    selector: "posts",
    templateUrl: "app/posts/posts.component.html",
    directives: [SpinnerComponent, PaginationComponent],
    providers: [PostsService, UsersService]
})
export class PostsComponent implements OnInit {
    posts = [];
    pagedPosts = []
    pageSize = 10;
    users = [];
    currentPost: any;
    isLoadingPosts: boolean = true;
    isLoadingComments: boolean = false;
    constructor(private _postService: PostsService,
        private _usersService: UsersService) {

    }

    ngOnInit() {
        this.loadUsers();
        this.loadPosts();
    }

    private loadUsers() {
        this._usersService.getUsers()
            .subscribe(users => this.users = users);
    }

    private loadPosts(filter?) {
        this.isLoadingPosts = true;
        this._postService.getPosts(filter)
            .subscribe(posts => {
                this.posts = posts;
                // this.pagedPosts = this.getPostsInPage(1);
                this.pagedPosts = _.take(this.posts, this.pageSize);//using underscrore lib
            }, null, () => {
                this.isLoadingPosts = false;
            });
    }

    reloadPosts(filter) {
        this.currentPost = null;
        this.loadPosts(filter);
    }

    onPageChanged(page) {
        // this.pagedPosts = this.getPostsInPage(page);
        var startingIndex = (page - 1) * this.pageSize;
        this.currentPost = null;
        this.pagedPosts = _.take(_.rest(this.posts, startingIndex), this.pageSize);
    }

    // private getPostsInPage(page) {
    //     var result = [];
    //     var startingIndex = (page - 1) * this.pageSize;
    //     var endIndex = Math.min(startingIndex + this.pageSize, this.posts.length);
    //     for (var i = startingIndex; i < endIndex; i++) {
    //         console.log(i);
    //         result.push(this.posts[i]);
    //     }

    //     console.log(result);
    //     return result;
    // }

    selectPost(post: any) {
        this.isLoadingComments = true;
        this.currentPost = post;
        this._postService.getComments(post.id)
            .subscribe(comments =>
                this.currentPost.comments = comments, null, () => {
                    this.isLoadingComments = false;
                });
    }
}