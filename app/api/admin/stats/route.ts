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

    // Get total locations
    const [locationsResult]: any = await pool.query(
      "SELECT COUNT(*) as count FROM locations"
    );
    const totalLocations = locationsResult[0].count;

    // Get total users
    const [usersResult]: any = await pool.query(
      "SELECT COUNT(*) as count FROM users"
    );
    const totalUsers = usersResult[0].count;

    // Get total reviews
    const [reviewsResult]: any = await pool.query(
      "SELECT COUNT(*) as count FROM reviews"
    );
    const totalReviews = reviewsResult[0].count;

    // Get pending reviews
    const [pendingReviewsResult]: any = await pool.query(
      "SELECT COUNT(*) as count FROM reviews WHERE status = 'pending'"
    );
    const pendingReviews = pendingReviewsResult[0].count;

    // Get active users (users who have interacted in the last 30 days)
    const [activeUsersResult]: any = await pool.query(`
      SELECT COUNT(DISTINCT user_id) as count 
      FROM (
        SELECT user_id FROM reviews 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        UNION
        SELECT user_id FROM bookmarks 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      ) as active_users
    `);
    const activeUsers = activeUsersResult[0].count;

    return NextResponse.json({
      totalLocations,
      totalUsers,
      totalReviews,
      pendingReviews,
      activeUsers,
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}