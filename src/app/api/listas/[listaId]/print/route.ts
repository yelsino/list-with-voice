import { NextResponse } from "next/server";

interface IParams {
    params: {
        listaId?: string;
    };
}

export async function GET(request: Request, { params }: IParams) {
    NextResponse.json({});
}
