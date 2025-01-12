"use client";

import { Card } from "@/components/ui/card";
import {
  MapPin,
  Users,
  MessageSquare,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLocations: 0,
    totalUsers: 0,
    totalReviews: 0,
    pendingReviews: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Total Locations
              </p>
              <h3 className="text-2xl font-bold">{stats.totalLocations}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Total Users
              </p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Total Reviews
              </p>
              <h3 className="text-2xl font-bold">{stats.totalReviews}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">
                Active Users
              </p>
              <h3 className="text-2xl font-bold">{stats.activeUsers}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Activity items would be mapped here */}
          <p className="text-muted-foreground">Loading activity...</p>
        </div>
      </Card>
    </div>
  );
}