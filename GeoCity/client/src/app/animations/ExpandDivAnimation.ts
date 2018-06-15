import { trigger, state, style, transition, animate } from '@angular/animations';

export const ExpandAnimation = [
    trigger('Expand', [
        state('hide', style({
            height: '100px'
        })),
        state('show', style({
            height: '250px'
        })),
        transition("hide => show", animate('500ms ease-in')),
        transition("show => hide", animate('500ms ease-out'))
    ]
)
]