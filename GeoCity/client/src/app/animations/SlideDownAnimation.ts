import { trigger, state, style, transition, animate, stagger } from '@angular/animations';

export const SlideAnimation = [
    trigger('Animation', [
        state('void', style({
            opacity: '0',
            transform: 'translateY(-20%)'
        })),
        state('*', style({
            opacity: '1',
            transform: 'translateY(1%)'
        })),
        transition("void => *", animate('500ms ease-in')),
        transition("* => void", animate('500ms ease-out'))
    ]
)
]