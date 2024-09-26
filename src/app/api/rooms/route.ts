import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { Database,Payload} from "@lib/types";
import { nanoid } from "nanoid";
import {  NextRequest,NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    
    rooms:(<Database>DB).rooms,
    totalRooms:(<Database>DB).rooms.length,
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  const { role } = <Payload>payload;
  if (!payload || (role !== "ADMIN" && role !== "SUPER_ADMIN")) {
 return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
   );
  }
  readDB();
  
  const body = await request.json();
  const { roomName } = body;
  if ((<Database>DB).rooms.find((room) => room.roomName === roomName)) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${roomName} already exists`,
      },
      { status: 400 }
    );
  }

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: `Room ${"replace this with room name"} already exists`,
  //   },
  //   { status: 400 }
  // );

  const roomId = nanoid();
  (<Database>DB).rooms.push({
    roomId,
    roomName: "replace this with room name",
  })
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
