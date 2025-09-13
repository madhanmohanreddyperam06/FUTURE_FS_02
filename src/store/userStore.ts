import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Order } from '@/types';

interface UserStore {
  user: User | null;
  orders: Order[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addOrder: (order: Order) => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication - in real app, validate with backend
        if (email && password) {
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
          };
          
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock registration - in real app, create user in backend
        if (name && email && password) {
          const user: User = {
            id: Date.now().toString(),
            email,
            name,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
          };
          
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false, orders: [] });
      },
      
      addOrder: (order: Order) => {
        set({ orders: [...get().orders, order] });
      },
      
      updateProfile: (updates: Partial<User>) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      }
    }),
    {
      name: 'user-storage',
    }
  )
);

