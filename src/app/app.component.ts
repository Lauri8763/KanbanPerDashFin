import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const baseStyles = style({
  // display: 'block',
position: 'absolute',
top: 0,
left: 0,
width: '100%'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),


        query(':enter, :leave', [
          baseStyles
        ], {optional:true}),

      //  query(':enter', [
       //   style({ opacity: 0 })
       // ], { optional:true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }))
          ], { optional: true }),
            
  
          query(':enter', [
            style ({
              transform: 'translateX(50px)'
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'transalteX(0)'
            }))
          ], { optional: true })
        ])

      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),


        query(':enter, :leave', [
          baseStyles
        ], {optional:true}),

       // query(':enter', [
        //  style({ opacity: 0 })
       // ], { optional:true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ], { optional: true }),
            
  
          query(':enter', [
            style ({
              transform: 'translateX(-50px)'
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'transalteX(0)'
            }))
          ], { optional: true })
        ])

      ]),

      transition('* => secondary', [
        style({
          position: 'relative',
          //overflow: 'hidden'
        }),


        query(':enter, :leave', [
          baseStyles
        ], {optional:true}),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ], { optional: true }),
            
          query(':enter', [
            style ({
              transform: 'scale(1.2)'
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('secondary => *', [
        style({
          position: 'relative',
          //overflow: 'hidden'
        }),


        query(':enter, :leave', [
          baseStyles
        ], {optional:true}),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ], { optional: true }),
            
          query(':enter', [
            style ({
              transform: 'scale(0.8)'
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ])

    ]),
    trigger('bgAnim', [
      transition(':leave', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ]),

    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({
          opacity: 1
        }))
      ]),

      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  backgrounds: string[] = [
    'https://pbs.twimg.com/media/D3Q4KJbWkAIZBAi?format=jpg&name=4096x4096'
  ]

  loadingBGImage: boolean
  
  dateTime: Observable<Date>

  ngOnInit(): void {
  this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date()
      })
    )
  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab']
      if (!tab) return 'secondary'
      return tab
  }
}

  async changeBGImage() {
    this.loadingBGImage = true

  const result = await fetch("https://loremflickr.com/1920/1080/sea", {
      method: 'HEAD'
    })

    const alreadyGot = this.backgrounds.includes(result.url)
    if (alreadyGot) {
      // this is the same image as we currently have, so re-run the function
    }

    this.backgrounds.push(result.url)
  }

  onBGImageLoad(imgEvent: Event) {
    // BG image has loaded, now remove the old BG image from backgrounds array
    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src
    this.backgrounds = this.backgrounds.filter(b => b === src)

    this.loadingBGImage = false
  }
}
