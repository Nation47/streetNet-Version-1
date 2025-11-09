import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wifi, Zap, Shield, MapPin, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';

const Index = () => {
  const features = [
    {
      icon: Wifi,
      title: 'Fast & Reliable',
      description: 'High-speed internet access across Ubungo, Tanzania',
    },
    {
      icon: Zap,
      title: 'Instant Activation',
      description: 'Buy vouchers and connect within seconds',
    },
    {
      icon: Shield,
      title: 'Secure Connection',
      description: 'Protected WiFi networks with encryption',
    },
    {
      icon: MapPin,
      title: 'Wide Coverage',
      description: 'Multiple hotspots throughout the neighborhood',
    },
    {
      icon: TrendingUp,
      title: 'Flexible Plans',
      description: 'Data packages from 1GB to unlimited',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Local agents bringing WiFi to your doorstep',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">Ubungo's #1 WiFi Network</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              Stay Connected with StreetNet
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Affordable, fast, and reliable internet for everyone in Ubungo. Buy data packages using M-Pesa, 
              TigoPesa, or Airtel Money and connect instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto gap-2 group">
                  <Wifi className="h-5 w-5 group-hover:animate-pulse" />
                  Connect Now
                </Button>
              </Link>
              <Link to="/purchase">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Buy Voucher
                </Button>
              </Link>
            </div>

            {/* Demo Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 rounded-lg bg-muted/50 border border-border inline-block"
            >
              <p className="text-sm font-medium mb-2">Demo Login Credentials:</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>User:</strong> user@streetnet.tz / password</p>
                <p><strong>Agent:</strong> agent@streetnet.tz / password</p>
                <p><strong>Admin:</strong> admin@streetnet.tz / password</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose StreetNet?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're bringing affordable internet to every corner of Ubungo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-secondary p-8 md:p-12 rounded-2xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Become a StreetNet Agent
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Start your own WiFi business. Buy data packages in bulk and sell to your community. 
              Earn money while connecting your neighbors.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="gap-2">
                Join as Agent
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 StreetNet. Bringing Ubungo online, one connection at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
