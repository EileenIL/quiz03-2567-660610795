import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Sadanun Laksanaaree",
    studentId: "660610795",
  });
};
