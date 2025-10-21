import { Settings, Edit, Heart, Users, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function UserProfileView() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-red-500 px-6 py-8 pt-12 text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white/20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE4NzcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Your profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Alex Johnson</h2>
            <p className="text-white/90">Member since Jan 2024</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-600">Likes Given</div>
          </Card>
          <Card className="p-4 text-center">
            <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">$450</div>
            <div className="text-sm text-gray-600">Total Bids</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-600">Matches</div>
          </Card>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={() => {}}
          >
            <Edit className="w-5 h-5" />
            Edit Profile
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={() => {}}
          >
            <Users className="w-5 h-5" />
            Auction a Friend
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={() => {}}
          >
            <Heart className="w-5 h-5" />
            Liked Profiles
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12"
            onClick={() => {}}
          >
            <Settings className="w-5 h-5" />
            Settings
          </Button>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-semibold mb-3">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm">You won the auction for Sarah M.</span>
              <span className="text-xs text-gray-500 ml-auto">2h ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm">New bid placed on Marcus L.</span>
              <span className="text-xs text-gray-500 ml-auto">5h ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
              <div className="w-2 h-2 bg-pink-500 rounded-full" />
              <span className="text-sm">You liked Emma T.'s profile</span>
              <span className="text-xs text-gray-500 ml-auto">1d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}