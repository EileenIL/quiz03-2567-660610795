
export interface Room {
    roomId: string;
    roomName: string;
  }
  export interface Message {
    roomId: string;
    messageId: string;
    messageText: string;
  }
  export interface User {
    username: string;
    password:  string;
    studentId:  string;
    role:  string;
  }
  export interface Payload {
    roomId: string;
    roomName: string;
    messageId: string;
    role: string;
  }
export interface Database {
    rooms: Room[];
    messages: Message[];
    users : User[];

    
  }