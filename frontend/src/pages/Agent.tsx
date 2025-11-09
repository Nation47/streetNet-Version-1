import { motion } from 'framer-motion';
import { Wifi, Users, DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Progress } from '@/components/ui/progress';

const Agent = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Balance', value: `${user?.balance?.toLocaleString() || '0'} TZS`, icon: DollarSign },
    { label: 'Connected Users', value: '24', icon: Users },
    { label: 'Data Sold (Month)', value: '156GB', icon: Package },
    { label: 'Revenue (Month)', value: '890,000 TZS', icon: TrendingUp },
  ];

  const packages = [
    { id: 1, size: '50GB', price: 50000, users: 10 },
    { id: 2, size: '100GB', price: 95000, users: 20 },
    { id: 3, size: '250GB', price: 220000, users: 50 },
    { id: 4, size: '500GB', price: 400000, users: 100 },
  ];

  const recentSales = [
    { customer: 'Customer #1234', plan: '5GB', amount: 8000, time: '10 mins ago' },
    { customer: 'Customer #1235', plan: '1GB', amount: 2000, time: '25 mins ago' },
    { customer: 'Customer #1236', plan: '10GB', amount: 15000, time: '1 hour ago' },
    { customer: 'Customer #1237', plan: '5GB', amount: 8000, time: '2 hours ago' },
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Agent Dashboard</h1>
          <p className="text-muted-foreground">Manage your StreetNet WiFi business</p>
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
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Buy Packages Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Buy Data Packages
                  </CardTitle>
                  <CardDescription>Purchase bulk data to resell to your customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {packages.map((pkg) => (
                      <Card key={pkg.id} className="border-2 hover:border-primary/50 transition-all">
                        <CardContent className="p-6">
                          <div className="text-center mb-4">
                            <p className="text-3xl font-bold text-primary mb-2">{pkg.size}</p>
                            <p className="text-2xl font-bold mb-1">{pkg.price.toLocaleString()} TZS</p>
                            <p className="text-sm text-muted-foreground">~{pkg.users} users</p>
                          </div>
                          <Button className="w-full">Purchase</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Sales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>Latest transactions from your customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSales.map((sale, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{sale.customer}</p>
                          <p className="text-sm text-muted-foreground">{sale.plan} • {sale.time}</p>
                        </div>
                        <p className="font-bold text-primary">{sale.amount.toLocaleString()} TZS</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Router Status */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <Card className="border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-primary" />
                    Router Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Status</span>
                      <span className="text-sm text-primary font-bold">Online</span>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse inline-block" />
                    <span className="ml-2 text-sm">StreetNet-Agent-{user?.id?.slice(0, 4)}</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Connected Devices</span>
                      <span className="text-sm font-bold">24/50</span>
                    </div>
                    <Progress value={48} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Data Available</span>
                      <span className="text-sm font-bold">45GB</span>
                    </div>
                    <Progress value={75} />
                  </div>

                  <Button className="w-full" variant="outline">
                    Configure Router
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="ghost">
                    <Users className="h-4 w-4 mr-2" />
                    View All Customers
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <Package className="h-4 w-4 mr-2" />
                    Manage Vouchers
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analytics Report
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent;
