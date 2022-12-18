import { renderHook, act } from '@testing-library/react';
import useToast from '../../../hooks/useToast';
import { ToastProvider } from '../../../providers';

describe('useToast hook test', () => {
  it('should be created with no toasts in the array', () => {
    const { result } = renderHook(useToast);
    const [toasts, ,] = result.current;

    expect(toasts.length).toBe(0);
  });

  it('should add 1 toast', async () => {
    const { result } = renderHook(useToast, { wrapper: ToastProvider });
    const [, setToast] = result.current;
    await act(() => {
      setToast({
        type: 'success',
        message: 'Test Toast'
      });
    });
  });
});
