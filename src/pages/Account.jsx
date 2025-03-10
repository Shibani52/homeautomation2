import { useState } from 'react';
import {
  Person as PersonIcon,
  ShoppingBag as OrdersIcon,
  LocationOn as AddressIcon,
  CreditCard as PaymentIcon,
  Settings as SettingsIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';

function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=2E7D32&color=fff'
  });

  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-03-10',
      status: 'Delivered',
      total: 299.97,
      items: [
        { name: 'Smart LED Bulb', quantity: 2, price: 29.99 },
        { name: 'Security Camera', quantity: 1, price: 239.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-03-05',
      status: 'Processing',
      total: 149.99,
      items: [
        { name: 'Smart Thermostat', quantity: 1, price: 149.99 }
      ]
    }
  ]);

  const [addresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      street: '123 Main St',
      city: 'Tech City',
      state: 'ST',
      zip: '12345',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      street: '456 Work Ave',
      city: 'Tech City',
      state: 'ST',
      zip: '12345',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ]);

  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'Credit Card',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'Credit Card',
      last4: '1234',
      expiry: '08/24',
      isDefault: false
    }
  ]);

  const renderProfile = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Profile Information</h2>
        <button className="text-primary hover:text-primary-dark">
          <EditIcon />
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full mb-4"
          />
          <button className="text-primary hover:text-primary-dark text-sm">
            Change Photo
          </button>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <p className="text-gray-900 font-medium">{user.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="text-gray-900 font-medium">{user.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <p className="text-gray-900 font-medium">{user.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Order History</h2>
      </div>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Order #{order.id}</p>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600">Order Total:</p>
                  <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Items</h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div className="flex justify-between items-center text-sm">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Saved Addresses</h2>
        <button className="btn btn-primary flex items-center gap-2">
          <AddIcon /> Add New Address
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map(address => (
          <div key={address.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">{address.type}</span>
                {address.isDefault && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
              <button className="text-primary hover:text-primary-dark">
                <EditIcon />
              </button>
            </div>
            <div className="space-y-1 text-gray-600">
              <p>{address.name}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Payment Methods</h2>
        <button className="btn btn-primary flex items-center gap-2">
          <AddIcon /> Add New Card
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map(method => (
          <div key={method.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">•••• {method.last4}</span>
                {method.isDefault && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
              <button className="text-primary hover:text-primary-dark">
                <EditIcon />
              </button>
            </div>
            <div className="space-y-1 text-gray-600">
              <p>Expires {method.expiry}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
              <span>Order updates</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
              <span>Special offers and promotions</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-primary focus:ring-primary" />
              <span>Newsletter</span>
            </label>
          </div>
        </div>
        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">Privacy</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
              <span>Share order history with smart home devices</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
              <span>Allow personalized recommendations</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: PersonIcon },
    { id: 'orders', label: 'Orders', icon: OrdersIcon },
    { id: 'addresses', label: 'Addresses', icon: AddressIcon },
    { id: 'payment', label: 'Payment', icon: PaymentIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto mb-8 bg-white rounded-lg shadow">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors
                  ${activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'addresses' && renderAddresses()}
          {activeTab === 'payment' && renderPaymentMethods()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
}

export default Account; 