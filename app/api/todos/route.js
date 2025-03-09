import { NextResponse } from "next/server";
import TodoModel from "../../lib/models/TodoModel";
import connectDb from "../../lib/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Initialize database connection
let isConnected = false;
const dbConnect = async () => {
    try {
        if (isConnected) return;
        await connectDb();
        isConnected = true;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw new Error('Failed to connect to database');
    }
};

// Helper function to get session
const getAuthSession = async (req) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            throw new Error('Unauthorized');
        }
        return session;
    } catch (error) {
        throw new Error('Authentication failed');
    }
};

export async function GET(req) {
    try {
        const session = await getAuthSession(req);
        await dbConnect();

        const todos = await TodoModel.find({ 
            userId: session.user.email 
        }).sort({ createdAt: -1 });

        return NextResponse.json({ todos });
    } catch (error) {
        console.error("Error in GET /api/todos:", error);
        if (error.message === 'Unauthorized' || error.message === 'Authentication failed') {
            return NextResponse.json({ error: "Please sign in to continue" }, { status: 401 });
        }
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const session = await getAuthSession(req);
        await dbConnect();

        const { title, description } = await req.json();

        if (!title?.trim() || !description?.trim()) {
            return NextResponse.json(
                { error: "Title and description are required" },
                { status: 400 }
            );
        }

        const todo = await TodoModel.create({
            title: title.trim(),
            description: description.trim(),
            userId: session.user.email,
            isCompleted: false
        });

        return NextResponse.json({
            message: "Todo created successfully",
            todo
        });
    } catch (error) {
        console.error("Error in POST /api/todos:", error);
        if (error.message === 'Unauthorized' || error.message === 'Authentication failed') {
            return NextResponse.json({ error: "Please sign in to continue" }, { status: 401 });
        }
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const session = await getAuthSession(req);
        await dbConnect();

        const id = req.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
        }

        const result = await TodoModel.deleteOne({ 
            _id: id, 
            userId: session.user.email 
        });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error in DELETE /api/todos:", error);
        if (error.message === 'Unauthorized' || error.message === 'Authentication failed') {
            return NextResponse.json({ error: "Please sign in to continue" }, { status: 401 });
        }
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        const session = await getAuthSession(req);
        await dbConnect();

        const id = req.nextUrl.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: "Todo ID is required" }, { status: 400 });
        }

        const todo = await TodoModel.findOne({ 
            _id: id, 
            userId: session.user.email 
        });

        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        const updatedTodo = await TodoModel.findOneAndUpdate(
            { _id: id, userId: session.user.email },
            { $set: { isCompleted: !todo.isCompleted } },
            { new: true }
        );

        return NextResponse.json({
            message: "Todo updated successfully",
            todo: updatedTodo
        });
    } catch (error) {
        console.error("Error in PUT /api/todos:", error);
        if (error.message === 'Unauthorized' || error.message === 'Authentication failed') {
            return NextResponse.json({ error: "Please sign in to continue" }, { status: 401 });
        }
        return NextResponse.json(
            { error: "Internal server error", details: error.message },
            { status: 500 }
        );
    }
}


