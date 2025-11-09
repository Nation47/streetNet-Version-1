import { motion } from 'framer-motion';
import { Wifi, Database, Calendar, Activity, Download, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const dataUsed = 1024; // MB
  const dataTotal = user?.dataRemaining ? user.dataRemaining + dataUsed : 3072;
  const dataPercent = (dataUsed / dataTotal) * 100;

  const recentActivity = [
    { type: 'Connected to StreetNet-Ubungo-01', time: '2 hours ago' },
    { type: 'Purchased 5GB Data Package', time: '1 day ago' },
    { type: 'Data usage: 500MB', time: '2 days ago' },
    { type: 'Connected to StreetNet-Ubungo-03', time: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground">Here's your StreetNet connection overview</p>
        </motion.div>

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wifi className="h-6 w-6 text-primary animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Connection Status</p>
                    <p className="text-2xl font-bold text-primary">Connected</p>
                    <p className="text-xs text-muted-foreground">StreetNet-Ubungo-01</p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" />
                  Data Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {user?.dataRemaining ? (user.dataRemaining / 1024).toFixed(1) : '0'} GB
                </div>
                <Progress value={100 - dataPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {dataUsed}MB used of {(dataTotal / 1024).toFixed(1)}GB
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Plan Expiry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">7 Days</div>
                <p className="text-xs text-muted-foreground">
                  Expires on {user?.planExpiry ? new Date(user.planExpiry).toLocaleDateString() : 'N/A'}
                </p>
                <Link to="/purchase">
                  <Button variant="link" className="px-0 h-auto mt-2" size="sm">
                    Extend Plan →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Network Speed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-green-500" />
                    <span className="text-sm">25 Mbps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">10 Mbps</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Average last hour</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your connection and usage history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Link to="/purchase">
            <Card className="hover:border-primary/50 transition-all cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Database className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">Buy More Data</h3>
                <p className="text-sm text-muted-foreground">Purchase additional data packages</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:border-primary/50 transition-all cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Wifi className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-1">Find Hotspots</h3>
              <p className="text-sm text-muted-foreground">View nearby StreetNet locations</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
