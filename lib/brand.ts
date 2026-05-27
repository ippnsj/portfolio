import { getCompanyConfig } from '@/lib/companies';
import { isValidHexColor } from '@/lib/utils';

interface BrandParams {
  company?: string;
  color?: string;
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
