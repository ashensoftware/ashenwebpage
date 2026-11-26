import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactUs } from '@/features/contact/ContactUs';
import '@/i18n';

const formState = {
  submitting: false,
  succeeded: false,
  errors: null as unknown,
};

const handleSubmit = vi.fn((event: Event) => {
  event.preventDefault();
});
const reset = vi.fn();

vi.mock('@formspree/react', () => ({
  useForm: () => [formState, handleSubmit, reset],
  ValidationError: () => null,
}));

function renderForm(path = '/') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <ContactUs />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe('ContactUs', () => {
  beforeEach(() => {
    formState.submitting = false;
    formState.succeeded = false;
    formState.errors = null;
    handleSubmit.mockClear();
    reset.mockClear();
  });

  it('renders required fields', () => {
    renderForm();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it('disables submit while submitting', () => {
    formState.submitting = true;
    renderForm();
    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
  });

  it('shows success state', () => {
    formState.succeeded = true;
    renderForm();
    expect(screen.getByText(/message received/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/work email/i)).not.toBeInTheDocument();
  });

  it('shows error state and retry', async () => {
    formState.errors = [{ message: 'Invalid' }];
    renderForm();
    expect(screen.getByText(/could not be sent/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(reset).toHaveBeenCalled();
  });

  it('does not default the service dropdown to AI Agents', () => {
    renderForm();
    const select = screen.getByLabelText(/service \/ project interest/i) as HTMLSelectElement;
    expect(select.value).toBe('');
    expect(screen.getByRole('option', { name: /select an area/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /not sure yet/i })).toBeInTheDocument();
  });

  it('does not double-submit while submitting', async () => {
    formState.submitting = true;
    renderForm();
    const button = screen.getByRole('button', { name: /sending/i });
    await userEvent.click(button);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('submits Japanese copy with locale ja', () => {
    renderForm('/ja#contact');
    expect(screen.getByLabelText('お名前')).toBeInTheDocument();
    expect(screen.getByLabelText('仕事用メール')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/どのツールに触れる必要があるか/)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '領域を選択' })).toBeInTheDocument();
    const locale = document.querySelector('input[name="locale"]') as HTMLInputElement;
    expect(locale.value).toBe('ja');
  });
});
