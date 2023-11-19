import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {

  @ViewChild('popup', {static: false}) popup: any;

  public roomId: string;
  public messageText: string;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray = [];

  public showScreen: boolean = false;
  public phone: string;
  public currentUser;
  public selectedUser;

  public userList = [
    {
      id: 1,
      name: 'Rafael Lozano',
      phone: '995922093',
      image: '../../../assets/img/img-chat/icon.png',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3'
      }
    },
    {
      id: 2,
      name: 'Pedro Horning',
      phone: '995922092',
      image: '../../../assets/img/img-chat/icon_2.png',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5'
      }
    }
  ]
  constructor(
    private modalService: NgbModal,
    private chatService: ChatService
    ) {
  }

  ngOnInit(): void {
    this.chatService.getMessage().subscribe((data: { user: string, message: string }) => {
        //this.messageArray.push(data);
        if (this.roomId) {
          this.storageArray = this.chatService.getStorage();
          const storeIndex = this.storageArray.findIndex((storage) => storage.roomId === this.roomId);
          this.messageArray = this.storageArray[storeIndex].chats;
        }
      });    
  }

  ngAfterViewInit(): void {
    this.openPopup(this.popup);
  }

  openPopup(content: any): void {
    this.modalService.open(content, {backdrop: 'static', centered: true});
  }

  login(dismiss: any): void {
    this.currentUser = this.userList.find(user => user.phone === this.phone.toString());
    this.userList = this.userList.filter ((user) => user.phone !== this.phone.toString());

    if(this.currentUser) {
      this.showScreen = true;
      dismiss();
    }
  }

  selectUserHandler(phone: string): void {
    this.selectedUser = this.userList.find(user => user.phone === phone); // Correção aqui
    this.roomId = this.selectedUser.roomId; // Correção aqui
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray.findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({ user: username, roomId: roomId }); // Correção aqui
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: this.roomId,
      message: this.messageText
    }); // Correção aqui

    this.messageText = '';
  }

}