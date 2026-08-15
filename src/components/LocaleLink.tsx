import { Link, type LinkProps } from 'react-router-dom';
import { pathFor, type RouteId } from '@/config/routes';
import { useLocale } from '@/hooks/useLocale';

type LocaleLinkProps = Omit<LinkProps, 'to'> & {
  to: RouteId | string;
};

export function LocaleLink({ to, ...props }: LocaleLinkProps) {
  const locale = useLocale();
  const href = to.startsWith('/') || to.startsWith('#') || to.startsWith('http')
    ? to
    : pathFor(to as RouteId, locale);

  return <Link to={href} {...props} />;
}
