import { isValidHexColor } from '@/lib/utils';

export const BRAND_PARAMS = {
  color: 'color',
} as const;

interface BrandParams {
  color?: string;
}

export function parseBrandParams(
  params: Record<string, string | string[] | undefined>,
): BrandParams {
  const colorValue = params[BRAND_PARAMS.color];
  return {
    color: typeof colorValue === 'string' ? colorValue : undefined,
  };
}

export function resolveBrandColor({ color }: BrandParams): string | undefined {
  if (!color) return undefined;
  const hexColor = color.startsWith('#') ? color : `#${color}`;
  return isValidHexColor(hexColor) ? hexColor : undefined;
}
