import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const routeTransition = trigger('routeAnimations', [
  transition('* <=> *', [
    // Initial state of new route
    query(':enter, :leave', 
      style({ 
        position: 'absolute', 
        left: 0,
        width: '100%',
        opacity: 0
      }), 
      {optional: true}
    ),
    
    // Animation for new route entering
    query(':enter', [
      style({ opacity: 0 })
    ], {optional: true}),
    
    group([
      // Animate the leaving page
      query(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ], {optional: true}),
      
      // Animate the entering page  
      query(':enter', [
        animate('300ms 100ms ease-in', style({ opacity: 1 }))
      ], {optional: true})
    ])
  ])
]);

export const slideInFromRight = trigger('slideInFromRight', [
  transition(':enter', [
    style({ 
      transform: 'translateX(100%)',
      opacity: 0
    }),
    animate('300ms ease-out', style({ 
      transform: 'translateX(0%)',
      opacity: 1
    }))
  ])
]);