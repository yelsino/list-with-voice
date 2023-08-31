import { NextResponse } from "next/server";
// import qrcode from 'qrcode';

interface IParams {
    params: {
        listaId?: string;
    };
}

export async function GET(request: Request, { params }: IParams) {
    NextResponse.json({});
}
