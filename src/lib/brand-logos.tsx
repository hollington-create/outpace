import { ReactElement } from "react";
import {
  SiInstagram,
  SiMeta,
  SiX,
  SiTiktok,
  SiYoutube,
  SiOpenai,
  SiAnthropic,
  SiGoogle,
  SiGoogleanalytics,
  SiHubspot,
  SiSalesforce,
  SiMailchimp,
  SiFigma,
  SiSlack,
  SiZapier,
  SiWordpress,
  SiShopify,
  SiStripe,
  SiNextdotjs,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { IconType } from "react-icons";

export interface BrandLogoEntry {
  icon: ReactElement;
  name: string;
  brandColor: string;
}

function logo(
  Icon: IconType,
  name: string,
  brandColor: string
): BrandLogoEntry {
  return { icon: <Icon />, name, brandColor };
}

// ── Individual logos ──
const linkedin = logo(FaLinkedinIn, "LinkedIn", "#0A66C2");
const instagram = logo(SiInstagram, "Instagram", "#E4405F");
const meta = logo(SiMeta, "Meta", "#0081FB");
const x = logo(SiX, "X", "#ffffff");
const tiktok = logo(SiTiktok, "TikTok", "#ff0050");
const youtube = logo(SiYoutube, "YouTube", "#FF0000");

const openai = logo(SiOpenai, "OpenAI", "#ffffff");
const anthropic = logo(SiAnthropic, "Claude", "#D4A574");

const google = logo(SiGoogle, "Google", "#4285F4");
const googleAnalytics = logo(SiGoogleanalytics, "Google Analytics", "#E37400");

const hubspot = logo(SiHubspot, "HubSpot", "#FF7A59");
const salesforce = logo(SiSalesforce, "Salesforce", "#00A1E0");

const mailchimp = logo(SiMailchimp, "Mailchimp", "#FFE01B");

const figma = logo(SiFigma, "Figma", "#F24E1E");
const slack = logo(SiSlack, "Slack", "#E01E5A");
const zapier = logo(SiZapier, "Zapier", "#FF4A00");
const wordpress = logo(SiWordpress, "WordPress", "#21759B");
const shopify = logo(SiShopify, "Shopify", "#96BF48");
const stripe = logo(SiStripe, "Stripe", "#635BFF");
const nextjs = logo(SiNextdotjs, "Next.js", "#ffffff");

// ── Grouped sets ──
export const SOCIAL_LOGOS: BrandLogoEntry[] = [
  linkedin,
  instagram,
  meta,
  x,
  tiktok,
  youtube,
];

export const AI_LOGOS: BrandLogoEntry[] = [openai, anthropic];

export const GOOGLE_LOGOS: BrandLogoEntry[] = [google, googleAnalytics];

export const CRM_LOGOS: BrandLogoEntry[] = [hubspot, salesforce];

export const OUTBOUND_LOGOS: BrandLogoEntry[] = [mailchimp, hubspot];

export const TECH_LOGOS: BrandLogoEntry[] = [
  figma,
  slack,
  zapier,
  wordpress,
  shopify,
  stripe,
  nextjs,
];

// ── Page-specific collections ──
export const HOMEPAGE_LOGOS: BrandLogoEntry[] = [
  hubspot,
  salesforce,
  google,
  openai,
  anthropic,
  meta,
  linkedin,
  mailchimp,
  slack,
  zapier,
  stripe,
  shopify,
];

export const DIGITAL_LOGOS: BrandLogoEntry[] = [
  google,
  googleAnalytics,
  linkedin,
  meta,
  instagram,
  youtube,
  tiktok,
  x,
];

export const SYSTEMS_LOGOS: BrandLogoEntry[] = [
  hubspot,
  salesforce,
  zapier,
  slack,
  stripe,
];

export const DEPLOY_LOGOS: BrandLogoEntry[] = [
  hubspot,
  salesforce,
  openai,
  anthropic,
  mailchimp,
  google,
  nextjs,
  zapier,
];

export const FOOTER_LOGOS: BrandLogoEntry[] = [
  hubspot,
  salesforce,
  google,
  openai,
  anthropic,
  linkedin,
  meta,
  slack,
  zapier,
  stripe,
];
