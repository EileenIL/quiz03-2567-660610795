import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { Database, Payload } from "@lib/types";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  readDB();
  const roomId = request.nextUrl.searchParams.get("roomId");

  if(!roomId){
    return NextResponse.json(
        {
         ok: false,
          message: `Room is not found`,
        },
         { status: 404 }
       );
  }
  const messages =(<Database>DB).messages.filter((message) => message.roomId === roomId);
  return NextResponse.json({
    ok: true,
    messages,
  });
};

export const POST = async (request: NextRequest) => {
  readDB();
 const body = await request.json();
 const {roomId ,messageText} = body ;
 const room = (<Database>DB).rooms.find((room) => room.roomId === roomId)
 if (!room || !messageText) {
  return NextResponse.json(
    {
    ok: false,
     message: `Room is not found`,
   },
     { status: 404 }
   );
 }
  const messageId = nanoid();
  (<Database>DB).messages.push({
    roomId,
    messageId,
    messageText,  
  });
  writeDB();

  return NextResponse.json({
    ok: true,
    messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async () => {
 
  const payload = checkToken();
  const { roomId , messageId } = <Payload>payload;
if (!payload){
  return NextResponse.json(
     {
       ok: false,
      message: "Invalid token",
    },
     { status: 401 }
  );
}



  readDB();

  const messageIndex = (<Database>DB).messages.findIndex(
    (message) => message.roomId === roomId && message.messageId === messageId
  );
  if (messageIndex === -1) {
  return NextResponse.json(
    {
      ok: false,
      message: "Message is not found",
    },
     { status: 404 }
  );
  }
(<Database>DB).messages.splice(messageIndex, 1);
  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
