import { NextResponse } from "next/server";
import { getFeaturedPosts } from "@/lib/posts-util";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const postsDirectory = path.join(process.cwd(), "postsDB");
        console.log("Posts directory path:", postsDirectory); // 🔍 Verificar caminho

        if (!fs.existsSync(postsDirectory)) {
            console.error("⚠️ Diretório 'postsDB' não encontrado!");
            return NextResponse.json({ error: "Diretório 'postsDB' não encontrado" }, { status: 500 });
        }

        const posts = getFeaturedPosts();
        return NextResponse.json(posts);
    } catch (error) {
        console.error("❌ Erro ao buscar posts:", error);
        return NextResponse.json({ error: "Erro ao buscar posts" }, { status: 500 });
    }
}
