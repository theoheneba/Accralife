import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const [locations]: any = await pool.query(`
      SELECT 
        l.id,
        l.name,
        c.name as category,
        l.address,
        l.status
      FROM locations l
      JOIN categories c ON l.category_id = c.id
      ORDER BY l.created_at DESC
    `);

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.category_id || !data.address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const [result]: any = await pool.query(
      `INSERT INTO locations (
        name,
        slug,
        category_id,
        description,
        address,
        latitude,
        longitude,
        phone,
        email,
        website,
        facebook,
        instagram,
        twitter,
        opening_hours,
        features,
        menu_url,
        entry_fee,
        dress_code,
        parking_info,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        slug,
        data.category_id,
        data.description || null,
        data.address,
        data.latitude || null,
        data.longitude || null,
        data.phone || null,
        data.email || null,
        data.website || null,
        data.facebook || null,
        data.instagram || null,
        data.twitter || null,
        JSON.stringify(data.opening_hours || {}),
        JSON.stringify(data.features || []),
        data.menu_url || null,
        data.entry_fee || null,
        data.dress_code || null,
        data.parking_info || null,
        "pending"
      ]
    );

    // Log admin action
    await pool.query(
      `INSERT INTO admin_logs (user_id, action, details) VALUES (?, ?, ?)`,
      [
        session.id,
        "create_location",
        JSON.stringify({ location_id: result.insertId, name: data.name })
      ]
    );

    return NextResponse.json(
      { message: "Location created successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create location:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}