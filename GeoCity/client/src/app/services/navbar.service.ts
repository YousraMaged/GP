import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
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
