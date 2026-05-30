import { getCompanyConfig } from '@/lib/companies';
import { isValidHexColor } from '@/lib/utils';

export const BRAND_PARAMS = {
  company: 'company',
  color: 'color',
} as const;

interface BrandParams {
  company?: string;
  color?: string;
}

export function parseBrandParams(
  params: Record<string, string | string[] | undefined>,
): BrandParams {
  const companyValue = params[BRAND_PARAMS.company];
  const colorValue = params[BRAND_PARAMS.color];
  return {
    company: typeof companyValue === 'string' ? companyValue : undefined,
    color: typeof colorValue === 'string' ? colorValue : undefined,
  };
}

export function resolveBrandColor({ company, color }: BrandParams): string | undefined {
  const companyConfig = company ? getCompanyConfig(company) : undefined;
  if (companyConfig) {
    return companyConfig.color;
  }

  const hexColor = color
    ? color.startsWith('#') ? color : `#${color}`
    : undefined;
  if (hexColor && isValidHexColor(hexColor)) {
    return hexColor;
  }

  return undefined;
}
