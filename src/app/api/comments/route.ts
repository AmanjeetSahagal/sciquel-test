import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not set — API running in demo mode");
  }

export async function GET(req: NextRequest){
    // fill here in
    try {
        const {searchParams} = new URL(req.url);
        const offsetRaw = searchParams.get("offset");
        let offset = Number(offsetRaw ?? 0);
        const limit = 50;
        //Get the page and total count toegther
        const [items, total] = await Promise.all([
            prisma.comment.findMany({
                orderBy:{createdAt: "desc"},
                skip: offset,
                take: limit,
            }),
            prisma.comment.count(),
        ]);
        //return the comments that fit the pagination index
        return NextResponse.json(
            {
                items,
                page: {
                    offset,
                    limit,
                    total,
                },
            },
            {status: 200},
        );
    }
    catch (err) {
        console.error("GET /api/comments error:", err);
        return NextResponse.json(
            {error: "Failed to fetch comments"},
            {status: 500}
        );
    }
}

export async function POST(req: NextRequest){
    try {
        //retrieve all properties needed for comments
        const body = await req.json();
        const name = (body.name ?? "").trim();
        const email = (body.email ?? "").trim();
        const comment = (body.comment ?? "").trim();

        //If any properties are missing, return an error
        if (!name || !email || !comment) {
            return NextResponse.json(
                {error: "Name, email, and comment are all required"},
                {status: 400}
            );
        }
        
        //Regex check for a valid inputted email
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        //If invalid email, return an error
        if (!emailValid) {
            return NextResponse.json({error: "Invalid email address."}, {status: 400});
        }
        //When everything is valid, create the prisma comment
        const newComment = await prisma.comment.create({
            data: {name, email, comment},
        });
        
        return NextResponse.json(newComment, {status: 201});
    }
    catch (err) {
        console.error("POST /api/comments error:", err);

        return NextResponse.json(
            { error: "Failed to create comment." },
            { status: 500 }
          );
    }
}