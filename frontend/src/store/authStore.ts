import {create} from 'zustand';
import {UserRole} from '@/types/auth';

interface AuthStore {
    role: UserRole;
    setRole:(role:UserRole)=>void;
    logout:()=>void;
}

export const useAuthStore = create<AuthStore>((set)=>({
    role:'guest',
    setRole:(role)=>
        set({
            role
        }),
    logout:()=>
        set({
            role:'guest'
        })
}));