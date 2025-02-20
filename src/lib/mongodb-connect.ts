import { NextResponse } from "next/server";

import { MongoClient } from "mongodb";


export default async function mongodbConnect() {

            let client
    
            try {
                client = await MongoClient.connect(
                    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/`
                )
            } catch (error) {
                NextResponse.json({ message: `Could not connect to database: ${error}` }, { status: 500 })
                return
            }
            return client

}