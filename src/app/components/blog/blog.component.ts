import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blog:any=[
    {id:1,img:"assets/images/img_1.jpg",title:"Romolu to stay at Real Nadrid?", date:"15-02-2023",discription:"ph1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem."},
    {id:2,img:"assets/images/img_2.jpg",title:"ikram to stay at Rami?", date:"20-03-2023",discription:"ph2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem."},
    {id:3,img:"assets/images/img_3.jpg",title:"yousef to stay at abir?", date:"30-03-2023",discription:"ph3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem."},
  
  ];

  constructor() { }

  ngOnInit() {
  }

}
