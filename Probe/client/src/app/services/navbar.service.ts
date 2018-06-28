import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavbarService {
onPageChange = new Subject<boolean>();
    visible: boolean = true;
    isLoggedIn: boolean = false;

    constructor() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

}
