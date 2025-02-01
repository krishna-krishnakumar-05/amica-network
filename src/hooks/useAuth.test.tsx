import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './useAuth';
import { authService } from '../lib/api';
import { toast } from '@/components/ui/use-toast';

// Mock the authService
vi.mock('../lib/api', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn()
  }
}));

// Mock toast
vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn()
}));

describe('useAuth hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initially have no user and not be authenticated', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should login successfully', async () => {
    const mockUser = { 
      id: '1', 
      name: 'Test User', 
      email: 'test@example.com' 
    };
    const mockToken = 'test-token';

    // Mock successful login
    (authService.login as vi.Mock).mockResolvedValue({ 
      user: mockUser, 
      token: mockToken 
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Login Successful'
    }));
  });

  it('should handle login failure', async () => {
    // Mock login failure
    (authService.login as vi.Mock).mockRejectedValue(new Error('Invalid credentials'));

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      try {
        await result.current.login('test@example.com', 'wrongpassword');
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      variant: 'destructive',
      title: 'Login Error'
    }));
  });

  it('should register successfully', async () => {
    const mockUser = { 
      id: '1', 
      name: 'New User', 
      email: 'new@example.com' 
    };
    const mockToken = 'register-token';

    // Mock successful registration
    (authService.register as vi.Mock).mockResolvedValue({ 
      user: mockUser, 
      token: mockToken 
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.register('New User', 'new@example.com', 'password');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
    expect(localStorage.getItem('token')).toBe(mockToken);
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Registration Successful'
    }));
  });

  it('should logout successfully', async () => {
    // Setup a logged-in state first
    const mockUser = { 
      id: '1', 
      name: 'Test User', 
      email: 'test@example.com' 
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'test-token');

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(authService.logout).toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Logout Successful'
    }));
  });
});
