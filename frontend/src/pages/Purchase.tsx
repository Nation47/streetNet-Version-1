import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Smartphone, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Navbar } from '@/components/Navbar';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface DataPlan {
  id: string;
  name: string;
  data: string;
  price: number;
  validity: string;
  popular?: boolean;
}

const Purchase = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const plans: DataPlan[] = [
    { id: '1gb', name: 'Starter', data: '1GB', price: 2000, validity: '3 days' },
    { id: '5gb', name: 'Standard', data: '5GB', price: 8000, validity: '7 days', popular: true },
    { id: '10gb', name: 'Premium', data: '10GB', price: 15000, validity: '14 days' },
    { id: 'unlimited', name: 'Ultimate', data: 'Unlimited', price: 30000, validity: '30 days' },
  ];

  const handlePurchase = () => {
    if (!selectedPlan || !phoneNumber) {
      toast({
        title: 'Missing information',
        description: 'Please select a plan and enter your phone number',
        variant: 'destructive',
      });
      return;
    }

    // Simulate payment processing
    toast({
      title: 'Processing payment...',
      description: 'Please check your phone for payment confirmation',
    });

    setTimeout(() => {
      toast({
        title: 'Payment successful! 🎉',
        description: 'Your data has been added to your account',
      });
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Buy Data Package</h1>
          <p className="text-muted-foreground">Choose a plan and complete payment</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plans Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-4">Select a Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedPlan === plan.id
                          ? 'border-primary ring-2 ring-primary'
                          : 'hover:border-primary/50'
                      } ${plan.popular ? 'border-secondary' : ''}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                            <CardDescription>{plan.validity} validity</CardDescription>
                          </div>
                          {plan.popular && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-secondary text-secondary-foreground">
                              Popular
                            </span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <p className="text-3xl font-bold">{plan.data}</p>
                          <p className="text-2xl font-bold text-primary mt-2">
                            {plan.price.toLocaleString()} TZS
                          </p>
                        </div>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>High-speed internet</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>All hotspots access</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>24/7 support</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Payment Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-20"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how to pay</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">M-Pesa</p>
                          <p className="text-xs text-muted-foreground">Vodacom mobile money</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="tigopesa" id="tigopesa" />
                      <Label htmlFor="tigopesa" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">TigoPesa</p>
                          <p className="text-xs text-muted-foreground">Tigo mobile money</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value="airtel" id="airtel" />
                      <Label htmlFor="airtel" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Airtel Money</p>
                          <p className="text-xs text-muted-foreground">Airtel mobile money</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+255 XXX XXX XXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  {selectedPlan && (
                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Selected Plan:</span>
                        <span className="font-medium">
                          {plans.find((p) => p.id === selectedPlan)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Data:</span>
                        <span className="font-medium">
                          {plans.find((p) => p.id === selectedPlan)?.data}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total:</span>
                        <span className="text-primary">
                          {plans.find((p) => p.id === selectedPlan)?.price.toLocaleString()} TZS
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!selectedPlan || !phoneNumber}
                    onClick={handlePurchase}
                  >
                    Complete Purchase
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

export default Purchase;
