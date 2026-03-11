import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('expenseTracker');
    const transactions = await db
      .collection('transactions')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: transactions });
  } catch (error) {
    console.error('Database error:', error.message);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions. Please configure MongoDB URI.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, amount, type, category } = body;

    if (!title || !amount || !type || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('expenseTracker');
    
    const transaction = {
      title,
      amount: Number(amount),
      type,
      category,
      createdAt: new Date(),
    };

    const result = await db.collection('transactions').insertOne(transaction);
    
    return NextResponse.json({
      success: true,
      data: { ...transaction, _id: result.insertedId },
    });
  } catch (error) {
    console.error('Database error:', error.message);
    return NextResponse.json(
      { success: false, error: 'Failed to add transaction. Please configure MongoDB URI.' },
      { status: 500 }
    );
  }
}
