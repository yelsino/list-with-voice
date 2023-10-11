import { NextResponse } from "next/server";
import fs, { write } from "node:fs";
import fetch from 'cross-fetch'
import { Deepgram } from "@deepgram/sdk";
import axios from "axios";
import path from "node:path";
import { writeFile } from "node:fs/promises";

export async function POST(request: Request) {

  const data = await request.formData();
  const file = data.get('audio') as Blob;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(),"public", "new.wav");
  console.log("filePath: ", filePath);
  
  await writeFile(filePath, buffer);

  return NextResponse.json({});
}

