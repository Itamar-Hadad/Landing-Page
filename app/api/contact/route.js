import { NextResponse } from "next/server";

const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`;

export async function POST(request) {

    try{
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
                return NextResponse.json(
                    { error: "All fields are required" },
                    { status: 400 }
                );
            }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
            },
            body: JSON.stringify({
                fields: {
                    "Full Name": name,
                    "Email": email,
                    "Message": message,
                },
            }),
        }); 

        if (!response.ok) {
            const errorBody = await response.json();
            console.log("Airtable error:", errorBody);
            return NextResponse.json({ error: "Failed to save contact information" }, { status: 500 });
        }
        
        return NextResponse.json({success: true }, { status: 200 });
    
    } catch (error) {
     console.log("Server error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}