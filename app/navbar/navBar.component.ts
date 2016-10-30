import { Component } from "angular2/core";
import { ROUTER_DIRECTIVES ,Router} from 'angular2/router';

@Component({
    selector: "navbar",
    templateUrl: "app/navbar/navBar.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class NavBarComponent {

    constructor(private _router: Router) {

    }

   public isCurrentRouter(router) {
        console.log(router);
        var instruction = this._router.generate(route);
        return this._router.isRouteActive(instruction);
    }
}