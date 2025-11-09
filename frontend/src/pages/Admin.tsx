import { motion } from 'framer-motion';
import { Users, Wifi, DollarSign, TrendingUp, Package, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const Admin = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, change: '+12%', trend: 'up' },
    { label: 'Active Agents', value: '56', icon: Wifi, change: '+5%', trend: 'up' },
    { label: 'Revenue (Month)', value: '45M TZS', icon: DollarSign, change: '+23%', trend: 'up' },
    { label: 'Data Sold', value: '2.5TB', icon: Package, change: '+18%', trend: 'up' },
  ];

  const recentUsers = [
    { name: 'John Kamara', email: 'john@example.com', plan: '5GB', status: 'active', joined: '2024-01-15' },
    { name: 'Sarah Mkombe', email: 'sarah@example.com', plan: '10GB', status: 'active', joined: '2024-01-14' },
    { name: 'David Mushi', email: 'david@example.com', plan: '1GB', status: 'expired', joined: '2024-01-10' },
    { name: 'Grace Njau', email: 'grace@example.com', plan: 'Unlimited', status: 'active', joined: '2024-01-12' },
  ];

  const activeAgents = [
    { name: 'Ubungo Tech Hub', location: 'Ubungo Center', users: 45, revenue: '2.5M TZS' },
    { name: 'Mwenge Cyber', location: 'Mwenge', users: 32, revenue: '1.8M TZS' },
    { name: 'Sinza Connect', location: 'Sinza', users: 28, revenue: '1.5M TZS' },
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage StreetNet operations and analytics</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'}>
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.email}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{user.plan}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Agents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Top Agents</CardTitle>
                <CardDescription>Best performing WiFi providers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeAgents.map((agent, index) => (
                    <div key={agent.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">{agent.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{agent.revenue}</p>
                        <p className="text-xs text-muted-foreground">{agent.users} users</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Revenue Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Revenue Analytics
              </CardTitle>
              <CardDescription>Monthly revenue trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Revenue chart visualization</p>
                  <p className="text-sm text-muted-foreground">Connect to backend for live data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
