import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { DragDropModule, DragDrop } from '@angular/cdk/drag-drop';
import { ClarityModule } from '@clr/angular';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FlexLayoutModule, DragDropModule, ClarityModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('contentBody')
  contentBody!: ElementRef<HTMLDivElement>;

  count = 0;

  constructor(private dragService: DragDrop) {}

  ngOnInit (): void {

  }
  
  addButton() {
    //this.body.nativeElement.innerHTML+="<button class='btn btn-primary' cdkDrag>Button</button>";
    var e = document.createElement('button');
    e.classList.add('btn', 'btn-danger');
    e.setAttribute('cdkDrag', '');
    e.innerText = 'button' + (++this.count);
    var dragRef = this.dragService.createDrag(e);
    dragRef.withBoundaryElement(this.contentBody);
    dragRef.ended.subscribe((v) => { 
      console.log("ended:", v);
      var list = document.elementsFromPoint(v.dropPoint.x, v.dropPoint.y);
      console.log("found:", list.length, " items");
      for(let i = 0; i < list.length; i++) {
        if(list[i] === e) continue;
        if(list[i].classList.contains('body'))
          break;
        console.log(list[i]);
        this.contentBody.nativeElement.removeChild(e);
        this.contentBody.nativeElement.insertBefore(e, list[i]);
      }
      dragRef.reset();
    });
    this.contentBody.nativeElement.appendChild(e);
  }
}
